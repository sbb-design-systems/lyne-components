import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';
import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import './popover-trigger';

describe('sbb-popover-trigger', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-popover-trigger></sbb-popover-trigger>`);

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `<sbb-popover-trigger role="button" tabindex="0" dir="ltr" data-action data-button></sbb-popover-trigger>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders with custom content', async () => {
    const root = await fixture(html`<sbb-popover-trigger>Custom Content</sbb-popover-trigger>`);

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `<sbb-popover-trigger role="button" tabindex="0" dir="ltr" data-action data-button>
        Custom Content
      </sbb-popover-trigger>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(html`<sbb-popover-trigger></sbb-popover-trigger>`);
});
