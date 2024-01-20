import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { NamedSlotListElement, NamedSlotStateController } from '../../core/common-behaviors';
import type { SbbNavigationActionElement } from '../navigation-action';

import style from './navigation-list.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-navigation-action` within a `sbb-navigation-section`.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-navigation-list`.
 * @slot label - Use this to provide a label element.
 */
@customElement('sbb-navigation-list')
export class SbbNavigationListElement extends NamedSlotListElement<SbbNavigationActionElement> {
  public static override styles: CSSResultGroup = style;
  protected override readonly listChildTagNames = ['SBB-NAVIGATION-ACTION'];

  /**
   * The label to be shown before the action list.
   */
  @property({ reflect: true }) public label?: string;

  public constructor() {
    super();
    new NamedSlotStateController(this);
  }

  protected override formatChild(child: SbbNavigationActionElement): void {
    child.size = 'm';
  }

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-navigation-list__label" id="sbb-navigation-link-label-id">
        <slot name="label">${this.label}</slot>
      </span>
      <ul
        class="sbb-navigation-list__content"
        aria-labelledby="sbb-navigation-link-label-id"
        role=${this.roleOverride()}
      >
        ${this.renderListSlots()}
      </ul>
      ${this.renderHiddenSlot()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-navigation-list': SbbNavigationListElement;
  }
}
