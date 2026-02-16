import {
  type CSSResultGroup,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType, omitEmptyConverter } from '../../core/decorators.ts';
import { isLean } from '../../core/dom.ts';
import {
  SbbElementInternalsMixin,
  SbbNamedSlotListMixin,
  type WithListChildren,
} from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbNavigationButtonElement } from '../navigation-button.ts';
import type { SbbNavigationLinkElement } from '../navigation-link.ts';

import style from './navigation-list.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-navigation-button`/`sbb-navigation-link` within a `sbb-navigation-section`.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-navigation-list`.
 * @slot label - Use this to provide a label element.
 */
export
@customElement('sbb-navigation-list')
class SbbNavigationListElement extends SbbNamedSlotListMixin<
  SbbNavigationButtonElement | SbbNavigationLinkElement,
  typeof LitElement
>(SbbElementInternalsMixin(LitElement)) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  protected override readonly listChildLocalNames = [
    'sbb-navigation-button',
    'sbb-navigation-link',
  ];

  /**
   * The label to be shown before the action list.
   */
  @forceType()
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor label: string = '';

  protected override willUpdate(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('listChildren')) {
      this.listChildren.forEach((c) => (c.size = isLean() ? 's' : 'm'));
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
