import { TitleLevel } from '../sbb-title';
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
} from '../../global/eventing';
import { CSSResult, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { spread } from '@open-wc/lit-helpers';
import { SbbLink } from '../sbb-link';
import style from './sbb-skiplink-list.scss?lit&inline';
import '../sbb-title';

/**
 * @slot - Use the unnamed slot to add `sbb-link` elements to this skiplink list.
 */
@customElement('sbb-skiplink-list')
export class SbbSkiplinkList extends LitElement {
  public static override styles: CSSResult = style;

  /** The title text we want to place before the list. */
  @property({ attribute: 'title-content' }) public titleContent?: string;

  /** The semantic level of the title, e.g. 2 = h2. */
  @property({ attribute: 'title-level' }) public titleLevel?: TitleLevel = '2';

  /** sbb-link elements */
  @state() private _links: SbbLink[];

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @state() private _namedSlots = createNamedSlotState('title');

  private _syncLinks(): void {
    this.querySelectorAll('sbb-link').forEach((link: SbbLink) => {
      link.size = 'm';
      link.negative = true;
    });
  }

  private _handlerRepository = new HandlerRepository(
    this,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  /** Create an array with only the sbb-link children. */
  private _readLinks(): void {
    const links = Array.from(this.children).filter((e): e is SbbLink => e.tagName === 'SBB-LINK');
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

  public override connectedCallback(): void {
    super.connectedCallback();
    this._handlerRepository.connect();
    this._readLinks();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  protected override render(): TemplateResult {
    let ariaLabelledByAttribute: Record<string, string> = {};
    if (this._namedSlots.title || this.titleContent) {
      ariaLabelledByAttribute = { 'aria-labelledby': 'sbb-skiplink-list-title-id' };
    }
    this._links.forEach((link, index) => {
      link.setAttribute('slot', `link-${index}`);
      link.setAttribute('id', `sbb-skiplink-list-link-${index}`);
    });

    return html`
      <div class="sbb-skiplink-list__wrapper">
        ${this._namedSlots.title || this.titleContent
          ? html`<sbb-title
              class="sbb-link-list-title"
              level=${ifDefined(this.titleLevel)}
              visual-level="5"
              visually-hidden
              negative
              id="sbb-skiplink-list-title-id"
            >
              <slot name="title">${this.titleContent}</slot>
            </sbb-title>`
          : nothing}
        <ul ${spread(ariaLabelledByAttribute)} class="sbb-skiplink-list">
          ${this._links.map(
            (_, index) =>
              html` <li>
                <slot name=${`link-${index}`} @slotchange=${(): void => this._readLinks()}></slot>
              </li>`,
          )}
        </ul>
        <span hidden>
          <slot @slotchange=${() => this._readLinks()}></slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-skiplink-list': SbbSkiplinkList;
  }
}
