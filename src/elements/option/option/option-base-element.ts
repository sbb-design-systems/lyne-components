import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import { html, LitElement, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

import { slotState } from '../../core/decorators.js';
import { isAndroid, isSafari, setOrRemoveAttribute } from '../../core/dom.js';
import {
  SbbDisabledMixin,
  SbbElementInternalsMixin,
  SbbHydrationMixin,
} from '../../core/mixins.js';
import { SbbIconNameMixin } from '../../icon.js';

import '../../screen-reader-only.js';

let nextId = 0;

/**
 * On Safari, the groups labels are not read by VoiceOver.
 * To solve the problem, we remove the role="group" and add an hidden span containing the group name
 * TODO: We should periodically check if it has been solved and, if so, remove the property.
 */
const inertAriaGroups = isSafari;

/** Configuration for the attribute to look at if component is nested in an option group */
const optionObserverConfig: MutationObserverInit = {
  attributeFilter: ['data-group-disabled', 'data-negative'],
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true,
};

export
@slotState()
abstract class SbbOptionBaseElement<T = string> extends SbbDisabledMixin(
  SbbIconNameMixin(SbbElementInternalsMixin(SbbHydrationMixin(LitElement))),
) {
  public static readonly events = {
    optionselected: 'optionselected',
  } as const;

  protected abstract optionId: string;
  private _labelNode: Text[] = [];

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
    return (this._value ?? this.getAttribute('value') ?? '') as T;
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

  /** Whether to apply the negative styling */
  @state() protected accessor negative = false;

  /** Whether the component must be set disabled due disabled attribute on sbb-optgroup. */
  @state() protected accessor disabledFromGroup = false;

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
        callback: (mutationsList) => this.onExternalMutation(mutationsList),
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
   * Calculates and returns the text's range to highlight.
   * @param value the highlighted portion of the label
   * @internal
   */
  public getRangesToHighlight(value: string): Range[] {
    this._highlightString = value;
    if (!this._highlightString || !this._highlightString.trim()) {
      return [];
    }

    const label = this._labelNode
      .map((l) => l.wholeText)
      .filter((l) => l.trim())
      .join();
    const matchIndex = label!.toLowerCase().indexOf(this._highlightString.toLowerCase());
    if (matchIndex === -1) {
      return [];
    }

    const rangeBefore = new Range();
    rangeBefore.setStart(this._labelNode[0], 0);
    rangeBefore.setEnd(this._labelNode[0], matchIndex);
    const rangeAfter = new Range();
    rangeAfter.setStart(this._labelNode[0], matchIndex + this._highlightString.length);
    rangeAfter.setEnd(this._labelNode[0], this._labelNode[0].length);
    return [rangeBefore, rangeAfter];
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
    if (this.hydrationRequired) {
      this.hydrationComplete.then(() => this.init());
    } else {
      this.init();
    }
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('disabled')) {
      setOrRemoveAttribute(this, 'tabindex', isAndroid && !this.disabled && 0);
      this.updateAriaDisabled();
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    // Init first select state because false would not call setter of selected property.
    this._updateAriaSelected();
  }

  protected abstract selectByClick(event: MouseEvent): void;
  protected abstract setAttributeFromParent(): void;

  protected updateDisableHighlight(disabled: boolean): void {
    this.disableLabelHighlight = disabled;
    this.toggleAttribute('data-disable-highlight', disabled);
  }

  /**
   * Whether the option is currently active.
   * @internal
   */
  public setActive(value: boolean): void {
    this.toggleAttribute('data-active', value);
  }

  protected init(): void {
    this.setAttributeFromParent();
  }

  protected updateAriaDisabled(): void {
    if (this.disabled || this.disabledFromGroup) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }
  }

  private _updateAriaSelected(): void {
    this.setAttribute('aria-selected', `${this.selected}`);
  }

  /** Observe changes on data attributes + slotted content and set the appropriate values. */
  protected onExternalMutation(mutationsList: MutationRecord[]): void {
    let contentChanged = false;
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'data-group-disabled') {
        this.disabledFromGroup = this.hasAttribute('data-group-disabled');
        this.updateAriaDisabled();
      } else if (mutation.attributeName === 'data-negative') {
        this.negative = this.hasAttribute('data-negative');
      } else {
        contentChanged = true;
      }
    }

    if (contentChanged) {
      this.handleHighlightState();
      /** @internal */
      this.dispatchEvent(new Event('optionLabelChanged', { bubbles: true }));
    }
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
    this._labelNode = labelNodes;
  }

  protected renderIcon(): TemplateResult {
    return html` <span class="sbb-option__icon"> ${this.renderIconSlot()} </span>`;
  }

  protected renderTick(): TemplateResult | typeof nothing {
    return nothing;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-option__container">
        <div class="sbb-option">
          ${this.renderIcon()}
          <span class="sbb-option__label">
            <slot @slotchange=${this.handleHighlightState}></slot>
            ${this._inertAriaGroups && this.getAttribute('data-group-label')
              ? html`<sbb-screen-reader-only>
                  (${this.getAttribute('data-group-label')})</sbb-screen-reader-only
                >`
              : nothing}
          </span>
          ${this.renderTick()}
        </div>
      </div>
    `;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    optionselected: CustomEvent<void>;
  }
}
