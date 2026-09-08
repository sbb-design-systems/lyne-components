import {
  type CSSResultGroup,
  html,
  nothing,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';

import { SbbSecondaryButtonStaticElement } from '../../button.pure.ts';
import {
  forceType,
  i18nDownload,
  omitEmptyConverter,
  type SbbElementType,
  SbbLanguageController,
  SbbLinkBaseElement,
  screenReaderOnlyStyles,
} from '../../core.ts';
import { SbbIconNameMixin } from '../../icon.pure.ts';

import style from './download.scss?inline';

const fileExtensionIcons = new Map<string, string>([
  ['pdf', 'document-pdf-small'],
  ['xls', 'document-xls-small'],
  ['xlsx', 'document-xls-small'],
  ['ppt', 'document-ppt-small'],
  ['pptx', 'document-ppt-small'],
  ['doc', 'document-doc-small'],
  ['docx', 'document-doc-small'],
  ['zip', 'document-zip-small'],
  ['jpg', 'document-image-small'],
  ['jpeg', 'document-image-small'],
  ['png', 'document-image-small'],
  ['gif', 'document-image-small'],
  ['svg', 'document-image-small'],
  ['webp', 'document-image-small'],
]);

/**
 * It displays a downloadable document, styled as a card.
 *
 * Inherits link properties from `SbbLinkBaseElement`: `href`, `target`, `rel`,
 * `download` and `accessibilityLabel`. Without the `download` attribute the
 * referenced document is opened inline in a new browser tab, unless a `target`
 * is explicitly set.
 *
 * @slot - Use the unnamed slot to add custom content. Optional.
 * @slot info - Slot used to render a `sbb-download-info`. A `sbb-download-info`
 * placed in the unnamed slot is automatically moved to this slot. Optional.
 * @slot icon - Use this slot to display a custom icon, by providing a
 * `sbb-icon` component. Optional.
 */
export class SbbDownloadElement extends SbbIconNameMixin(SbbLinkBaseElement) {
  public static override readonly elementName: string = 'sbb-download';
  public static override elementDependencies: SbbElementType[] = [SbbSecondaryButtonStaticElement];
  public static override styles: CSSResultGroup = [screenReaderOnlyStyles, unsafeCSS(style)];

  /** Option to set the component's background color. */
  @property({ reflect: true }) public accessor color: 'white' | 'milk' = 'white';

  /** The label of the download. Defaults to the file name of the `href`. */
  @forceType()
  @property({ converter: omitEmptyConverter })
  public accessor label: string = '';

  /** The file name extracted from the `href` (e.g. `report.pdf`). */
  public get fileName(): string {
    return this.href.split(/[?#]/)[0].split('/').filter(Boolean).at(-1) ?? '';
  }

  /** The lower-cased file extension extracted from the `href` (e.g. `pdf`), if any. */
  public get fileExtension(): string {
    const fileName = this.fileName;

    return fileName.includes('.') ? (fileName.split('.').at(-1)?.toLowerCase() ?? '') : '';
  }

  private _languageController = new SbbLanguageController(this);

  /**
   * Provides a default icon based on the `href` extension, if no icon name is
   * set.
   */
  protected override renderIconName(): string {
    if (this.iconName) {
      return this.iconName;
    } else if (!this.href) {
      return '';
    }

    const extension = this.fileExtension;

    return (extension && fileExtensionIcons.get(extension)) || 'document-standard-small';
  }

  /**
   * Documents which are not downloaded are shown inline, in which case they
   * are opened in a new browser tab, unless a target is explicitly set.
   */
  protected override resolveTarget(): string {
    return this.target || (this.download ? '' : '_blank');
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    // The "opens in new window" hint is rendered conditionally by the base
    // class, therefore the described by elements are re-evaluated after every
    // update.
    this._updateDescribedByElements();
  }

  private _updateDescribedByElements(): void {
    const link = this.shadowRoot?.querySelector?.('a');

    if (link) {
      const customContentElement = this.shadowRoot?.querySelector?.(
        '.sbb-download__custom-content',
      );
      // Rendered by `SbbLinkBaseElement` when the link opens in a new window.
      // As setting `ariaDescribedByElements` clears the `aria-describedby`
      // attribute set by the base class, the hint has to be included here.
      const newWindowHintElement = this.shadowRoot?.querySelector?.('#sbb-link-new-window');

      link.ariaDescribedByElements = [
        ...(customContentElement ? [customContentElement] : []),
        ...this._downloadInfoElements(),
        ...(newWindowHintElement ? [newWindowHintElement] : []),
      ];
    }
  }

  private _downloadInfoElements(): NodeListOf<HTMLElement> {
    return this.querySelectorAll?.('sbb-download-info') ?? [];
  }

  protected override renderTemplate(): TemplateResult {
    return html`
      ${this.renderIconSlot('sbb-download__icon')}
      <span class="sbb-download__content">
        <span class="sbb-download__label">${this.label || this.fileName}</span>
        <span class="sbb-screen-reader-only">
          ${!this._downloadInfoElements().length ? html`&nbsp;${this.fileExtension}` : nothing}&nbsp;${i18nDownload[this._languageController.current]}
        </span>
        <span class="sbb-download__custom-content" aria-hidden="true">
          <slot></slot>
        </span>
        <span class="sbb-download__info">
          <slot name="info" @slotchange="${() => this._updateDescribedByElements()}"></slot>
        </span>
      </span>
      <sbb-secondary-button-static
        class="sbb-download__button"
        icon-name="download-small"
      ></sbb-secondary-button-static>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-download': SbbDownloadElement;
  }
}
