import { isArrowKeyPressed, getNextElementIndex, interactivityChecker } from '../../core/a11y';
import { toggleDatasetEntry, isValidAttribute } from '../../core/dom';
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
  ConnectedAbortController,
} from '../../core/eventing';
import { CSSResult, html, LitElement, nothing, TemplateResult, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SbbCheckbox, SbbCheckboxSize } from '../checkbox';
import style from './checkbox-group.scss?lit&inline';
import { SbbHorizontalFrom, SbbOrientation } from '../../core/interfaces';

/**
 * @slot - Use the unnamed slot to add `sbb-checkbox` elements to the checkbox group.
 * @slot error - Slot used to render the <sbb-form-error> inside the <sbb-checkbox-group>.
 */
@customElement('sbb-checkbox-group')
export class SbbCheckboxGroup extends LitElement {
  public static override styles: CSSResult = style;

  /** Whether the checkbox group is disabled. */
  @property({ type: Boolean }) public disabled = false;

  /** Whether the checkbox group is required. */
  @property({ type: Boolean }) public required = false;

  /** Size variant, either m or s. */
  @property() public size: SbbCheckboxSize = 'm';

  /** Overrides the behaviour of `orientation` property. */
  @property({ attribute: 'horizontal-from', reflect: true })
  public horizontalFrom?: SbbHorizontalFrom;

  /** Indicates the orientation of the checkboxes inside the `<sbb-checkbox-group>`. */
  @property({ reflect: true })
  public orientation: SbbOrientation = 'horizontal';

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @state() private _namedSlots = createNamedSlotState('error');

  private _handlerRepository = new HandlerRepository(
    this,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  private _abort: ConnectedAbortController = new ConnectedAbortController(this);

  private _updateDisabled(): void {
    for (const checkbox of this._checkboxes) {
      toggleDatasetEntry(checkbox, 'groupDisabled', this.disabled);
    }
  }

  private _updateRequired(): void {
    for (const checkbox of this._checkboxes) {
      toggleDatasetEntry(checkbox, 'groupRequired', this.required);
    }
  }

  private _updateSize(): void {
    for (const checkbox of this._checkboxes) {
      checkbox.size = this.size;
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('keydown', (e) => this._handleKeyDown(e), { signal });
    toggleDatasetEntry(this, 'hasSelectionPanel', !!this.querySelector('sbb-selection-panel'));
    this._handlerRepository.connect();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('disabled')) {
      this._updateDisabled();
    }
    if (changedProperties.has('required')) {
      this._updateRequired();
    }
    if (changedProperties.has('size')) {
      this._updateSize();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  private _handleKeyDown(evt: KeyboardEvent): void {
    const enabledCheckboxes: SbbCheckbox[] = this._checkboxes.filter(
      (checkbox: SbbCheckbox) =>
        !isValidAttribute(checkbox, 'disabled') && interactivityChecker.isVisible(checkbox),
    );

    if (
      !enabledCheckboxes ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this &&
        (evt.target as HTMLElement).parentElement !== this &&
        (evt.target as HTMLElement).parentElement.nodeName !== 'SBB-SELECTION-PANEL')
    ) {
      return;
    }

    if (isArrowKeyPressed(evt)) {
      const current: number = enabledCheckboxes.findIndex((e: SbbCheckbox) => e === evt.target);
      const nextIndex: number = getNextElementIndex(evt, current, enabledCheckboxes.length);
      enabledCheckboxes[nextIndex]?.focus();
    }
  }

  private _updateCheckboxes(): void {
    const checkboxes = this._checkboxes;

    for (const checkbox of checkboxes) {
      checkbox.size = this.size;
      toggleDatasetEntry(checkbox, 'groupDisabled', this.disabled);
      toggleDatasetEntry(checkbox, 'groupRequired', this.required);
    }
  }

  private get _checkboxes(): SbbCheckbox[] {
    return Array.from(this.querySelectorAll('sbb-checkbox')).filter(
      (el: SbbCheckbox) => el.closest('sbb-checkbox-group') === this,
    );
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-checkbox-group">
        <slot @slotchange=${() => this._updateCheckboxes()}></slot>
      </div>
      ${this._namedSlots.error
        ? html`<div class="sbb-checkbox-group__error">
            <slot name="error"></slot>
          </div>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-checkbox-group': SbbCheckboxGroup;
  }
}
