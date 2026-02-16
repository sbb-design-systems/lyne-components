import { type CSSResultGroup, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { html } from 'lit/static-html.js';

import type { SbbSecondaryButtonStaticElement } from '../../button.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { fileSelectorCommonStyle, SbbFileSelectorCommonElementMixin } from '../common.ts';

import '../../button/secondary-button-static.ts';

/**
 * It allows to select one or more file from storage devices and display them.
 *
 * @slot error - Use this to provide a `sbb-error` to show an error message.
 */
export
@customElement('sbb-file-selector')
class SbbFileSelectorElement extends SbbFileSelectorCommonElementMixin(LitElement) {
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
