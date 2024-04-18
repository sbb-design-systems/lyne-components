import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';
import { waitForLitRender } from '../core/testing.js';

import './notification.js';

describe(`sbb-notification`, () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-notification disable-animation
        >The quick brown fox jumps over the lazy dog.</sbb-notification
      >`,
    );
    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `
      <sbb-notification disable-animation data-state="opened" type="info" size="m" data-slot-names="unnamed" style="--sbb-notification-height: auto;">
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders with a title', async () => {
    const root = await fixture(
      html`<sbb-notification disable-animation title-content="Title"
        >The quick brown fox jumps over the lazy dog.</sbb-notification
      >`,
    );

    expect(root).dom.to.be.equal(
      `
      <sbb-notification disable-animation data-state="opened" title-content="Title" type="info" size="m" data-slot-names="unnamed" style="--sbb-notification-height: auto;">
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders with a slotted title', async () => {
    const root = await fixture(
      html`<sbb-notification disable-animation
        ><span slot="title">Slotted title</span>
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`,
    );

    expect(root).dom.to.be.equal(
      `
      <sbb-notification disable-animation data-state="opened" type="info" size="m" data-slot-names="title unnamed" style="--sbb-notification-height: auto;">
        <span slot="title">
          Slotted title
        </span>
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders without the close button', async () => {
    const root = await fixture(
      html`<sbb-notification disable-animation title-content="Title" readonly
        >The quick brown fox jumps over the lazy dog.</sbb-notification
      >`,
    );

    expect(root).dom.to.be.equal(
      `
      <sbb-notification disable-animation readonly data-state="opened" title-content="Title" type="info" size="m" data-slot-names="unnamed" style="--sbb-notification-height: auto;">
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(
    html`<sbb-notification disable-animation title-content="Test title"
      >Lorem ipsum ...</sbb-notification
    >`,
  );
});
