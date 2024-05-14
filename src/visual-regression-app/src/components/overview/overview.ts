import { LitElement, html, type TemplateResult, type CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { screenshots } from '../../screenshots.js';

import style from './overview.scss?lit&inline';

import '../../../../components/accordion.js';
import '../../../../components/button/secondary-button-link.js';
import '../../../../components/card.js';
import '../../../../components/container.js';
import '../../../../components/expansion-panel.js';
import '../../../../components/link-list.js';
import '../../../../components/link/block-link.js';
import '../../../../components/title.js';

/**
 * Overview over all failed or new tests
 */
@customElement('app-overview')
export class Overview extends LitElement {
  public static override styles: CSSResultGroup = style;

  public override render(): TemplateResult {
    return html`
      <sbb-container expanded>
        <sbb-title level="3">Lyne visual regression comparison</sbb-title>
        <div class="app-overview">
          <sbb-card color="milk">
            ${screenshots.stats}
            <sbb-secondary-button-link
              href="/compare/${screenshots.flatTestCases[0]?.path}"
              size="s"
            >
              Start comparing
            </sbb-secondary-button-link>
          </sbb-card>
          <sbb-accordion>
            ${screenshots.components.map(
              (screenshotComponent) => html`
                <sbb-expansion-panel ?expanded=${screenshots!.components.length === 1}>
                  <sbb-expansion-panel-header>
                    ${screenshotComponent.name} (${screenshotComponent.stats})
                  </sbb-expansion-panel-header>
                  <sbb-expansion-panel-content>
                    <sbb-link-list>
                      ${screenshotComponent.testCases.map(
                        (entry) =>
                          html`<sbb-block-link href="/compare/${entry.path}">
                            ${entry.name}
                          </sbb-block-link>`,
                      )}
                    </sbb-link-list>
                  </sbb-expansion-panel-content>
                </sbb-expansion-panel>
              `,
            )}
          </sbb-accordion>
        </div>
      </sbb-container>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'app-overview': Overview;
  }
}
