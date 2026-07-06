import {
  type CSSResultGroup,
  html,
  nothing,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';

import {
  type DateAdapter,
  defaultDateAdapter,
  forceType,
  i18nNonAccessible,
  omitEmptyConverter,
  readConfig,
  SbbElement,
  SbbLanguageController,
  SbbPropertyWatcherController,
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
  private _dateAdapter: DateAdapter = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;

  private _resolvedType: string = '';
  private _typeRedundant: boolean = false;
  private _resolvedSize: string = '';
  private _resolvedChanged: string = '';

  public constructor() {
    super();

    // The sbb-download-info component will be linked in the download-component with ariaDescribedByElements.
    /** @internal **/
    this.internals.ariaHidden = 'true';

    // The type can be derived from the parent download's `href`, so re-resolve
    // it whenever that `href` changes.
    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-download'), {
        href: () => this.requestUpdate(),
      }),
    );
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    // Default to the `info` slot of the parent `sbb-download`, so consumers can
    // place the element in the unnamed slot without setting the slot manually.
    this.slot ||= 'info';

    // The type is derived from the parent download, so re-resolve it whenever
    // the element is (re)connected, e.g. when moved between different downloads.
    this.requestUpdate();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    // The type and its redundancy are derived from the parent download, which
    // is not a reactive property of this element, so they are resolved on every
    // update.
    this._resolvedType = this._resolveType();
    this._typeRedundant = this._isTypeRedundant();

    // The formatted size and date only depend on their own property, so they
    // are recomputed solely when that property changes (and not, for example,
    // on a language change).
    if (changedProperties.has('size')) {
      this._resolvedSize = this._resolveSize();
    }

    if (changedProperties.has('changed')) {
      this._resolvedChanged = this._resolveChanged();
    }
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
   * Formats the ISO 8601 change date using the configured date adapter, or
   * renders it as is if invalid.
   */
  private _resolveChanged(): string {
    if (!this.changed) {
      return '';
    }

    const date = this._dateAdapter.deserialize(this.changed);

    // Render the raw value as is when it is not a valid ISO 8601 date.
    if (!this._dateAdapter.isValid(date)) {
      return this.changed;
    }

    return this._dateAdapter.format(date, { weekdayStyle: 'none' });
  }

  protected override render(): TemplateResult {
    const separator = ', ';
    const items = [
      this._resolvedSize,
      this.nonAccessible ? i18nNonAccessible[this._language.current] : '',
      this._resolvedChanged,
    ].filter(Boolean);

    const list = html`${items.map((item, index) => html`${index > 0 ? separator : ''}${item}`)}`;

    // The type is always wrapped in a span to keep the template structure
    // stable for SSR hydration, as it is derived from the parent download.
    // When the type is already conveyed by the parent's label, it is hidden
    // from assistive technology together with its trailing separator.
    return html`<span aria-hidden=${this._typeRedundant ? 'true' : nothing}
        >${this._resolvedType}${this._resolvedType && items.length ? separator : ''}</span
      >${list}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-download-info': SbbDownloadInfoElement;
  }
}
