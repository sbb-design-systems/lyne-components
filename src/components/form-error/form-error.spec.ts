import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private';

import './form-error';

describe(`sbb-form-error`, () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-form-error>Required</sbb-form-error>`);

    expect(root).dom.to.be.equal(`
      <sbb-form-error id="sbb-form-error-1">
        Required
      </sbb-form-error>
    `);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(html`<sbb-form-error>Required</sbb-form-error>`);
});
