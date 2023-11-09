import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { setAttribute } from '../../core/dom';
import style from './expansion-panel-content.scss?lit&inline';

/**
 * It can be used as a container for the content of the `sbb-expansion-panel` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-expansion-panel`.
 */
@customElement('sbb-expansion-panel-content')
export class SbbExpansionPanelContent extends LitElement {
  public static override styles: CSSResult = style;

  protected override render(): TemplateResult {
    setAttribute(this, 'slot', 'content');
    setAttribute(this, 'role', 'region');

    return html`
      <div class="sbb-expansion-panel-content">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-expansion-panel-content': SbbExpansionPanelContent;
  }
}
