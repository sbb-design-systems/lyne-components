import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { i18nPage, i18nPaginatorOf, SbbElement, type SbbElementType } from '../../core.ts';
import { SbbDividerElement } from '../../divider.pure.ts';
import { SbbPaginatorCommonElementMixin } from '../common/paginator-common.ts';

import style from './compact-paginator.scss?inline';

/**
 * It displays a paginator component in compact mode.
 */
export class SbbCompactPaginatorElement extends SbbPaginatorCommonElementMixin(SbbElement) {
  public static override readonly elementName: string = 'sbb-compact-paginator';
  public static override elementDependencies: SbbElementType[] = [SbbDividerElement];
  public static override styles: CSSResultGroup = [super.styles ?? [], unsafeCSS(style)];
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
      <span class="sbb-screen-reader-only">
        ${`${this.accessibilityPageLabel ? this.accessibilityPageLabel : i18nPage[this.language.current]} ${this.pageIndex + 1} ${i18nPaginatorOf[this.language.current]} ${this.numberOfPages()}`}
      </span>
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
