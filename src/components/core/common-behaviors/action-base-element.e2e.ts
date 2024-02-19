import { assert, expect, fixture } from '@open-wc/testing';
import { html, type TemplateResult } from 'lit';

import { SbbActionBaseElement } from './action-base-element';

class GenericAction extends SbbActionBaseElement {
  protected override renderTemplate(): TemplateResult {
    return html`Action`;
  }
}
customElements.define('generic-action', GenericAction);

describe('SbbActionBaseElement', () => {
  describe('template', () => {
    let element: GenericAction;

    beforeEach(async () => {
      element = await fixture(html`<generic-action></generic-action>`);
    });

    it('renders', async () => {
      assert.instanceOf(element, GenericAction);
    });

    it('check host attributes and content', () => {
      expect(element.getAttribute('dir')).to.be.equal('ltr');
      expect(element.shadowRoot!.firstElementChild!.classList.contains('generic-action')).to.be
        .true;
      expect(element.shadowRoot!.textContent!.trim()).to.be.equal('Action');
    });
  });
});
