import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import './expansion-panel-content';

describe('sbb-expansion-panel-content', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-expansion-panel-content>Content</sbb-expansion-panel-content>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-expansion-panel-content slot="content" role="region">
          Content
        </sbb-expansion-panel-content>
      `,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders expanded', async () => {
    const root = await fixture(
      html`<sbb-expansion-panel-content expanded>Content</sbb-expansion-panel-content>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-expansion-panel-content slot="content" role="region" expanded>
          Content
        </sbb-expansion-panel-content>
      `,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(
    undefined,
    html`<sbb-expansion-panel-content>Content</sbb-expansion-panel-content>`,
  );
});
