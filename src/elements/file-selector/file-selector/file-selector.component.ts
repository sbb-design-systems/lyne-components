import type { CSSResultGroup, TemplateResult } from 'lit';
import { ref } from 'lit/directives/ref.js';
import { html } from 'lit/static-html.js';

import type { SbbSecondaryButtonStaticElement } from '../../button.ts';
import { SbbElement } from '../../core/base-elements.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import {
  fileSelectorCommonStyle,
  SbbFileSelectorCommonElementMixin,
} from '../common/file-selector-common.ts';

import '../../button/secondary-button-static.ts';

/**
 * It allows to select one or more file from storage devices and display them.
 *
 * @slot error - Use this to provide a `sbb-error` to show an error message.
 */
export class SbbFileSelectorElement extends SbbFileSelectorCommonElementMixin(SbbElement) {
  public static override readonly elementName: string = 'sbb-file-selector';
  public static override styles: CSSResultGroup = [boxSizingStyles, fileSelectorCommonStyle];
  public static readonly events = {
    filechanged: 'filechanged',
  } as const;

  protected override renderTemplate(input: TemplateResult): TemplateResult {
    return html`
      <label>
        <sbb-secondary-button-static
          size=${this.size}
          icon-name="folder-open-small"
          ?disabled=${this.disabled || this.formDisabled}
          ${ref((el?: Element): void => {
            this.loadButton = el as SbbSecondaryButtonStaticElement;
          })}
        >
          ${this.getButtonLabel()}
        </sbb-secondary-button-static>
        ${input}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-file-selector': SbbFileSelectorElement;
  }
}
