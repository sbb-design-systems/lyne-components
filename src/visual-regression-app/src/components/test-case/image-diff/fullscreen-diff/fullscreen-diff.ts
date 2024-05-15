import { LitElement, html, type TemplateResult, type CSSResultGroup, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { SbbRadioButtonGroupElement } from '../../../../../../components/radio-button/radio-button-group/radio-button-group.js';
import type { FailedFiles } from '../../../../interfaces.js';

import style from './fullscreen-diff.scss?lit&inline';

import '../../../../../../components/chip.js';
import '../../../../../../components/radio-button.js';

/**
 * Displays two images in fullscreen to overlay them.
 */
@customElement('app-fullscreen-diff')
export class FullscreenDiff extends LitElement {
  public static override styles: CSSResultGroup = style;

  @property() public failedFile?: FailedFiles;

  @property() public selectedFile: 'baselineFile' | 'failedFile' | 'diffFile' = 'failedFile';

  public override render(): TemplateResult {
    if (!this.failedFile) {
      return html``;
    }
    return html`<div class="app-labels">
        <sbb-chip size="xxs" color="white">${this.failedFile.browserName}</sbb-chip>
        <sbb-chip size="xxs" color="white">${this.failedFile.viewport}</sbb-chip>
      </div>
      <sbb-radio-button-group
        class="app-radio-button-group"
        value=${this.selectedFile}
        @change=${(event: Event) =>
          (this.selectedFile = (event.target as SbbRadioButtonGroupElement).value)}
      >
        ${!this.failedFile.isNew
          ? html`<sbb-radio-button value="baselineFile">Baseline</sbb-radio-button>`
          : nothing}
        <sbb-radio-button value="failedFile"
          >${this.failedFile.isNew ? 'New' : 'Failed'}</sbb-radio-button
        >
        ${this.failedFile.diffFile
          ? html`<sbb-radio-button value="diffFile">Diff</sbb-radio-button>`
          : nothing}
      </sbb-radio-button-group>
      <div class="app-scroll-container">
        <img class="app-image" .src="./${this.failedFile?.[this.selectedFile]}" alt="" />
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'app-fullscreen-diff': FullscreenDiff;
  }
}
