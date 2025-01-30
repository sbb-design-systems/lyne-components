import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';

import style from './sidebar-content-common.scss?lit&inline';

export abstract class SbbSidebarContentBaseElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  protected override render(): TemplateResult {
    return html`<div class="sbb-sidebar-content"><slot></slot></div>`;
  }
}
