import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import {
  type CSSResultGroup,
  html,
  isServer,
  nothing,
  type PropertyDeclaration,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { SbbOpenCloseBaseElement } from '../core/base-elements.js';
import { SbbEscapableOverlayController } from '../core/controllers.js';
import { forceType, idReference } from '../core/decorators.js';
import { isLean, isSafari, isZeroAnimationDuration } from '../core/dom.js';
import { SbbHydrationMixin, SbbNegativeMixin } from '../core/mixins.js';
import {
  isEventOnElement,
  overlayGapFixCorners,
  removeAriaComboBoxAttributes,
  setOverlayPosition,
} from '../core/overlay.js';
import type { SbbOptionBaseElement } from '../option.js';

import style from './autocomplete-base-element.scss?lit&inline';

/**
 * On Safari, the aria role 'listbox' must be on the host element, or else VoiceOver won't work at all.
 * On the other hand, JAWS and NVDA need the role to be "closer" to the options, or else optgroups won't work.
 */
const ariaRoleOnHost = isSafari;

export abstract class SbbAutocompleteBaseElement<T = string> extends SbbNegativeMixin(
  SbbHydrationMixin(SbbOpenCloseBaseElement),
) {
  public static override styles: CSSResultGroup = style;

  /**
   * The element where the autocomplete will attach.
   * If not set, as fallback there are two elements which can act as origin with following priority order:
   * 1. `sbb-form-field` if it is an ancestor.
   * 2. trigger element if set.
   *
   * For attribute usage, provide an id reference.
   */
  @idReference()
  @property()
  public accessor origin: HTMLElement | null = null;

  /**
   * The input element that will trigger the autocomplete opening.
   * By default, the autocomplete will open on focus, click, input or `ArrowDown` keypress of the 'trigger' element.
   * If not set, will search for the first 'input' child of a 'sbb-form-field' ancestor.
   *
   * For attribute usage, provide an id reference.
   */
  @idReference()
  @property()
  public accessor trigger: HTMLInputElement | null = null;

  /** Whether the icon space is preserved when no icon is set. */
  @forceType()
  @property({ attribute: 'preserve-icon-space', reflect: true, type: Boolean })
  public accessor preserveIconSpace: boolean = false;

  /** Whether the first option is automatically activated when the autocomplete is opened. */
  @forceType()
  @property({ attribute: 'auto-active-first-option', type: Boolean })
  public accessor autoActiveFirstOption: boolean = false;

  /** Function that maps an option's control value to its display value in the trigger. */
  @property({ attribute: false })
  public accessor displayWith: ((value: T) => string) | null = null;

  /**
   * Size variant, either m or s.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: 'm' | 's' = isLean() ? 's' : 'm';

  /** Returns the element where autocomplete overlay is attached to. */
  public get originElement(): HTMLElement | null {
    return (
      this.origin ??
      this.closest?.('sbb-form-field')?.shadowRoot?.querySelector?.('#overlay-anchor') ??
      this.trigger ??
      null
    );
  }

  /** Returns the trigger element. */
  public get triggerElement(): HTMLInputElement | null {
    return this._triggerElement ?? null;
  }
  private _triggerElement?: HTMLInputElement | null;

  protected abstract overlayId: string;
  protected abstract panelRole: string;
  private _originResizeObserver = new ResizeController(this, {
    target: null,
    skipInitial: true,
    callback: () => {
      if (this.state === 'opened') {
        this._setOverlayPosition();
      }
    },
  });
  /** Listens to the changes on the `disabled` or `readonly` attribute of the trigger. */
  private _triggerAttributeObserver = !isServer
    ? new MutationObserver((mutations: MutationRecord[]): void => {
        const input = mutations[0].target as HTMLInputElement;
        if (input.hasAttribute('disabled') || input.hasAttribute('readonly')) {
          this.close();
        }
      })
    : null;
  private _overlay!: HTMLElement;
  private _optionContainer!: HTMLElement;
  private _triggerAbortController!: AbortController;
  private _openPanelEventsController!: AbortController;
  private _isPointerDownEventOnMenu: boolean = false;
  private _escapableOverlayController = new SbbEscapableOverlayController(this);

  protected abstract get options(): SbbOptionBaseElement<T>[];
  protected abstract syncNegative(): void;
  protected abstract setTriggerAttributes(element: HTMLInputElement): void;
  protected abstract openedPanelKeyboardInteraction(event: KeyboardEvent): void;
  protected abstract selectByKeyboard(event: KeyboardEvent): void;
  protected abstract setNextActiveOption(event?: KeyboardEvent): void;
  protected abstract resetActiveElement(): void;

  /** Opens the autocomplete. */
  public open(): void {
    if (
      this.state !== 'closed' ||
      !this._overlay ||
      this.options.length === 0 ||
      this._readonly()
    ) {
      return;
    }
    if (!this.willOpen.emit()) {
      return;
    }

    this.showPopover?.();
    this.state = 'opening';
    this._triggerElement?.toggleAttribute('data-expanded', true);
    const originElement = this.originElement;
    if (!originElement) {
      throw new Error(
        'Cannot find the origin element. Please specify a valid element or check the usage of the "origin" property from the documentation',
      );
    }
    this._setOverlayPosition(originElement);
    if (this.autoActiveFirstOption) {
      this.setNextActiveOption();
    }

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  /** Closes the autocomplete. */
  public close(): void {
    if (this.state !== 'opened') {
      return;
    }
    if (!this.willClose.emit()) {
      return;
    }

    this.state = 'closing';
    this._triggerElement?.toggleAttribute('data-expanded', false);
    this._openPanelEventsController.abort();
    if (this.originElement) {
      this._originResizeObserver.unobserve(this.originElement);
    }

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `closed` state.
    if (this._isZeroAnimationDuration()) {
      this._handleClosing();
    }
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-options-panel-animation-duration');
  }

  public override connectedCallback(): void {
    this.popover = 'manual';
    super.connectedCallback();
    if (ariaRoleOnHost) {
      this.id ||= this.overlayId;
    }
    const formField = this.closest('sbb-form-field') ?? this.closest('[data-form-field]');

    if (formField) {
      this.negative = formField.hasAttribute('negative');
    }

    if (this.hasUpdated) {
      this._componentSetup();
    }
    this.syncNegative();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('negative')) {
      this.syncNegative();
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._componentSetup();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._triggerElement = null;
    this._triggerAbortController?.abort();
    this._openPanelEventsController?.abort();
  }

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);

    if (isServer || !this.hasUpdated) {
      return;
    }
    if (!name || name === 'trigger') {
      this._configureTrigger();
    } else if ((!name || name === 'origin') && this.isOpen) {
      this._setOverlayPosition();
    }
  }

  /** When an option is selected, update the input value and close the autocomplete. */
  protected onOptionSelected(event: CustomEvent): void {
    const target = event.target as SbbOptionBaseElement<T>;

    // Deselect the previous options
    this.options
      .filter((option) => option.id !== target.id && option.selected)
      .forEach((option) => (option.selected = false));

    if (this.triggerElement) {
      // Given a value, returns the string that should be shown within the input.
      const toDisplay = this.displayWith?.(target.value as T) ?? target.value;

      // Set the option value
      // In order to support React onChange event, we have to get the setter and call it.
      // https://github.com/facebook/react/issues/11600#issuecomment-345813130
      const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
      setValue.call(this.triggerElement, toDisplay);

      // Manually trigger the change events
      this.triggerElement.dispatchEvent(new Event('change', { bubbles: true }));
      this.triggerElement.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));

      // Custom input event emitted when input value changes after an option is selected
      this.triggerElement.dispatchEvent(
        new CustomEvent('inputAutocomplete', { detail: { option: target } }),
      );
      this.triggerElement.focus();
    }

    this.close();
  }

  private _handleSlotchange(): void {
    this._highlightOptions(this.triggerElement?.value);
    /**
     * It's possible to filter out options with an opened panel on input change.
     * In this case, the panel's position must be recalculated considering the new option's list.
     */
    if (this.isOpen) {
      this._setOverlayPosition();
    }
    this._openOnNewOptions();
  }

  /**
   * If the 'input' is focused and there's a change in the number of options, open the autocomplete
   */
  private _openOnNewOptions(): void {
    if (document?.activeElement === this.triggerElement) {
      if (this.options.length > 0) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  /** The autocomplete should inherit 'readonly' state from the trigger. */
  private _readonly(): boolean {
    return this.triggerElement?.hasAttribute('readonly') ?? false;
  }

  private _componentSetup(): void {
    if (isServer) {
      return;
    }

    this.toggleAttribute(
      'data-option-panel-origin-borderless',
      !!this.closest?.('sbb-form-field')?.hasAttribute('borderless'),
    );

    this._configureTrigger();
  }

  private _configureTrigger(): void {
    const triggerElement = (this.trigger ??
      this.closest?.('sbb-form-field')?.querySelector('input')) as HTMLInputElement | null;
    if (triggerElement === this._triggerElement) {
      return;
    }

    this._triggerAbortController?.abort();
    removeAriaComboBoxAttributes(this.triggerElement);
    this._triggerElement = triggerElement;

    if (!this.triggerElement) {
      return;
    }

    // As the trigger can be the fallback of the origin, we eventually have to update the position.
    const originElement = this.originElement;
    if (this.triggerElement === originElement && this.isOpen) {
      this._setOverlayPosition(originElement);
    }

    this._triggerAttributeObserver?.observe(this._triggerElement!, {
      attributes: true,
      attributeFilter: ['disabled', 'readonly'],
    });

    this.setTriggerAttributes(this.triggerElement);
    this._triggerAbortController = new AbortController();

    // Open the overlay on focus, click, input and `ArrowDown` event
    this.triggerElement.addEventListener('focus', () => this.open(), {
      signal: this._triggerAbortController.signal,
    });
    this.triggerElement.addEventListener('click', () => this.open(), {
      signal: this._triggerAbortController.signal,
    });
    this.triggerElement.addEventListener(
      'input',
      (event) => {
        this.open();
        this._highlightOptions((event.target as HTMLInputElement).value);
      },
      { signal: this._triggerAbortController.signal },
    );
    this.triggerElement.addEventListener(
      'keydown',
      (event: KeyboardEvent) => this._closedPanelKeyboardInteraction(event),
      {
        signal: this._triggerAbortController.signal,
        // We need key event to run before any other subscription to guarantee a correct
        // interaction with other components (necessary for the 'sbb-chip-group' use case).
        capture: true,
      },
    );
  }

  // Set overlay position, width and max height
  private _setOverlayPosition(originElement = this.originElement): void {
    // An undefined originElement should only occur in the unlikely event
    // that the autocomplete loses its originElement and triggerElement during an open state.
    if (!originElement) {
      return;
    }
    setOverlayPosition(
      this._overlay,
      originElement,
      this._optionContainer,
      this.shadowRoot!.querySelector('.sbb-autocomplete__container')!,
      this,
    );
  }

  /**
   * On open/close animation end.
   * In rare cases it can be that the animationEnd event is triggered twice.
   * To avoid entering a corrupt state, exit when state is not expected.
   */
  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this.state === 'opening') {
      this._handleOpening();
    } else if (event.animationName === 'close' && this.state === 'closing') {
      this._handleClosing();
    }
  }

  private _handleOpening(): void {
    this.state = 'opened';
    this._attachOpenPanelEvents();
    if (this.originElement) {
      this._originResizeObserver.observe(this.originElement);
    }
    this.triggerElement?.setAttribute('aria-expanded', 'true');
    this._escapableOverlayController.connect();
    this.didOpen.emit();
  }

  private _handleClosing(): void {
    this.state = 'closed';
    this.hidePopover?.();
    this.triggerElement?.setAttribute('aria-expanded', 'false');
    this.resetActiveElement();
    this._optionContainer.scrollTop = 0;
    this._escapableOverlayController.disconnect();
    this.didClose.emit();
  }

  private _attachOpenPanelEvents(): void {
    this._openPanelEventsController = new AbortController();

    // Recalculate the overlay position on scroll and window resize
    document.addEventListener('scroll', () => this._setOverlayPosition(), {
      passive: true,
      signal: this._openPanelEventsController.signal,
      // Without capture, other scroll contexts would not bubble to this event listener.
      // Capture allows us to react to all scroll contexts in this DOM.
      capture: true,
    });
    window.addEventListener('resize', () => this._setOverlayPosition(), {
      passive: true,
      signal: this._openPanelEventsController.signal,
    });

    // Close autocomplete on backdrop click
    window.addEventListener('pointerdown', (ev) => this._pointerDownListener(ev), {
      signal: this._openPanelEventsController.signal,
    });
    window.addEventListener('pointerup', (ev) => this._closeOnBackdropClick(ev), {
      signal: this._openPanelEventsController.signal,
    });

    // Keyboard interactions
    this.triggerElement?.addEventListener(
      'keydown',
      (event: KeyboardEvent) => this.openedPanelKeyboardInteraction(event),
      {
        signal: this._openPanelEventsController.signal,
        // We need key event to run before any other subscription to guarantee a correct
        // interaction with other components (necessary for the 'sbb-chip-group' use case).
        capture: true,
      },
    );
  }

  // Check if the pointerdown event target is triggered on the menu.
  private _pointerDownListener = (event: PointerEvent): void => {
    this._isPointerDownEventOnMenu = isEventOnElement(this._overlay, event);
  };

  // If the click is outside the autocomplete, closes the panel.
  private _closeOnBackdropClick = (event: PointerEvent): void => {
    if (
      !this._isPointerDownEventOnMenu &&
      !isEventOnElement(this._overlay, event) &&
      !isEventOnElement(this.originElement, event)
    ) {
      this.close();
    }
  };

  private _closedPanelKeyboardInteraction(event: KeyboardEvent): void {
    if (this.state !== 'closed') {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case 'ArrowDown':
      case 'ArrowUp':
        this.open();
        break;
    }
  }

  /** Highlight the searched text on the options. */
  private _highlightOptions(searchTerm?: string): void {
    if (searchTerm === null || searchTerm === undefined) {
      return;
    }
    this.options.forEach((option) => option.highlight(searchTerm));
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-autocomplete__gap-fix"></div>
      <div class="sbb-autocomplete__container">
        <div class="sbb-autocomplete__gap-fix">${overlayGapFixCorners()}</div>
        <div
          @animationend=${this._onAnimationEnd}
          class="sbb-autocomplete__panel"
          ?data-open=${this.state === 'opened' || this.state === 'opening'}
          ${ref((overlayRef?: Element) => (this._overlay = overlayRef as HTMLElement))}
        >
          <div class="sbb-autocomplete__wrapper">
            <div
              class="sbb-autocomplete__options"
              role=${!ariaRoleOnHost ? this.panelRole : nothing}
              id=${!ariaRoleOnHost ? this.overlayId : nothing}
              ${ref((containerRef) => (this._optionContainer = containerRef as HTMLElement))}
            >
              <slot @slotchange=${this._handleSlotchange}></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementEventMap {
    inputAutocomplete: CustomEvent<{ option: SbbOptionBaseElement<any> }>;
  }
}
