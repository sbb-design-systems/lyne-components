import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import {
  html,
  LitElement,
  nothing,
  type PropertyDeclaration,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { property, state } from 'lit/decorators.js';

import { isAndroid, isBlink, isSafari, setOrRemoveAttribute } from '../../core/dom.ts';
import {
  SbbDisabledMixin,
  SbbElementInternalsMixin,
  SbbHydrationMixin,
} from '../../core/mixins.ts';
import { SbbIconNameMixin } from '../../icon.ts';

import '../../screen-reader-only.ts';

let nextId = 0;

/**
 * On Safari, the groups labels are not read by VoiceOver.
 * To solve the problem, we remove the role="group" and add an hidden span containing the group name
 * TODO: We should periodically check if it has been solved and, if so, remove the property.
 */
const inertAriaGroups = isSafari;

/** Configuration for the attribute to look at if component is nested in an option group */
const optionObserverConfig: MutationObserverInit = {
  childList: true,
  subtree: true,
  characterData: true,
};

export abstract class SbbOptionBaseElement<T = string> extends SbbDisabledMixin(
  SbbIconNameMixin(SbbElementInternalsMixin(SbbHydrationMixin(LitElement))),
) {
  public static readonly events = {
    optionselected: 'optionselected',
  } as const;

  protected abstract optionId: string;

  /**
   * Value of the option.
   *
   * @description Developer note: In this case updating the attribute must be synchronous.
   * Due to this, it is implemented as a getter/setter and the attributeChangedCallback() handles the diff check.
   */
  @property()
  public set value(value: T) {
    if (typeof value === 'string') {
      this.setAttribute('value', `${value}`);
      this._value = null;
    } else {
      this._value = value;
    }
  }
  public get value(): T {
    return (this._value ?? this.getAttribute('value')) as T;
  }
  private _value: T | null = null;

  /** Whether the option is selected. */
  @property({ type: Boolean })
  public set selected(value: boolean) {
    this.toggleAttribute('selected', value);
    this._updateAriaSelected();
  }
  public get selected(): boolean {
    return this.hasAttribute('selected');
  }

  /** Whether the component must be set disabled due disabled attribute on sbb-optgroup. */
  @state() protected accessor disabledFromGroup = false;

  @state() protected accessor groupLabel = '';

  @state() protected accessor label!: string;

  /** Disable the highlight of the label. */
  @state() protected accessor disableLabelHighlight: boolean = false;

  /** The portion of the highlighted label. */
  @state() private accessor _highlightString: string | null = null;

  @state() private accessor _inertAriaGroups = false;

  public constructor() {
    super();
    this.addEventListener?.('click', (e: MouseEvent) => this.selectByClick(e), {
      passive: true,
    });

    this.addController(
      new MutationController(this, {
        config: optionObserverConfig,
        callback: () => {
          this.handleHighlightState();
          /** @internal */
          this.dispatchEvent(new Event('optionLabelChanged', { bubbles: true }));
        },
      }),
    );

    if (inertAriaGroups) {
      if (this.hydrationRequired) {
        this.hydrationComplete.then(() => (this._inertAriaGroups = inertAriaGroups));
      } else {
        this._inertAriaGroups = inertAriaGroups;
      }
    }
  }

  public override attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null,
  ): void {
    if (name !== 'value' || old !== value) {
      super.attributeChangedCallback(name, old, value);
    }
  }

  /**
   * Highlight the label of the option
   * @param value the highlighted portion of the label
   * @internal
   */
  public highlight(value: string): void {
    this._highlightString = value;
  }

  protected selectViaUserInteraction(selected: boolean): void {
    this.selected = selected;
    if (this.selected) {
      /** Emits when an option was selected by user. */
      this.dispatchEvent(new Event('optionselected', { bubbles: true, composed: true }));
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.id ||= `${this.optionId}-${nextId++}`;
  }

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);
    if (name === 'disabled' || name === 'disabledFromGroup') {
      this.toggleState('disabled', this.disabled || this.disabledFromGroup);
      setOrRemoveAttribute(
        this,
        'tabindex',
        isAndroid && !this.disabled && !this.disabledFromGroup ? 0 : null,
      );
      this.updateAriaDisabled();
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    // Init first select state because false would not call setter of selected property.
    this._updateAriaSelected();
  }

  protected abstract selectByClick(event: MouseEvent): void;

  protected updateDisableHighlight(disabled: boolean): void {
    this.disableLabelHighlight = disabled;
    this.toggleState('disable-highlight', disabled);
  }

  /**
   * Whether the option is currently active.
   * @internal
   */
  public setActive(value: boolean): void {
    this.toggleState('active', value);
  }

  protected updateAriaDisabled(): void {
    this.internals.ariaDisabled = this.disabled || this.disabledFromGroup ? 'true' : null;

    // Listened by autocomplete
    /** @internal */
    this.dispatchEvent(new Event('ɵdisabledchange', { bubbles: true }));
  }

  private _updateAriaSelected(): void {
    this.internals.ariaSelected = `${this.selected}`;
  }

  protected handleHighlightState(): void {
    const slotNodes = Array.from(this.childNodes ?? []).filter(
      (n) => n.nodeType !== Node.COMMENT_NODE && (!(n instanceof Element) || n.slot !== 'icon'),
    );
    const labelNodes = slotNodes.filter((el) => el.nodeType === Node.TEXT_NODE) as Text[];

    // Disable the highlight if the slot contain more than just text nodes.
    // We need to ignore template elements, as SSR adds a declarative shadow DOM
    // in the form of a template element.
    if (
      labelNodes.length === 0 ||
      slotNodes.filter((n) => !(n instanceof Element) || n.localName !== 'template').length !==
        labelNodes.length
    ) {
      this.updateDisableHighlight(true);
      return;
    }
    this.label = labelNodes
      .map((l) => l.wholeText)
      .filter((l) => l.trim())
      .join('');
  }

  protected getHighlightedLabel(): TemplateResult {
    if (!this._highlightString || !this._highlightString.trim()) {
      return html`${this.label}`;
    }

    const matchIndex = this.label!.toLowerCase().indexOf(this._highlightString.toLowerCase());

    if (matchIndex === -1) {
      return html`${this.label}`;
    }

    const prefix = this.label!.substring(0, matchIndex);
    const highlighted = this.label!.substring(
      matchIndex,
      matchIndex + this._highlightString.length,
    );
    const postfix = this.label!.substring(matchIndex + this._highlightString.length);

    return html`
      <span class="sbb-option__label--highlight">${prefix}</span><span>${highlighted}</span
      ><span class="sbb-option__label--highlight">${postfix}</span>
    `;
  }

  protected renderIcon(): TemplateResult {
    return html`<span class="sbb-option__icon"> ${this.renderIconSlot()} </span>`;
  }

  protected renderLabel(): TemplateResult | typeof nothing {
    return this.label && !this.disableLabelHighlight ? this.getHighlightedLabel() : nothing;
  }

  protected renderTick(): TemplateResult | typeof nothing {
    return nothing;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-option">
        ${this.renderIcon()}
        <span class="sbb-option__label">
          <slot @slotchange=${this.handleHighlightState}></slot>
          <span
            aria-hidden=${
              /**
               * Screen readers with Chromium read the option twice.
               * We therefore have to hide the option for the screen readers.
               * TODO: Recheck periodically if this is still necessary.
               * https://issues.chromium.org/issues/460165741
               */
              isBlink ? 'true' : nothing
            }
          >
            ${this.renderLabel()}
          </span>
          ${this._inertAriaGroups && this.groupLabel
            ? html`<sbb-screen-reader-only> (${this.groupLabel})</sbb-screen-reader-only>`
            : nothing}
        </span>
        ${this.renderTick()}
      </div>
    `;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    optionselected: Event;
  }
}
