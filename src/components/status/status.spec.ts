import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';
import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';

import './status';
import '../icon';

describe('sbb-status', () => {
  it('renders', async () => {
    const root = await fixture(html` <sbb-status type="info"> Status info text </sbb-status>`);

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `<sbb-status type="info" data-slot-names="unnamed">Status info text</sbb-status>`,
    );

    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders with the status title', async () => {
    const root = await fixture(
      html` <sbb-status type="info" title-content="Title"> Status info text </sbb-status>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-status type="info" title-content="Title" data-slot-names="unnamed">
        Status info text
      </sbb-status>
    `);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(
    undefined,
    html` <sbb-status type="info" title-content="Title"> Status info text </sbb-status>`,
  );
});
