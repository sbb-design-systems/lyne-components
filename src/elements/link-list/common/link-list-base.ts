import type { PropertyValues, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { slotState } from '../../core/decorators.js';
import {
  SbbNamedSlotListMixin,
  SbbNegativeMixin,
  type WithListChildren,
} from '../../core/mixins.js';
import type {
  SbbBlockLinkButtonElement,
  SbbBlockLinkElement,
  SbbBlockLinkStaticElement,
} from '../../link.js';
import type { SbbTitleLevel } from '../../title.js';

import '../../title.js';

/**
 * It displays a list of `sbb-block-link`.
 *
 * @slot - Use the unnamed slot to add one or more `sbb-block-link`.
 * @slot title - Use this slot to provide a title.
 */
@slotState()
export class SbbLinkListBaseElement extends SbbNegativeMixin(
  SbbNamedSlotListMixin<
    SbbBlockLinkElement | SbbBlockLinkButtonElement | SbbBlockLinkStaticElement,
    typeof LitElement
  >(LitElement),
) {
  protected override readonly listChildLocalNames = [
    'sbb-block-link',
    'sbb-block-link-button',
    'sbb-block-link-static',
  ];

  /** The title text we want to show before the list. */
  @property({ attribute: 'title-content', reflect: true }) public titleContent?: string;

  /** The semantic level of the title, e.g. 2 = h2. */
  @property({ attribute: 'title-level' }) public titleLevel: SbbTitleLevel = '2';

  protected override willUpdate(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('negative') || changedProperties.has('listChildren')) {
      for (const link of this.listChildren) {
        link.negative = this.negative;
      }
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-link-list-wrapper">
        <sbb-title
          class="sbb-link-list-title"
          level=${this.titleLevel || nothing}
          visual-level="5"
          ?negative=${this.negative}
          id="sbb-link-list-title-id"
        >
          <slot name="title">${this.titleContent}</slot>
        </sbb-title>
        ${this.renderList({ ariaLabelledby: 'sbb-link-list-title-id' })}
      </div>
    `;
  }
}
