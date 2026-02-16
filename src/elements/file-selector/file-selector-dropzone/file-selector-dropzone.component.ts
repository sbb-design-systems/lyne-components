import { type CSSResultGroup, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { html } from 'lit/static-html.js';

import type { SbbSecondaryButtonStaticElement } from '../../button.ts';
import { forceType } from '../../core/decorators.ts';
import {
  i18nFileSelectorSubtitleLabel,
  i18nFileSelectorSubtitleLabelMultiple,
} from '../../core/i18n.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { fileSelectorCommonStyle, SbbFileSelectorCommonElementMixin } from '../common.ts';

import '../../button/secondary-button-static.ts';
import '../../icon.ts';

import style from './file-selector-dropzone.scss?lit&inline';

/**
 * It allows to select one or more file from storage devices via button click or drag and drop, and display them.
 *
 * @slot error - Use this to provide a `sbb-error` to show an error message.
 */
export
@customElement('sbb-file-selector-dropzone')
class SbbFileSelectorDropzoneElement extends SbbFileSelectorCommonElementMixin(LitElement) {
  public static override styles: CSSResultGroup = [boxSizingStyles, fileSelectorCommonStyle, style];
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
