import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import './step.js';

describe('sbb-step', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-step>Step content</sbb-step>`);

    expect(root).dom.to.be.equal(
      `<sbb-step id="sbb-step-0" role="tabpanel" slot="step">Step content</sbb-step>`,
    );

    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(html`<sbb-step>Step content</sbb-step>`);
});
