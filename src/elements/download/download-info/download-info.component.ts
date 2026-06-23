import { type CSSResultGroup, html, nothing, type TemplateResult, unsafeCSS } from 'lit';
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
  @property({ converter: omitEmptyConverter })
  public accessor type: string = '';

  /**
   * The size of the document. If the value contains non-numeric characters it
   * is rendered as is, otherwise it is interpreted as a number of bytes and
   * shortened to the closest unit.
   */
  @forceType()
  @property({ converter: omitEmptyConverter })
  public accessor size: string = '';

  /** The date of the latest change of the document, as an ISO 8601 string. */
  @forceType()
  @property({ converter: omitEmptyConverter })
  public accessor changed: string = '';

  /** Whether the document is not accessible. */
  @forceType()
  @property({ attribute: 'non-accessible', type: Boolean })
  public accessor nonAccessible: boolean = false;

  private _language = new SbbLanguageController(this);

  public override connectedCallback(): void {
    super.connectedCallback();

    // Default to the `info` slot of the parent `sbb-download`, so consumers can
    // place the element in the unnamed slot without setting the slot manually.
    this.slot ||= 'info';
  }

  /** Resolves the type, falling back to the extension of the parent download's
   * href.
   */
  private _resolveType(): string {
    if (this.type) {
      return this.type;
    }

    return this.closest?.('sbb-download')?.fileExtension.toUpperCase() ?? '';
  }

  /**
   * Whether the type is already conveyed by the parent download's label.
   * When the parent download has no explicit `label`, it falls back to the file
   * name (e.g. `some-file.pdf`), which already includes the extension. In that
   * case the type is redundant for assistive technology.
   */
  private _isTypeRedundant(): boolean {
    const parent = this.closest?.('sbb-download');

    if (!parent || parent.label) {
      return false;
    }

    return !!parent.fileExtension;
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

  /**
   * Formats the ISO 8601 change date to a localized date, or renders it as
   * is if invalid
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
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  }

  protected override render(): TemplateResult {
    const separator = ', ';
    const type = this._resolveType();
    const items = [
      this._resolveSize(),
      this.nonAccessible ? i18nNonAccessible[this._language.current] : '',
      this._resolveChanged(),
    ].filter(Boolean);

    const list = html`${items.map((item, index) => html`${index > 0 ? separator : ''}${item}`)}`;

    // The type is always wrapped in a span to keep the template structure
    // stable for SSR hydration, as it is derived from the parent download.
    // When the type is already conveyed by the parent's label, it is hidden
    // from assistive technology together with its trailing separator.
    return html`<span aria-hidden=${this._isTypeRedundant() ? 'true' : nothing}
        >${type}${type && items.length ? separator : ''}</span
      >${list}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-download-info': SbbDownloadInfoElement;
  }
}
