import { SbbNotification } from './sbb-notification';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-notification', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbNotification],
      html: '<sbb-notification>The quick brown fox jumps over the lazy dog.</sbb-notification>',
    });

    expect(root).toEqualHtml(`
      <sbb-notification data-state="opened" type="info" variant="default">
        <mock:shadow-root>
          <div class="sbb-notification">
            <sbb-icon class="sbb-notification__icon" name="circle-information-small"></sbb-icon>
            <span class="sbb-notification__content">
              <slot></slot>
            </span>
            <span class="sbb-notification__close-wrapper">
              <sbb-divider class="sbb-notification__divider" orientation="vertical"></sbb-divider>
              <sbb-button aria-label="Close message" class="sbb-notification__close" icon-name="cross-small" size="m" variant="transparent"></sbb-button>
            </span>
          </div>
        </mock:shadow-root>
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`);
  });

  it('renders with a title', async () => {
    const { root } = await newSpecPage({
      components: [SbbNotification],
      html: '<sbb-notification title-content="Title">The quick brown fox jumps over the lazy dog.</sbb-notification>',
    });

    expect(root).toEqualHtml(`
      <sbb-notification data-has-title data-state="opened" title-content="Title" type="info" variant="default">
        <mock:shadow-root>
          <div class="sbb-notification">
            <sbb-icon class="sbb-notification__icon" name="circle-information-small"></sbb-icon>
            <span class="sbb-notification__content">
              <sbb-title level="3" visualLevel="5" class="sbb-notification__title">
                <slot name="title">
                  Title
                </slot>
              </sbb-title>
              <slot></slot>
            </span>
            <span class="sbb-notification__close-wrapper">
              <sbb-divider class="sbb-notification__divider" orientation="vertical"></sbb-divider>
              <sbb-button aria-label="Close message" class="sbb-notification__close" icon-name="cross-small" size="m" variant="transparent"></sbb-button>
            </span>
          </div>
        </mock:shadow-root>
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`);
  });

  it('renders with a slotted title', async () => {
    const { root } = await newSpecPage({
      components: [SbbNotification],
      html: '<sbb-notification><span slot="title">Slotted title</span> The quick brown fox jumps over the lazy dog.</sbb-notification>',
    });

    expect(root).toEqualHtml(`
      <sbb-notification data-has-title data-state="opened" type="info" variant="default">
        <mock:shadow-root>
          <div class="sbb-notification">
            <sbb-icon class="sbb-notification__icon" name="circle-information-small"></sbb-icon>
            <span class="sbb-notification__content">
              <sbb-title level="3" visualLevel="5" class="sbb-notification__title">
                <slot name="title"></slot>
              </sbb-title>
              <slot></slot>
            </span>
            <span class="sbb-notification__close-wrapper">
              <sbb-divider class="sbb-notification__divider" orientation="vertical"></sbb-divider>
              <sbb-button aria-label="Close message" class="sbb-notification__close" icon-name="cross-small" size="m" variant="transparent"></sbb-button>
            </span>
          </div>
        </mock:shadow-root>
        <span slot="title">
          Slotted title
        </span>
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`);
  });

  it('renders without the close button', async () => {
    const { root } = await newSpecPage({
      components: [SbbNotification],
      html: '<sbb-notification title-content="Title" readonly>The quick brown fox jumps over the lazy dog.</sbb-notification>',
    });

    expect(root).toEqualHtml(`
      <sbb-notification data-has-title readonly data-state="opened" title-content="Title" type="info" variant="default">
        <mock:shadow-root>
          <div class="sbb-notification">
            <sbb-icon class="sbb-notification__icon" name="circle-information-small"></sbb-icon>
            <span class="sbb-notification__content">
              <sbb-title level="3" visualLevel="5" class="sbb-notification__title">
                <slot name="title">
                  Title
                </slot>
              </sbb-title>
              <slot></slot>
            </span>
          </div>
        </mock:shadow-root>
        The quick brown fox jumps over the lazy dog.
      </sbb-notification>`);
  });
});
