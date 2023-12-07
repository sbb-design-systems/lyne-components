import { CSSResultGroup, html, LitElement, nothing, TemplateResult, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { isArrowKeyPressed, getNextElementIndex, interactivityChecker } from '../../core/a11y';
import { toggleDatasetEntry } from '../../core/dom';
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
  ConnectedAbortController,
} from '../../core/eventing';
import { SbbHorizontalFrom, SbbOrientation } from '../../core/interfaces';
import type { SbbCheckboxElement, SbbCheckboxSize } from '../checkbox';

import style from './checkbox-group.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-checkbox`.
 *
 * @slot - Use the unnamed slot to add `sbb-checkbox` elements to the `sbb-checkbox-group`.
 * @slot error - Slot used to render a `sbb-form-error` inside the `sbb-checkbox-group`.
 */
@customElement('sbb-checkbox-group')
export class SbbCheckboxGroupElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Whether the checkbox group is disabled. */
  @property({ reflect: true, type: Boolean }) public disabled = false;

  /** Whether the checkbox group is required. */
  @property({ reflect: true, type: Boolean }) public required = false;

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

  private _didLoad = false;
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
    toggleDatasetEntry(this, 'hasSelectionPanel', !!this.querySelector?.('sbb-selection-panel'));
    this._handlerRepository.connect();
    this._updateCheckboxes();
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

  protected override firstUpdated(): void {
    this._didLoad = true;
    this._updateCheckboxes();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  private _handleKeyDown(evt: KeyboardEvent): void {
    const enabledCheckboxes: SbbCheckboxElement[] = this._checkboxes.filter(
      (checkbox: SbbCheckboxElement) =>
        !checkbox.disabled && interactivityChecker.isVisible(checkbox),
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
      const current: number = enabledCheckboxes.findIndex(
        (e: SbbCheckboxElement) => e === evt.target,
      );
      const nextIndex: number = getNextElementIndex(evt, current, enabledCheckboxes.length);
      enabledCheckboxes[nextIndex]?.focus();
    }
  }

  private _updateCheckboxes(): void {
    if (!this._didLoad) {
      return;
    }

    const checkboxes = this._checkboxes;

    for (const checkbox of checkboxes) {
      checkbox.size = this.size;
      toggleDatasetEntry(checkbox, 'groupDisabled', this.disabled);
      toggleDatasetEntry(checkbox, 'groupRequired', this.required);
    }
  }

  private get _checkboxes(): SbbCheckboxElement[] {
    return Array.from(this.querySelectorAll?.('sbb-checkbox') ?? []).filter(
      (el: SbbCheckboxElement) => el.closest('sbb-checkbox-group') === this,
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
    'sbb-checkbox-group': SbbCheckboxGroupElement;
  }
}
