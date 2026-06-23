import {
  type CSSResultGroup,
  html,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';

import { SbbSecondaryButtonStaticElement } from '../../button.pure.ts';
import {
  forceType,
  omitEmptyConverter,
  SbbLinkBaseElement,
  type SbbElementType,
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
 * Inherits link properties from `SbbLinkBaseElement`: `href`, `target`, `rel`
 * and `accessibilityLabel`. The download behavior is always enabled.
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
  public static override styles: CSSResultGroup = [unsafeCSS(style)];

  /** Option to set the component's background color. */
  @property({ reflect: true }) public accessor color: 'white' | 'milk' = 'white';

  /** The label of the download. Defaults to the file name of the `href`. */
  @forceType()
  @property({ converter: omitEmptyConverter })
  public accessor label: string = '';

  /**
   * The download behavior is always enabled and handled internally, therefore
   * this property cannot be disabled and is not reflected to the host element.
   */
  @forceType()
  @property({ type: Boolean, reflect: false })
  public override accessor download: boolean = true;

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    // The download behavior is always enabled; consumers must not be able to disable it.
    this.download = true;
  }

  /**
   * The file name extracted from the `href`, used as a fallback for the label.
   */
  private _fileName(): string {
    return this.href.split(/[?#]/)[0].split('/').filter(Boolean).at(-1) ?? '';
  }

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

    const extension = this._fileName().split('.').at(-1)?.toLowerCase();

    return (extension && fileExtensionIcons.get(extension)) || 'document-standard-small';
  }

  protected override renderTemplate(): TemplateResult {
    return html`
      ${this.renderIconSlot('sbb-download__icon')}
      <span class="sbb-download__content">
        <span class="sbb-download__label">${this.label || this._fileName()}</span>
        <span class="sbb-download__custom-content">
          <slot></slot>
        </span>
        <span class="sbb-download__info">
          <slot name="info"></slot>
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
