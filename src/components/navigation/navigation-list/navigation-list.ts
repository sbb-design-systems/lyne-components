import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
  NamedSlotListElement,
  NamedSlotStateController,
  type WithListChildren,
} from '../../core/common-behaviors';
import type { SbbNavigationButtonElement, SbbNavigationLinkElement } from '../navigation-action';

import style from './navigation-list.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-navigation-button`/`sbb-navigation-link` within a `sbb-navigation-section`.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-navigation-list`.
 * @slot label - Use this to provide a label element.
 */
@customElement('sbb-navigation-list')
export class SbbNavigationListElement extends NamedSlotListElement<SbbNavigationButtonElement | SbbNavigationLinkElement> {
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

  protected override willUpdate(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('listChildren')) {
      this.listChildren.forEach((c) => (c.size = 'm'));
    }
  }

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-navigation-list__label" id="sbb-navigation-link-label-id">
        <slot name="label">${this.label}</slot>
      </span>
      ${this.renderList({
        class: 'sbb-navigation-list__content',
        ariaLabelledby: 'sbb-navigation-link-label-id',
      })}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-navigation-list': SbbNavigationListElement;
  }
}
