import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';

import { SbbElement } from '../../core.ts';

import style from './carousel-item.scss?inline';

export interface SbbCarouselItemShowEventDetails {
  index: number;
}

export class SbbCarouselItemShowEvent extends Event {
  private readonly _detail: SbbCarouselItemShowEventDetails;

  public get detail(): SbbCarouselItemShowEventDetails {
    return this._detail;
  }

  public constructor(type: string, detail: SbbCarouselItemShowEventDetails) {
    super(type, { bubbles: true, composed: true });
    this._detail = detail;
  }
}

/**
 * It displays an item contained into the `sbb-carousel` component.
 *
 * @slot - Use the unnamed slot to add images for the carousel, as <img>, <sbb-image>, <picture>, ...
 * @event {SbbCarouselItemShowEvent} beforeshow - Event emitted when the item is starting scrolling.
 * @event {SbbCarouselItemShowEvent} show - Event emitted when the item is full visible after scrolling.
 */
export class SbbCarouselItemElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-carousel-item';
  public static override styles: CSSResultGroup = [unsafeCSS(style)];
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
    beforeshow: SbbCarouselItemShowEvent;
    show: SbbCarouselItemShowEvent;
  }
}
