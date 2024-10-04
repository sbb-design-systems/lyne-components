import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators.js';
import { i18nPageOnTotal } from '../../core/i18n.js';
import { SbbPaginatorCommonElementMixin } from '../common.js';
import '../../divider.js';

import style from './compact-paginator.scss?lit&inline';

/**
 * It displays a paginator component in compact mode.
 *
 * @event {CustomEvent<SbbPaginatorPageEventDetails>} page - Emits when the pageIndex changes.
 */
@customElement('sbb-compact-paginator')
@hostAttributes({
  role: 'group',
})
export class SbbCompactPaginatorElement extends SbbPaginatorCommonElementMixin(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events: Record<string, string> = {
    page: 'page',
  } as const;

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    // To reliably announce page change, we have to set the label in updated() (a tick later than the other changes).
    this.shadowRoot!.querySelector('sbb-screen-reader-only')!.textContent =
      this._currentPageLabel();
  }

  private _currentPageLabel(): string {
    return i18nPageOnTotal(this.pageIndex + 1, this.numberOfPages())[this.language.current];
  }

  private _renderPageNumbers(): TemplateResult {
    return html`
      <span class="sbb-paginator__pages" aria-label=${this._currentPageLabel()}
        >${this.pageIndex + 1}<sbb-divider
          aria-hidden="true"
          orientation="vertical"
          ?negative=${this.negative}
        ></sbb-divider
        >${this.numberOfPages()}</span
      >
    `;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-compact-paginator">
        ${this.pagerPosition === 'start'
          ? html`${this.renderPrevNextButtons()} ${this._renderPageNumbers()}`
          : html`${this._renderPageNumbers()} ${this.renderPrevNextButtons()}`}
      </div>
      <sbb-screen-reader-only role="status"></sbb-screen-reader-only>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-compact-paginator': SbbCompactPaginatorElement;
  }
}
