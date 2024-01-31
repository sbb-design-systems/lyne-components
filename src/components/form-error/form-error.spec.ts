import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';

import './form-error';

describe('sbb-form-error', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-form-error>Required</sbb-form-error>`);

    expect(root).dom.to.be.equal(`
      <sbb-form-error id="sbb-form-error-1">
        Required
      </sbb-form-error>
    `);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(undefined, html`<sbb-form-error>Required</sbb-form-error>`);
});
