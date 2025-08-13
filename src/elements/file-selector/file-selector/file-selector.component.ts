import { type CSSResultGroup, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { html } from 'lit/static-html.js';

import type { SbbSecondaryButtonStaticElement } from '../../button.js';
import { slotState } from '../../core/decorators.js';
import { fileSelectorCommonStyle, SbbFileSelectorCommonElementMixin } from '../common.js';

import '../../button/secondary-button-static.js';

/**
 * It allows to select one or more file from storage devices and display them.
 *
 * @slot error - Use this to provide a `sbb-form-error` to show an error message.
 */
export
@customElement('sbb-file-selector')
@slotState()
class SbbFileSelectorElement extends SbbFileSelectorCommonElementMixin(LitElement) {
  public static override styles: CSSResultGroup = fileSelectorCommonStyle;
  public static readonly events = {
    filechanged: 'filechanged',
  } as const;

  protected override renderTemplate(input: TemplateResult): TemplateResult {
    return html`
      <div class="sbb-file-selector__input-container">
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
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-file-selector': SbbFileSelectorElement;
  }
}
