import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import './tag.js';
import '../../icon.js';

describe(`sbb-tag`, () => {
  it('renders unchecked', async () => {
    const root = await fixture(
      html`<sbb-tag value="all" aria-label="Check to remove filters">All</sbb-tag>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-tag aria-label="Check to remove filters" aria-pressed="false" role="button" size="m" tabindex="0" value="all" dir="ltr" data-slot-names="unnamed" data-action data-button>
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
      <sbb-tag aria-pressed="true" checked role="button" size="m" tabindex="0" value="info" dir="ltr" data-slot-names="unnamed" data-action data-button>
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

    expect(root).dom.to.be.equal(
      `
        <sbb-tag amount="123" aria-disabled="true" aria-pressed="false" disabled icon-name="circle-information-small" role="button" size="m" value="information" dir="ltr" data-slot-names="unnamed" data-action data-button>
          Info
        </sbb-tag>
      `,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders slotted icon and amount', async () => {
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

    expect(root).dom.to.be.equal(
      `
        <sbb-tag value="foo" aria-pressed="false" role="button" size="m" tabindex="0" dir="ltr" data-slot-names="amount icon unnamed" data-action data-button>
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
      `,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(html`<sbb-tag value="Value">Label</sbb-tag>`);
});
