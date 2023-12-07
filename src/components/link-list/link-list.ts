import { spread } from '@open-wc/lit-helpers';
import { CSSResultGroup, html, LitElement, nothing, TemplateResult, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { SlotChildObserver } from '../core/common-behaviors';
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
} from '../core/eventing';
import { SbbHorizontalFrom, SbbOrientation } from '../core/interfaces';
import type { SbbLinkElement, SbbLinkSize } from '../link';
import type { TitleLevel } from '../title';

import style from './link-list.scss?lit&inline';

import '../title';

/**
 * It displays a list of `sbb-link`.
 *
 * @slot - Use the unnamed slot to add one or more `sbb-link`.
 * @slot title - Use this slot to provide a title.
 */
@customElement('sbb-link-list')
export class SbbLinkListElement extends SlotChildObserver(LitElement) {
  public static override styles: CSSResultGroup = style;

  /** The title text we want to show before the list. */
  @property({ attribute: 'title-content' }) public titleContent?: string;

  /** The semantic level of the title, e.g. 2 = h2. */
  @property({ attribute: 'title-level' }) public titleLevel?: TitleLevel = '2';

  /**
   * Text size of the nested sbb-link instances. This will overwrite the size attribute of
   * nested sbb-link instances.
   */
  @property({ reflect: true }) public size: SbbLinkSize = 's';

  /**
   * Whether to render the link list and nested sbb-link instances as negative. This will overwrite
   * the negative attribute of nested sbb-link instances.
   */
  @property({ reflect: true, type: Boolean }) public negative: boolean;

  /** Selected breakpoint from which the list is rendered horizontally. */
  @property({ attribute: 'horizontal-from', reflect: true })
  public horizontalFrom?: SbbHorizontalFrom;

  /** The orientation in which the list will be shown vertical or horizontal. */
  @property({ reflect: true }) public orientation: SbbOrientation = 'vertical';

  /** Sbb-Link elements */
  @state() private _links: SbbLinkElement[] = [];

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @state() private _namedSlots = createNamedSlotState('title');

  private _syncLinks(): void {
    this.querySelectorAll?.('sbb-link').forEach((link) => {
      link.negative = this.negative;
      link.size = this.size;
      link.variant = 'block';
    });
  }

  private _handlerRepository = new HandlerRepository(
    this,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  /** Create an array with only the sbb-link children. */
  protected override checkChildren(): void {
    const links = Array.from(this.children).filter(
      (e): e is SbbLinkElement => e.tagName === 'SBB-LINK',
    );
    // If the slotted sbb-link instances have not changed, we can skip syncing and updating
    // the link reference list.
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

  public override connectedCallback(): void {
    super.connectedCallback();
    this._handlerRepository.connect();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('size') || changedProperties.has('negative')) {
      this._syncLinks();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  protected override render(): TemplateResult {
    let ariaLabelledByAttribute: Record<string, string> = {};

    if (this._namedSlots.title || this.titleContent) {
      ariaLabelledByAttribute = {
        'aria-labelledby': 'sbb-link-list-title-id',
      };
    }
    this._links.forEach((link, index) => link.setAttribute('slot', `link-${index}`));

    return html`
      <div class="sbb-link-list-wrapper">
        ${this._namedSlots.title || this.titleContent
          ? html`<sbb-title
              class="sbb-link-list-title"
              level=${this.titleLevel ?? nothing}
              visual-level="5"
              ?negative=${this.negative}
              id="sbb-link-list-title-id"
            >
              <slot name="title">${this.titleContent}</slot>
            </sbb-title>`
          : nothing}
        <ul ${spread(ariaLabelledByAttribute)} class="sbb-link-list">
          ${this._links.map(
            (_, index) =>
              html`<li>
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
    'sbb-link-list': SbbLinkListElement;
  }
}
