import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './stepper';

describe('sbb-stepper', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-stepper my-prop="Label"></sbb-stepper>`);

    expect(root).dom.to.be.equal(`<sbb-stepper my-prop="Label"></sbb-stepper>`);

    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-stepper">
        Label
      </div>
    `);
  });
});
