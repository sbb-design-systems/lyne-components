import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import './tag.js';
import '../../icon.js';

describe(`sbb-tag`, () => {
  it('renders unchecked - Dom', async () => {
    const root = await fixture(
      html`<sbb-tag value="all" aria-label="Check to remove filters">All</sbb-tag>`,
    );
    await expect(root).dom.to.be.equalSnapshot();
  });

  it('renders unchecked - ShadowDom', async () => {
    const root = await fixture(
      html`<sbb-tag value="all" aria-label="Check to remove filters">All</sbb-tag>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders checked - Dom', async () => {
    const root = await fixture(html`<sbb-tag checked value="info">Info</sbb-tag>`);
    await expect(root).dom.to.be.equalSnapshot();
  });

  it('renders checked - ShadowDom', async () => {
    const root = await fixture(html`<sbb-tag checked value="info">Info</sbb-tag>`);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders disabled with icon and amount - Dom', async () => {
    const root = await fixture(html`
      <sbb-tag disabled amount="123" icon-name="circle-information-small" value="information">
        Info
      </sbb-tag>
    `);
    await expect(root).dom.to.be.equalSnapshot();
  });

  it('renders disabled with icon and amount - ShadowDom', async () => {
    const root = await fixture(html`
      <sbb-tag disabled amount="123" icon-name="circle-information-small" value="information">
        Info
      </sbb-tag>
    `);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders slotted icon and amount - Dom', async () => {
    const root = await fixture(html`
      <sbb-tag value="foo">
        <sbb-icon
          aria-hidden="true"
          data-namespace="default"
          name="cross-small"
          role="img"
          slot="icon"
        >
        </sbb-icon>
        Info
        <span slot="amount">123</span>
      </sbb-tag>
    `);
    await expect(root).dom.to.be.equalSnapshot();
  });

  it('renders slotted icon and amount - ShadowDom', async () => {
    const root = await fixture(html`
      <sbb-tag value="foo">
        <sbb-icon
          aria-hidden="true"
          data-namespace="default"
          name="cross-small"
          role="img"
          slot="icon"
        >
        </sbb-icon>
        Info
        <span slot="amount">123</span>
      </sbb-tag>
    `);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(html`<sbb-tag value="Value">Label</sbb-tag>`);
});
