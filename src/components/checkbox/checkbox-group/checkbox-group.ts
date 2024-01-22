import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getNextElementIndex, interactivityChecker, isArrowKeyPressed } from '../../core/a11y';
import { NamedSlotStateController } from '../../core/common-behaviors';
import { toggleDatasetEntry } from '../../core/dom';
import { ConnectedAbortController } from '../../core/eventing';
import type { SbbHorizontalFrom, SbbOrientation } from '../../core/interfaces';
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

  /** List of contained checkbox elements. */
  public get checkboxes(): SbbCheckboxElement[] {
    return Array.from(this.querySelectorAll?.('sbb-checkbox') ?? []).filter(
      (el: SbbCheckboxElement) => el.closest('sbb-checkbox-group') === this,
    );
  }

  private _abort: ConnectedAbortController = new ConnectedAbortController(this);

  public constructor() {
    super();
    new NamedSlotStateController(this);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('keydown', (e) => this._handleKeyDown(e), { signal });
    toggleDatasetEntry(this, 'hasSelectionPanel', !!this.querySelector?.('sbb-selection-panel'));
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('disabled')) {
      this.checkboxes.forEach((c) => c.requestUpdate?.('disabled'));
    }
    if (changedProperties.has('required')) {
      this.checkboxes.forEach((c) => c.requestUpdate?.('required'));
    }
    if (changedProperties.has('size')) {
      this.checkboxes.forEach((c) => c.requestUpdate?.('size'));
    }
  }

  private _handleKeyDown(evt: KeyboardEvent): void {
    const enabledCheckboxes: SbbCheckboxElement[] = this.checkboxes.filter(
      (checkbox: SbbCheckboxElement) =>
        !checkbox.disabled && interactivityChecker.isVisible(checkbox),
    );

    if (
      !enabledCheckboxes ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this &&
        (evt.target as HTMLElement).parentElement !== this &&
        (evt.target as HTMLElement).parentElement!.nodeName !== 'SBB-SELECTION-PANEL')
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

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-checkbox-group">
        <slot></slot>
      </div>
      <div class="sbb-checkbox-group__error">
        <slot name="error"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-checkbox-group': SbbCheckboxGroupElement;
  }
}
