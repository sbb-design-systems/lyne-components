import {
  type CSSResultGroup,
  defaultConverter,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import {
  FormAssociatedMixin,
  type FormRestoreReason,
  type FormRestoreState,
  LanguageController,
  NamedSlotStateController,
  SbbDisabledMixin,
  SbbIconNameMixin,
  SbbRequiredMixin,
  UpdateScheduler,
} from '../../core/common-behaviors';
import {
  ConnectedAbortController,
  EventEmitter,
  preventScrollOnSpacebarPress,
} from '../../core/eventing';
import { i18nCollapsed, i18nExpanded } from '../../core/i18n';
import type {
  SbbCheckedStateChange,
  SbbDisabledStateChange,
  SbbIconPlacement,
  SbbStateChange,
} from '../../core/interfaces';
import type { SbbSelectionPanelElement } from '../../selection-panel';
import type { SbbCheckboxGroupElement } from '../checkbox-group';

import style from './checkbox.scss?lit&inline';

import '../../icon';
import '../../screenreader-only';
import '../../visual-checkbox';

export type SbbCheckboxStateChange = Extract<
  SbbStateChange,
  SbbDisabledStateChange | SbbCheckedStateChange
>;

export type SbbCheckboxSize = 's' | 'm';

type SbbCheckedAttributeSetter = { value: boolean; attribute: boolean };

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
export class SbbCheckboxElement extends UpdateScheduler(
  FormAssociatedMixin(SbbDisabledMixin(SbbRequiredMixin(SbbIconNameMixin(LitElement)))),
) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    didChange: 'didChange',
    stateChange: 'stateChange',
    checkboxLoaded: 'checkboxLoaded',
  } as const;

  /** Whether the checkbox is indeterminate. */
  @property({ type: Boolean }) public indeterminate = false;

  /** The label position relative to the labelIcon. Defaults to end */
  @property({ attribute: 'icon-placement', reflect: true })
  public iconPlacement: SbbIconPlacement = 'end';

  /** Whether the checkbox is checked. */
  @property({
    type: Boolean,
    converter: {
      ...defaultConverter,
      // We need to pass information to the setter so that we know it was called by attribute change.
      fromAttribute: (value: string | null, type?: unknown): SbbCheckedAttributeSetter => {
        const result = defaultConverter.fromAttribute?.(value, type);
        return { value: result, attribute: true } as SbbCheckedAttributeSetter;
      },
    },
  })
  public set checked(value: boolean) {
    const attributeSetter =
      typeof value === 'object' ? (value as unknown as SbbCheckedAttributeSetter).attribute : false;
    if (attributeSetter) {
      value = (value as unknown as SbbCheckedAttributeSetter).value;
    }

    // As soon as mutation was done not by setting attribute,
    // we need to block syncing attribute.
    if (this.hasUpdated && !attributeSetter) {
      this._attributeMutationBlocked = true;
    }
    this._checked = Boolean(value);
    this.updateFormValue();
  }
  public get checked(): boolean {
    return this._checked;
  }
  private _checked = false;

  /** Label size variant, either m or s. */
  @property({ reflect: true })
  public set size(value: SbbCheckboxSize) {
    this._size = value;
  }
  public get size(): SbbCheckboxSize {
    return this.group?.size ?? this._size;
  }
  private _size: SbbCheckboxSize = 'm';

  /** Reference to the connected checkbox group. */
  public get group(): SbbCheckboxGroupElement | null {
    return this._group;
  }
  private _group: SbbCheckboxGroupElement | null = null;

  /**
   * Whether the input is the main input of a selection panel.
   * @internal
   */
  public get isSelectionPanelInput(): boolean {
    return this.hasAttribute('data-is-selection-panel-input');
  }

  /** The label describing whether the selection panel is expanded (for screen readers only). */
  @state() private _selectionPanelExpandedLabel!: string;

  private _abort: ConnectedAbortController = new ConnectedAbortController(this);
  private _attributeMutationBlocked: boolean = false;
  private _language = new LanguageController(this);
  private _selectionPanelElement: SbbSelectionPanelElement | null = null;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  private _didChange: EventEmitter = new EventEmitter(this, SbbCheckboxElement.events.didChange);

  /**
   * @internal
   * Internal event that emits whenever the state of the checkbox
   * in relation to the parent selection panel changes.
   */
  private _stateChange: EventEmitter<SbbCheckboxStateChange> = new EventEmitter(
    this,
    SbbCheckboxElement.events.stateChange,
  );

  /**
   * @internal
   * Internal event that emits when the checkbox is loaded.
   */
  private _checkboxLoaded: EventEmitter<void> = new EventEmitter(
    this,
    SbbCheckboxElement.events.checkboxLoaded,
  );

  public constructor() {
    super();
    new NamedSlotStateController(this);
    /** @internal */
    this.internals.role = 'checkbox';
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._group = this.closest('sbb-checkbox-group') as SbbCheckboxGroupElement;
    // We can use closest here, as we expect the parent sbb-selection-panel to be in light DOM.
    this._selectionPanelElement = this.closest?.('sbb-selection-panel');
    this.toggleAttribute('data-is-inside-selection-panel', !!this._selectionPanelElement);
    this.toggleAttribute(
      'data-is-selection-panel-input',
      !!this._selectionPanelElement && !this.closest?.('sbb-selection-panel [slot="content"]'),
    );

    const signal = this._abort.signal;
    this.addEventListener('click', () => this._handleInputEvent(), { signal });
    this.addEventListener('keydown', (e) => preventScrollOnSpacebarPress(e), { signal });
    this.addEventListener('keyup', (e) => e.key === ' ' && this._handleInputEvent(), { signal });
    this._checkboxLoaded.emit();

    // We need to call requestUpdate to update the reflected attributes
    ['disabled', 'required', 'size'].forEach((p) => this.requestUpdate(p));
  }

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    this.setAttribute('tabindex', '0');
    return super.createRenderRoot();
  }

  public override attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null,
  ): void {
    // Attribute should not be interpreted after programmatic or manual state change.
    if (name !== 'checked' || !this._attributeMutationBlocked) {
      super.attributeChangedCallback(name, old, value);
    }
  }

  protected override async willUpdate(changedProperties: PropertyValues<this>): Promise<void> {
    if (changedProperties.has('checked')) {
      if (this.isSelectionPanelInput && this.checked !== changedProperties.get('checked')!) {
        this._stateChange.emit({ type: 'checked', checked: this.checked });
        this._updateExpandedLabel();
      }
    }
    if (changedProperties.has('disabled')) {
      if (this.isSelectionPanelInput && this.disabled !== changedProperties.get('disabled')!) {
        this._stateChange.emit({ type: 'disabled', disabled: this.disabled });
      }
    }
    if (changedProperties.has('checked') || changedProperties.has('indeterminate')) {
      this.internals.ariaChecked = this.indeterminate
        ? 'mixed'
        : this.checked?.toString() ?? 'false';
    }
    if (changedProperties.has('required')) {
      // Firefox needs explicitly set aria-required value.
      this.internals.ariaRequired = `${this.required}`;
    }
  }

  protected override firstUpdated(): void {
    // We need to wait for the selection-panel to be fully initialized
    this.startUpdate();
    setTimeout(() => {
      this.isSelectionPanelInput && this._updateExpandedLabel();
      this.completeUpdate();
    });
  }

  protected override isDisabledExternally(): boolean {
    return this.group?.disabled ?? false;
  }

  protected override updateFormValue(): void {
    if (this.checked) {
      this.internals.setFormValue(this.value, `${this.checked}`);
    } else {
      this.internals.setFormValue(null);
    }
  }

  /**
   * Is called whenever the form is being reset.
   *
   * @internal
   */
  public override formResetCallback(): void {
    this.checked = this.hasAttribute('checked');
  }

  /**
   *  Called when the browser is trying to restore element’s state to state in which case
   *  reason is “restore”, or when the browser is trying to fulfill autofill on behalf of
   *  user in which case reason is “autocomplete”.
   *  In the case of “restore”, state is a string, File, or FormData object
   *  previously set as the second argument to setFormValue.
   *
   * @internal
   */
  public override formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    if (state) {
      this.checked = state === 'true';
    }
  }

  protected override isRequiredExternally(): boolean {
    return this.group?.required ?? false;
  }

  // Forward the click on the inner label.
  /** Method triggered on checkbox click. */
  private _handleInputEvent(): void {
    if (this.disabled) {
      return;
    }
    if (this.indeterminate) {
      this.indeterminate = false;
    }
    this.checked = !this.checked;
    this._attributeMutationBlocked = true;

    this.dispatchEvent(new InputEvent('input', { composed: true, bubbles: true }));
    this.dispatchEvent(new Event('change', { bubbles: true }));
    this._didChange.emit();
  }

  private _updateExpandedLabel(): void {
    // TODO: await hydration
    if (!this._selectionPanelElement?.hasContent) {
      this._selectionPanelExpandedLabel = '';
      this.removeAttribute('data-has-selection-panel-label');
      return;
    }

    this._selectionPanelExpandedLabel = this.checked
      ? ', ' + i18nExpanded[this._language.current]
      : ', ' + i18nCollapsed[this._language.current];
    this.toggleAttribute('data-has-selection-panel-label', true);
  }

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-checkbox-wrapper">
        <span class="sbb-checkbox__inner">
          <span class="sbb-checkbox__aligner">
            <sbb-visual-checkbox
              ?checked=${this.checked}
              ?indeterminate=${this.indeterminate}
              ?disabled=${this.disabled || this.formDisabled}
            ></sbb-visual-checkbox>
          </span>
          <span class="sbb-checkbox__label">
            <slot></slot>
            <span class="sbb-checkbox__label--icon">${this.renderIconSlot()}</span>
            <slot name="suffix"></slot>
          </span>
        </span>
        <slot name="subtext"></slot>
        <sbb-screenreader-only class="sbb-checkbox__expanded-label">
          ${this._selectionPanelExpandedLabel}
        </sbb-screenreader-only>
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
