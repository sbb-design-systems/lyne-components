import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { SbbElement } from '../../core/base-elements.ts';
import { i18nPage, i18nPaginatorOf } from '../../core/i18n.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { SbbPaginatorCommonElementMixin } from '../common/paginator-common.ts';

import style from './compact-paginator.scss?lit&inline';

import '../../divider.ts';
import '../../screen-reader-only.ts';

/**
 * It displays a paginator component in compact mode.
 */
export class SbbCompactPaginatorElement extends SbbPaginatorCommonElementMixin(SbbElement) {
  public static override readonly elementName: string = 'sbb-compact-paginator';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events: Record<string, string> = {
    page: 'page',
  } as const;

  private _renderPageNumbers(): TemplateResult {
    return html`
      <span class="sbb-paginator__pages" aria-hidden="true"
        >${this.pageIndex + 1}<sbb-divider
          orientation="vertical"
          class="sbb-compact-paginator__divider"
          style=${styleMap({ '--sbb-divider-color': 'currentcolor' })}
          ?negative=${this.negative}
        ></sbb-divider
        >${this.numberOfPages()}</span
      >
      <sbb-screen-reader-only>
        ${`${this.accessibilityPageLabel ? this.accessibilityPageLabel : i18nPage[this.language.current]} ${this.pageIndex + 1} ${i18nPaginatorOf[this.language.current]} ${this.numberOfPages()}`}
      </sbb-screen-reader-only>
    `;
  }

  protected override renderPaginator(): TemplateResult {
    return html`
      ${this.pagerPosition === 'start'
        ? html`${this.renderPrevNextButtons()} ${this._renderPageNumbers()}`
        : html`${this._renderPageNumbers()} ${this.renderPrevNextButtons()}`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-compact-paginator': SbbCompactPaginatorElement;
  }
}
