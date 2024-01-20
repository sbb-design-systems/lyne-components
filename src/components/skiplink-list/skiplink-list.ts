import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { NamedSlotListElement, NamedSlotStateController } from '../core/common-behaviors';
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
export class SbbSkiplinkListElement extends NamedSlotListElement<SbbLinkElement> {
  public static override styles: CSSResultGroup = style;
  protected override readonly listChildTagNames = ['SBB-LINK'];

  /** The title text we want to place before the list. */
  @property({ attribute: 'title-content', reflect: true }) public titleContent?: string;

  /** The semantic level of the title, e.g. 2 = h2. */
  @property({ attribute: 'title-level' }) public titleLevel?: TitleLevel = '2';

  public constructor() {
    super();
    new NamedSlotStateController(this);
  }

  protected override formatChild(child: SbbLinkElement): void {
    child.size = 'm';
    child.negative = true;
  }

  protected override render(): TemplateResult {
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
        <ul
          class="sbb-skiplink-list"
          aria-labelledby="sbb-skiplink-list-title-id"
          role=${this.roleOverride()}
        >
          ${this.renderListSlots()}
        </ul>
        ${this.renderHiddenSlot()}
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
