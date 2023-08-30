import { SbbMessage } from './sbb-message';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-message', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbMessage],
      html: `
      <sbb-message title-content="Title.">
        <sbb-image slot="image"></sbb-image>
        <p slot="subtitle">Subtitle.</p>
        <p slot="legend">Error code: 0001</p>
        <sbb-button slot="action" icon-name="arrows-circle-small"></sbb-button>
      </sbb-message>`,
    });

    expect(root).toEqualHtml(`
    <sbb-message title-content="Title.">
      <mock:shadow-root>
        <div class="sbb-message__container">
          <slot name="image"></slot>
          <sbb-title level="3" visuallevel="5" class="sbb-message__title">
            <slot name="title">
              Title.
            </slot>
          </sbb-title>
          <slot name="subtitle"></slot>
          <slot name="legend"></slot>
          <slot name="action"></slot>
        </div>
      </mock:shadow-root>
      <sbb-image slot="image"></sbb-image>
      <p slot="subtitle">
        Subtitle.
      </p>
      <p slot="legend">
        Error code: 0001
      </p>
      <sbb-button icon-name="arrows-circle-small" slot="action"></sbb-button>
    </sbb-message>
    `);
  });

  it('renders without optional slots', async () => {
    const { root } = await newSpecPage({
      components: [SbbMessage],
      html: `
      <sbb-message title-content="Title.">
        <p slot="subtitle">Subtitle.</p>
      </sbb-message>`,
    });

    expect(root).toEqualHtml(`
    <sbb-message title-content="Title.">
      <mock:shadow-root>
        <div class="sbb-message__container">
          <slot name="image"></slot>
          <sbb-title level="3" visuallevel="5" class="sbb-message__title">
            <slot name="title">
              Title.
            </slot>
          </sbb-title>
          <slot name="subtitle"></slot>
          <slot name="legend"></slot>
          <slot name="action"></slot>
        </div>
      </mock:shadow-root>
      <p slot="subtitle">
        Subtitle.
      </p>
    </sbb-message>
    `);
  });
});
