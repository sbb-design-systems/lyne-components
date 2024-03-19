import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private';

import './expansion-panel-content';

describe(`sbb-expansion-panel-content`, () => {
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

  testA11yTreeSnapshot(html`<sbb-expansion-panel-content>Content</sbb-expansion-panel-content>`);
});
