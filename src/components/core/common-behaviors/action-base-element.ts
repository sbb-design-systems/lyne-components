import { html, LitElement, type TemplateResult } from 'lit';

import { getDocumentWritingMode, getLocalName } from '../dom';

export abstract class SbbActionBaseElement extends LitElement {
  /** Override this method to render the component template. */
  protected renderTemplate(): TemplateResult {
    throw new Error('Implementation needed!');
  }

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    this.setAttribute('dir', getDocumentWritingMode());
    return super.createRenderRoot();
  }

  /** Default render method for button-like components. */
  protected override render(): TemplateResult {
    return html`
      <span class=${this.localName ?? getLocalName(this)}> ${this.renderTemplate()} </span>
    `;
  }
}
