import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit';

import { SbbElement } from '../../core/base-elements.ts';

import style from './carousel-item.scss?lit&inline';

export type SbbCarouselItemEventDetail = {
  index: number;
};

/**
 * It displays an item contained into the `sbb-carousel` component.
 *
 * @slot - Use the unnamed slot to add images for the carousel, as <img>, <sbb-image>, <picture>, ...
 * @event {CustomEvent<SbbCarouselItemEventDetail>} beforeshow - Event emitted when the item is starting scrolling.
 * @event {CustomEvent<SbbCarouselItemEventDetail>} show - Event emitted when the item is full visible after scrolling.
 */
export class SbbCarouselItemElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-carousel-item';
  public static override styles: CSSResultGroup = style;
  public static readonly events: Record<string, string> = {
    beforeshow: 'beforeshow',
    show: 'show',
  } as const;

  public override connectedCallback(): void {
    super.connectedCallback();

    this.internals.role = 'group';
    this.internals.ariaRoleDescription = 'slide';
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-carousel-item': SbbCarouselItemElement;
  }

  interface GlobalEventHandlersEventMap {
    beforeshow: CustomEvent<SbbCarouselItemEventDetail>;
    show: CustomEvent<SbbCarouselItemEventDetail>;
  }
}
