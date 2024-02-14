import type { CSSResultGroup, TemplateResult, PropertyValues } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import {
  LanguageController,
  NamedSlotStateController,
  SbbIconNameMixin,
  UpdateScheduler,
} from '../../core/common-behaviors';
import { setAttributes } from '../../core/dom';
import {
  HandlerRepository,
  formElementHandlerAspect,
  getEventTarget,
  forwardEventToHost,
  EventEmitter,
  ConnectedAbortController,
} from '../../core/eventing';
import { i18nCollapsed, i18nExpanded } from '../../core/i18n';
import type {
  SbbIconPlacement,
  SbbStateChange,
  SbbCheckedStateChange,
  SbbDisabledStateChange,
} from '../../core/interfaces';
import '../../visual-checkbox';
import type { SbbSelectionPanelElement } from '../../selection-panel';
import type { SbbCheckboxGroupElement } from '../checkbox-group';

import style from './checkbox.scss?lit&inline';

export type SbbCheckboxStateChange = Extract<
  SbbStateChange,
  SbbDisabledStateChange | SbbCheckedStateChange
>;

export type SbbCheckboxSize = 's' | 'm';

/**
 * It displays a checkbox enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-checkbox`.
 * @slot icon - Slot used to render the checkbox icon (disabled inside a selection panel).
 * @slot subtext - Slot used to render a subtext under the label (only visible within a selection panel).
 * @slot suffix - Slot used to render additional content after the label (only visible within a selection panel).
 * @event {CustomEvent<void>} didChange - Deprecated. used for React. Will probably be removed once React 19 is available.
 */
@customElement('sbb-checkbox')
export class SbbCheckboxElement extends UpdateScheduler(SbbIconNameMixin(LitElement)) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    didChange: 'didChange',
    stateChange: 'stateChange',
    checkboxLoaded: 'checkboxLoaded',
  } as const;

  /** Value of checkbox. */
  @property() public value?: string;

  /** Whether the checkbox is disabled. */
  @property({ reflect: true, type: Boolean })
  public set disabled(value: boolean) {
    this._disabled = value;
  }
  public get disabled(): boolean {
    return this._disabled || (this.group?.disabled ?? false);
  }
  private _disabled = false;

  /** Whether the checkbox is required. */
  @property({ reflect: true, type: Boolean })
  public set required(value: boolean) {
    this._required = value;
  }
  public get required(): boolean {
    return this._required || (this.group?.required ?? false);
  }
  private _required = false;

  /** Reference to the connected checkbox group. */
  public get group(): SbbCheckboxGroupElement | null {
    return this._group;
  }
  private _group: SbbCheckboxGroupElement | null = null;

  /** Whether the checkbox is indeterminate. */
  @property({ reflect: true, type: Boolean }) public indeterminate = false;

  /** The label position relative to the labelIcon. Defaults to end */
  @property({ attribute: 'icon-placement', reflect: true })
  public iconPlacement: SbbIconPlacement = 'end';

  /** Whether the checkbox is checked. */
  @property({ reflect: true, type: Boolean }) public checked = false;

  /** Label size variant, either m or s. */
  @property({ reflect: true })
  public set size(value: SbbCheckboxSize) {
    this._size = value;
  }
  public get size(): SbbCheckboxSize {
    return this.group?.size ?? this._size;
  }
  private _size: SbbCheckboxSize = 'm';

  /**
   * Whether the input is the main input of a selection panel.
   * @internal
   */
  public get isSelectionPanelInput(): boolean {
    return this._isSelectionPanelInput;
  }
  @state() private _isSelectionPanelInput = false;

  /** The label describing whether the selection panel is expanded (for screen readers only). */
  @state() private _selectionPanelExpandedLabel!: string;

  private _checkbox: HTMLInputElement | null = null;
  private _selectionPanelElement: SbbSelectionPanelElement | null = null;
  private _abort: ConnectedAbortController = new ConnectedAbortController(this);
  private _language = new LanguageController(this);

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  private _didChange: EventEmitter = new EventEmitter(this, SbbCheckboxElement.events.didChange, {
    bubbles: true,
    cancelable: true,
  });

  /**
   * @internal
   * Internal event that emits whenever the state of the checkbox
   * in relation to the parent selection panel changes.
   */
  private _stateChange: EventEmitter<SbbCheckboxStateChange> = new EventEmitter(
    this,
    SbbCheckboxElement.events.stateChange,
    { bubbles: true },
  );

  /**
   * @internal
   * Internal event that emits when the checkbox is loaded.
   */
  private _checkboxLoaded: EventEmitter<void> = new EventEmitter(
    this,
    SbbCheckboxElement.events.checkboxLoaded,
    { bubbles: true },
  );

  private _handleCheckedChange(currentValue: boolean, previousValue: boolean): void {
    if (this._isSelectionPanelInput && currentValue !== previousValue) {
      this._stateChange.emit({ type: 'checked', checked: currentValue });
      this._updateExpandedLabel();
    }
  }

  private _handleDisabledChange(currentValue: boolean, previousValue: boolean): void {
    if (this._isSelectionPanelInput && currentValue !== previousValue) {
      this._stateChange.emit({ type: 'disabled', disabled: currentValue });
    }
  }

  private _handlerRepository = new HandlerRepository(this, formElementHandlerAspect);

  public constructor() {
    super();
    new NamedSlotStateController(this);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._group = this.closest('sbb-checkbox-group') as SbbCheckboxGroupElement;
    // We can use closest here, as we expect the parent sbb-selection-panel to be in light DOM.
    this._selectionPanelElement = this.closest?.('sbb-selection-panel');
    this._isSelectionPanelInput =
      !!this._selectionPanelElement && !this.closest?.('sbb-selection-panel [slot="content"]');

    const signal = this._abort.signal;
    this.addEventListener('click', (e) => this._handleClick(e), { signal });
    this.addEventListener('keyup', (e) => this._handleKeyup(e), { signal });
    this._handlerRepository.connect();
    this._checkboxLoaded.emit();

    // We need to call requestUpdate to update the reflected attributes
    ['disabled', 'required', 'size'].forEach((p) => this.requestUpdate(p));
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('checked')) {
      this._handleCheckedChange(this.checked, changedProperties.get('checked')!);
    }
    if (changedProperties.has('disabled')) {
      this._handleDisabledChange(this.disabled, changedProperties.get('disabled')!);
    }
  }

  protected override firstUpdated(): void {
    // We need to wait for the selection-panel to be fully initialized
    this.startUpdate();
    setTimeout(() => {
      this._isSelectionPanelInput && this._updateExpandedLabel();
      this.completeUpdate();
    });
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  // Forward the click on the inner label.
  private _handleClick(event: MouseEvent): void {
    if (!this.disabled && getEventTarget(event) === this) {
      this.shadowRoot!.querySelector('label')?.click();
    }
  }

  private _handleKeyup(event: KeyboardEvent): void {
    // The native checkbox input toggles state on keyup with space.
    if (!this.disabled && event.key === ' ') {
      // The toggle needs to happen after the keyup event finishes, so we schedule
      // it to be triggered after the current event loop.
      setTimeout(() => this._checkbox?.click());
    }
  }

  private _handleChangeEvent(event: Event): void {
    forwardEventToHost(event, this);
    this._didChange.emit();
  }

  /**
   * Method triggered on checkbox input event.
   * If not indeterminate, inverts the value; otherwise sets checked to true.
   */
  private _handleInputEvent(): void {
    if (this.indeterminate) {
      this.checked = true;
      this.indeterminate = false;
    } else {
      this.checked = this._checkbox?.checked ?? false;
    }
  }

  private _updateExpandedLabel(): void {
    if (!this._selectionPanelElement?.hasContent) {
      this._selectionPanelExpandedLabel = '';
      return;
    }

    this._selectionPanelExpandedLabel = this.checked
      ? ', ' + i18nExpanded[this._language.current]
      : ', ' + i18nCollapsed[this._language.current];
  }

  protected override render(): TemplateResult {
    const attributes: Record<string, string | boolean> = {
      role: 'checkbox',
      'aria-checked': this.indeterminate ? 'mixed' : this.checked?.toString() ?? 'false',
      'aria-required': this.required.toString(),
      'aria-disabled': this.disabled.toString(),
      'data-is-selection-panel-input': this._isSelectionPanelInput,
      ...(this.disabled ? undefined : { tabIndex: '0' }),
    };
    setAttributes(this, attributes);

    return html`
      <span class="sbb-checkbox-wrapper">
        <label class="sbb-checkbox">
          <input
            type="checkbox"
            aria-hidden="true"
            tabindex=${-1}
            ?disabled=${this.disabled}
            ?required=${this.required}
            ?checked=${this.checked}
            .value=${this.value || nothing}
            @input=${() => this._handleInputEvent()}
            @change=${(event: Event) => this._handleChangeEvent(event)}
            @focus=${() => this.focus()}
            ${ref((checkbox?: Element) => {
              if (checkbox) {
                this._checkbox = checkbox as HTMLInputElement;
                // Forward indeterminate state to native input. As it is only a property, we have to set it programmatically.
                this._checkbox.indeterminate = this.indeterminate;
              }
            })}
          />
          <span class="sbb-checkbox__inner">
            <span class="sbb-checkbox__aligner">
              <sbb-visual-checkbox
                ?checked=${this.checked}
                ?indeterminate=${this.indeterminate}
                ?disabled=${this.disabled}
              ></sbb-visual-checkbox>
            </span>
            <span class="sbb-checkbox__label">
              <slot></slot>
              <span class="sbb-checkbox__label--icon"> ${this.renderIconSlot()} </span>
              ${this._selectionPanelElement ? html`<slot name="suffix"></slot>` : nothing}
            </span>
          </span>
          ${this._selectionPanelElement ? html`<slot name="subtext"></slot>` : nothing}
          ${this._isSelectionPanelInput && this._selectionPanelExpandedLabel
            ? html`<span class="sbb-checkbox__expanded-label"
                >${this._selectionPanelExpandedLabel}</span
              >`
            : nothing}
        </label>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-checkbox': SbbCheckboxElement;
  }
}
