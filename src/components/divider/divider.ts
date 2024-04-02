import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { hostAttributes } from '../core/decorators';
import { setAttribute } from '../core/dom';
import type { SbbOrientation } from '../core/interfaces';
import { SbbNegativeMixin } from '../core/mixins';

import style from './divider.scss?lit&inline';

/**
 * It displays a divider between sections.
 */
@customElement('sbb-divider')
@hostAttributes({
  role: 'separator',
})
export class SbbDividerElement extends SbbNegativeMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  /** Orientation property with possible values 'horizontal' | 'vertical'. Defaults to horizontal. */
  @property({ reflect: true }) public orientation?: SbbOrientation = 'horizontal';

  protected override render(): TemplateResult {
    setAttribute(this, 'aria-orientation', this.orientation);

    return html` <div class="sbb-divider"></div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-divider': SbbDividerElement;
  }
}
