import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbElementInternalsMixin } from '../core/mixins.ts';
import { boxSizingStyles } from '../core/styles.ts';
import { SbbIconNameMixin } from '../icon.ts';
import type { SbbTitleElement } from '../title.ts';

import style from './status.scss?lit&inline';

export type SbbStatusType =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'pending'
  | 'incomplete'
  | 'not-started'
  | 'in-progress';

/**
 * Displays a message to the user's attention.
 *
 * @slot - Use the unnamed slot to add an optional `sbb-title` and content to the status message.
 * @slot icon - Use this slot to override the default status icon.
 * @slot title - Slot for the title. For the standard `sbb-title` element, the slot is automatically assigned when slotted in the unnamed slot.
 * @cssprop [--sbb-status-color=var(--sbb-color-iron)] - Specify a custom color,
 * which will override the predefined color for any type.
 * @cssprop [--sbb-status-text-color=var(--sbb-status-color)] - Specify a custom text color,
 * which will override the predefined color for any type. Only valid for a status without a title.
 */
export
@customElement('sbb-status')
class SbbStatusElement extends SbbIconNameMixin(SbbElementInternalsMixin(LitElement)) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  private readonly _statusTypes: Map<SbbStatusType, string> = new Map([
    ['info', 'circle-information-small'],
    ['success', 'circle-tick-small'],
    ['warning', 'circle-exclamation-point-small'],
    ['error', 'circle-cross-small'],
    ['pending', 'circle-three-dots-small'],
    ['incomplete', 'circle-dotted-part-x-small'],
    ['not-started', 'circle-dotted-small'],
    ['in-progress', 'circle-dotted-part-small'],
  ]);

  /** The type of the status. */
  @property({ reflect: true }) public accessor type: SbbStatusType = 'info';

  private _handleSlotchange(): void {
    const title = Array.from(this.children).find((el) => el.localName === 'sbb-title');
    if (title) {
      title.slot = 'title';
    }
  }

  private _configureTitle(event: Event): void {
    const title = (event.target as HTMLSlotElement)
      .assignedElements()
      .find((e): e is SbbTitleElement => e.localName === 'sbb-title');
    if (title) {
      customElements.upgrade(title);
      title.visualLevel = '5';
    }
  }

  protected override renderIconName(): string {
    return super.renderIconName() || this._statusTypes.get(this.type)!;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-status">
        <span class="sbb-status__icon"> ${this.renderIconSlot()} </span>
        <span class="sbb-status__content">
          <slot name="title" @slotchange=${this._configureTitle}></slot>
          <p class="sbb-status__content-slot" @slotchange=${this._handleSlotchange}>
            <slot></slot>
          </p>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-status': SbbStatusElement;
  }
}
