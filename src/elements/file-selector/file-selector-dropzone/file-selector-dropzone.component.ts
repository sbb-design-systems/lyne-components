import { type CSSResultGroup, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { html } from 'lit/static-html.js';

import { SbbSecondaryButtonStaticElement } from '../../button.pure.ts';
import { SbbElement, type SbbElementType } from '../../core.ts';
import {
  forceType,
  i18nFileSelectorSubtitleLabel,
  i18nFileSelectorSubtitleLabelMultiple,
  boxSizingStyles,
} from '../../core.ts';
import { SbbIconElement } from '../../icon.pure.ts';
import {
  fileSelectorCommonStyle,
  SbbFileSelectorCommonElementMixin,
} from '../common/file-selector-common.ts';

import style from './file-selector-dropzone.scss?inline';

/**
 * It allows to select one or more file from storage devices via button click or drag and drop, and display them.
 *
 * @slot error - Use this to provide a `sbb-error` to show an error message.
 */
export class SbbFileSelectorDropzoneElement extends SbbFileSelectorCommonElementMixin(SbbElement) {
  public static override readonly elementName: string = 'sbb-file-selector-dropzone';
  public static override elementDependencies: SbbElementType[] = [
    SbbIconElement,
    SbbSecondaryButtonStaticElement,
  ];
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    fileSelectorCommonStyle,
    unsafeCSS(style),
  ];
  public static readonly events = {
    filechanged: 'filechanged',
  } as const;

  /** The title displayed in `dropzone` variant. */
  @forceType()
  @property({ attribute: 'title-content' })
  public accessor titleContent: string = '';

  protected override renderTemplate(input: TemplateResult): TemplateResult {
    return html`
      <label>
        <span class="sbb-file-selector__dropzone-area">
          <span class="sbb-file-selector__dropzone-area--icon">
            <sbb-icon
              name=${this.size === 'm' ? 'folder-open-medium' : 'folder-open-small'}
            ></sbb-icon>
          </span>
          <span class="sbb-file-selector__dropzone-area--title">${this.titleContent}</span>
          <span class="sbb-file-selector__dropzone-area--subtitle">
            ${this.multiple
              ? i18nFileSelectorSubtitleLabelMultiple[this.language.current]
              : i18nFileSelectorSubtitleLabel[this.language.current]}
          </span>
          <span class="sbb-file-selector__dropzone-area--button">
            <sbb-secondary-button-static
              size=${this.size}
              ?disabled=${this.disabled || this.formDisabled}
              ${ref((el?: Element): void => {
                this.loadButton = el as SbbSecondaryButtonStaticElement;
              })}
            >
              ${this.getButtonLabel()}
            </sbb-secondary-button-static>
          </span>
        </span>
        ${input}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-file-selector-dropzone': SbbFileSelectorDropzoneElement;
  }
}
