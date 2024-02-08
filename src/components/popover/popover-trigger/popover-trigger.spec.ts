import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';

import '../../icon';
import './popover-trigger';

describe('sbb-popover-trigger', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-popover-trigger></sbb-popover-trigger>`);

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `<sbb-popover-trigger role="button" tabindex="0" dir="ltr"></sbb-popover-trigger>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders with custom content', async () => {
    const root = await fixture(html`<sbb-popover-trigger>Custom Content</sbb-popover-trigger>`);

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `<sbb-popover-trigger role="button" tabindex="0" dir="ltr">
        Custom Content
      </sbb-popover-trigger>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });
});
