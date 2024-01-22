import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { NamedSlotStateController, SlotChildObserver } from '../core/common-behaviors';
import type { SbbLinkElement } from '../link';
import type { TitleLevel } from '../title';

import style from './skiplink-list.scss?lit&inline';

import '../title';

/**
 * It displays a list of `sbb-link` which are visible only when focused.
 *
 * @slot - Use the unnamed slot to add `sbb-link` elements to the `sbb-skiplink-list`.
 */
@customElement('sbb-skiplink-list')
export class SbbSkiplinkListElement extends SlotChildObserver(LitElement) {
  public static override styles: CSSResultGroup = style;

  /** The title text we want to place before the list. */
  @property({ attribute: 'title-content', reflect: true }) public titleContent?: string;

  /** The semantic level of the title, e.g. 2 = h2. */
  @property({ attribute: 'title-level' }) public titleLevel?: TitleLevel = '2';

  /**
   * sbb-link elements.
   * @ssrchildcounter
   */
  @state() private _links: SbbLinkElement[] = [];

  public constructor() {
    super();
    new NamedSlotStateController(this);
  }

  private _syncLinks(): void {
    this.querySelectorAll?.('sbb-link').forEach((link: SbbLinkElement) => {
      link.size = 'm';
      link.negative = true;
    });
  }

  /** Create an array with only the sbb-link children. */
  protected override checkChildren(): void {
    const links = Array.from(this.children).filter(
      (e): e is SbbLinkElement => e.tagName === 'SBB-LINK',
    );
    // Update links list
    if (
      this._links &&
      links.length === this._links.length &&
      this._links.every((e, i) => links[i] === e)
    ) {
      return;
    }

    this._syncLinks();
    this._links = links;
  }

  protected override render(): TemplateResult {
    this._links.forEach((link, index) => {
      link.setAttribute('slot', `link-${index}`);
      link.setAttribute('id', `sbb-skiplink-list-link-${index}`);
    });
    const links = this._links.length
      ? this._links
      : Array.from({ length: +(this.getAttribute('data-ssr-child-count') as string) });

    return html`
      <div class="sbb-skiplink-list__wrapper">
        <sbb-title
          class="sbb-link-list-title"
          level=${this.titleLevel || nothing}
          visual-level="5"
          visually-hidden
          negative
          id="sbb-skiplink-list-title-id"
        >
          <slot name="title">${this.titleContent}</slot>
        </sbb-title>
        <ul class="sbb-skiplink-list" aria-labelledby="sbb-skiplink-list-title-id">
          ${links.map(
            (_, index) =>
              html` <li>
                <slot name=${`link-${index}`}></slot>
              </li>`,
          )}
        </ul>
        <span hidden>
          <slot></slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-skiplink-list': SbbSkiplinkListElement;
  }
}
