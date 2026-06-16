import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import {
  forceType,
  i18nNonAccessible,
  omitEmptyConverter,
  SbbElement,
  SbbLanguageController,
} from '../../core.ts';

import style from './download-info.scss?inline';

const fileSizeSuffixes = ['B', 'KB', 'MB', 'GB', 'TB'];

/**
 * It displays metadata of a document; used within a `sbb-download`.
 */
export class SbbDownloadInfoElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-download-info';
  public static override styles: CSSResultGroup = [unsafeCSS(style)];

  /**
   * The type of the document (e.g. `PDF`). Falls back to the extension of the
   * parent `sbb-download`.
   */
  @forceType()
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor type: string = '';

  /**
   * The size of the document. If the value contains non-numeric characters it
   * is rendered as is, otherwise it is interpreted as a number of bytes and
   * shortened to the closest unit.
   */
  @forceType()
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor size: string = '';

  /** The date of the latest change of the document, as an ISO 8601 string. */
  @forceType()
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor changed: string = '';

  /** Whether the document is not accessible. */
  @forceType()
  @property({ attribute: 'non-accessible', reflect: true, type: Boolean })
  public accessor nonAccessible: boolean = false;

  private _language = new SbbLanguageController(this);

  /** Resolves the type, falling back to the extension of the parent download's
   * href.
   */
  private _resolveType(): string {
    if (this.type) {
      return this.type;
    }

    const parentHref = this.closest?.('sbb-download')?.href ?? '';
    const fileName = parentHref.split(/[?#]/)[0].split('/').at(-1) ?? '';

    return fileName.includes('.') ? (fileName.split('.').at(-1)?.toUpperCase() ?? '') : '';
  }

  /**
   * Formats the size, shortening a pure number of bytes to the closest unit.
   */
  private _resolveSize(): string {
    const size = this.size.trim();

    if (!size || !/^\d+$/.test(size)) {
      return size;
    }

    const bytes = Number(size);

    if (bytes <= 0) {
      return `0 ${fileSizeSuffixes[0]}`;
    }

    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), fileSizeSuffixes.length - 1);

    return `${(bytes / 1024 ** i).toFixed(0)} ${fileSizeSuffixes[i]}`;
  }

  /** Formats the ISO 8601 change date to a localized date, or renders it as is
   * if invalid.
   */
  private _resolveChanged(): string {
    if (!this.changed) {
      return '';
    }

    const date = new Date(this.changed);

    if (Number.isNaN(date.getTime())) {
      return this.changed;
    }

    return new Intl.DateTimeFormat(this._language.current, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  protected override render(): TemplateResult {
    const items = [
      this._resolveType(),
      this._resolveSize(),
      this.nonAccessible ? i18nNonAccessible[this._language.current] : '',
      this._resolveChanged(),
    ].filter(Boolean);

    return html`${items.join(', ')}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-download-info': SbbDownloadInfoElement;
  }
}
