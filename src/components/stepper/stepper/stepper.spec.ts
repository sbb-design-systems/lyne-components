import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';
import '.';

describe('sbb-stepper', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-stepper></sbb-stepper>`);
    expect(root).dom.to.be.equal(`<sbb-stepper orientation="horizontal"></sbb-stepper>`);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });
  testA11yTreeSnapshot();
});
