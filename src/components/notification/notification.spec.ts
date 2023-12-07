import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';

import './notification';
import '../link';
import '../button';
import '../icon';
import '../divider';

describe('sbb-notification', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-notification disable-animation
        >The quick brown fox jumps over the lazy dog.</sbb-notification
      >`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `
      <sbb-notification disable-animation data-state="opening" type="info" style="--sbb-notification-height: auto;">
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-notification__wrapper">
          <div class="sbb-notification">
            <sbb-icon aria-hidden="true" data-namespace="default" role="img" class="sbb-notification__icon" name="circle-information-small"></sbb-icon>
            <span class="sbb-notification__content">
              <slot></slot>
            </span>
            <span class="sbb-notification__close-wrapper">
              <sbb-divider aria-orientation="vertical" role="separator" class="sbb-notification__divider" orientation="vertical"></sbb-divider>
              <sbb-button data-icon-only dir="ltr" role="button" tabindex="0" aria-label="Close message" class="sbb-notification__close" icon-name="cross-small" size="m" variant="secondary"></sbb-button>
            </span>
          </div>
        </div>
      `,
    );
  });

  it('renders with a title', async () => {
    const root = await fixture(
      html`<sbb-notification disable-animation title-content="Title"
        >The quick brown fox jumps over the lazy dog.</sbb-notification
      >`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `
      <sbb-notification disable-animation data-has-title data-state="opening" title-content="Title" type="info" style="--sbb-notification-height: auto;">
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-notification__wrapper">
          <div class="sbb-notification">
            <sbb-icon aria-hidden="true" data-namespace="default" role="img" class="sbb-notification__icon" name="circle-information-small"></sbb-icon>
            <span class="sbb-notification__content">
              <sbb-title aria-level="3" role="heading" level="3" visual-level="5" class="sbb-notification__title">
                <slot name="title">
                  Title
                </slot>
              </sbb-title>
              <slot></slot>
            </span>
            <span class="sbb-notification__close-wrapper">
              <sbb-divider aria-orientation="vertical" role="separator" class="sbb-notification__divider" orientation="vertical"></sbb-divider>
              <sbb-button data-icon-only dir="ltr" role="button" tabindex="0" aria-label="Close message" class="sbb-notification__close" icon-name="cross-small" size="m" variant="secondary"></sbb-button>
            </span>
          </div>
        </div>
      `,
    );
  });

  it('renders with a slotted title', async () => {
    const root = await fixture(
      html`<sbb-notification disable-animation
        ><span slot="title">Slotted title</span>
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `
      <sbb-notification disable-animation data-has-title data-state="opening" type="info" style="--sbb-notification-height: auto;">
        <span slot="title">
          Slotted title
        </span>
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-notification__wrapper">
          <div class="sbb-notification">
            <sbb-icon aria-hidden="true" data-namespace="default" role="img" class="sbb-notification__icon" name="circle-information-small"></sbb-icon>
            <span class="sbb-notification__content">
              <sbb-title aria-level="3" role="heading" level="3" visual-level="5" class="sbb-notification__title">
                <slot name="title"></slot>
              </sbb-title>
              <slot></slot>
            </span>
            <span class="sbb-notification__close-wrapper">
              <sbb-divider aria-orientation="vertical" role="separator" class="sbb-notification__divider" orientation="vertical"></sbb-divider>
              <sbb-button data-icon-only dir="ltr" role="button" tabindex="0" aria-label="Close message" class="sbb-notification__close" icon-name="cross-small" size="m" variant="secondary"></sbb-button>
            </span>
          </div>
        </div>
      `,
    );
  });

  it('renders without the close button', async () => {
    const root = await fixture(
      html`<sbb-notification disable-animation title-content="Title" readonly
        >The quick brown fox jumps over the lazy dog.</sbb-notification
      >`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `
      <sbb-notification disable-animation data-has-title readonly data-state="opening" title-content="Title" type="info" style="--sbb-notification-height: auto;">
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-notification__wrapper">
          <div class="sbb-notification">
            <sbb-icon aria-hidden="true" data-namespace="default" role="img" class="sbb-notification__icon" name="circle-information-small"></sbb-icon>
            <span class="sbb-notification__content">
              <sbb-title aria-level="3" role="heading" level="3" visual-level="5" class="sbb-notification__title">
                <slot name="title">
                  Title
                </slot>
              </sbb-title>
              <slot></slot>
            </span>
          </div>
        </div>
      `,
    );
  });
});
