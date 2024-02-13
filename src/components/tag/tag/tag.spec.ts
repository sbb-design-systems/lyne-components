import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';
import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import './tag';

describe('sbb-tag', () => {
  it('renders unchecked', async () => {
    const root = await fixture(
      html`<sbb-tag value="all" aria-label="Check to remove filters">All</sbb-tag>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-tag aria-label="Check to remove filters" aria-pressed="false" role="button" tabindex="0" value="all" dir="ltr" data-slot-names="unnamed">
          All
        </sbb-tag>
      `,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders checked', async () => {
    const root = await fixture(html`<sbb-tag checked value="info">Info</sbb-tag>`);

    expect(root).dom.to.be.equal(
      `
      <sbb-tag aria-pressed="true" checked role="button" tabindex="0" value="info" dir="ltr" data-slot-names="unnamed">
        Info
      </sbb-tag>
    `,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders disabled with icon and amount', async () => {
    const root = await fixture(html`
      <sbb-tag disabled amount="123" icon-name="circle-information-small" value="information">
        Info
      </sbb-tag>
    `);

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `
        <sbb-tag amount="123" aria-disabled="true" aria-pressed="false" disabled icon-name="circle-information-small" role="button" value="information" dir="ltr" data-slot-names="unnamed">
          Info
        </sbb-tag>
      `,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders slotted icon and amount', async () => {
    const root = await fixture(html`
      <sbb-tag value="foo">
        <sbb-icon slot="icon" name="cross-small"></sbb-icon>
        Info
        <span slot="amount">123</span>
      </sbb-tag>
    `);

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `
        <sbb-tag value="foo" aria-pressed="false" role="button" tabindex="0" dir="ltr" data-slot-names="amount icon unnamed">
          <sbb-icon slot="icon" name="cross-small" aria-hidden="true" data-namespace="default" role="img">
          </sbb-icon>
          Info
          <span slot="amount">123</span>
        </sbb-tag>
      `,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(html`<sbb-tag value="Value">Label</sbb-tag>`);
});
