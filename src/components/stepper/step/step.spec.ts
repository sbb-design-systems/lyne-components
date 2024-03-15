import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './step';

describe('sbb-step', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-step></sbb-step>`);

    expect(root).dom.to.be.equal(
      `<sbb-step id="sbb-step-0" role="tabpanel" slot="step"></sbb-step>`,
    );

    expect(root).shadowDom.to.be.equal(`
    <div class="sbb-step--wrapper">
        <div class="sbb-step">
          <slot></slot>
        </div>
    </div>
    `);
  });
});
