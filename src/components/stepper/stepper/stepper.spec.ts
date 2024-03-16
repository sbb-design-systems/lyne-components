import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';
import '.';
import '../step';
import '../step-label';

describe('sbb-stepper', () => {
  beforeEach(async () => {
    await fixture(html`
      <sbb-stepper selected-index="0">
        <sbb-step-label>Test step label 1</sbb-step-label>
        <sbb-step>Test step content 1</sbb-step>
        <sbb-step-label>Test step label 2</sbb-step-label>
        <sbb-step>Test step content 2</sbb-step>
        <sbb-step-label disabled>Test step label 3</sbb-step-label>
        <sbb-step>Test step content 3</sbb-step>
        <sbb-step-label>Test step label 4</sbb-step-label>
      </sbb-stepper>
    `);
  });

  it('renders', async () => {
    const root = await fixture(html`<sbb-stepper></sbb-stepper>`);
    expect(root).dom.to.be.equal(
      `<sbb-stepper orientation="horizontal" data-disable-animation></sbb-stepper>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });
  testA11yTreeSnapshot();
});
