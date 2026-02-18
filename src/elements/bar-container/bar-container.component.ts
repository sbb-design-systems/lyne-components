import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { boxSizingStyles } from '../core/styles.ts';

import style from './bar-container.scss?lit&inline';

/**
 * It displays its content with a leading red band and the default page spacing.
 *
 * @slot - Use the unnamed slot to add content to the bar container.
 */
export
@customElement('sbb-bar-container')
class SbbBarContainerElement extends LitElement {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /** Background color of container. Either `white` or `milk`. */
  @property({ reflect: true })
  public accessor color: 'white' | 'milk' = 'white';

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-bar-container': SbbBarContainerElement;
  }
}
