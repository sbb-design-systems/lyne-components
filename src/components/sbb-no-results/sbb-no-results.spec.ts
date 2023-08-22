import { SbbNoResults } from './sbb-no-results';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-no-results', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbNoResults],
      html: `
      <sbb-no-results title-content="Title.">
        <sbb-image slot="image"></sbb-image>
        <p slot="subtitle">Subtitle.</p>
        <p slot="legend">Error code: 0001</p>
        <sbb-button slot="action" icon-name="arrows-circle-small"></sbb-button>
      </sbb-no-results>`,
    });

    expect(root).toEqualHtml(`
    <sbb-no-results title-content="Title.">
      <mock:shadow-root>
        <slot name="image"></slot>
        <slot name="title">
          <sbb-title level="3" visuallevel="5">
            Title.
          </sbb-title>
        </slot>
        <slot name="subtitle"></slot>
        <slot name="legend"></slot>
        <slot name="action"></slot>
      </mock:shadow-root>
      <sbb-image slot="image"></sbb-image>
      <p slot="subtitle">
        Subtitle.
      </p>
      <p slot="legend">
        Error code: 0001
      </p>
      <sbb-button icon-name="arrows-circle-small" slot="action"></sbb-button>
    </sbb-no-results>
    `);
  });

  it('renders without optional slots', async () => {
    const { root } = await newSpecPage({
      components: [SbbNoResults],
      html: `
      <sbb-no-results title-content="Title.">
        <p slot="subtitle">Subtitle.</p>
      </sbb-no-results>`,
    });

    expect(root).toEqualHtml(`
    <sbb-no-results title-content="Title.">
      <mock:shadow-root>
        <slot name="title">
          <sbb-title level="3" visuallevel="5">
            Title.
          </sbb-title>
        </slot>
        <slot name="subtitle"></slot>
      </mock:shadow-root>
      <p slot="subtitle">
        Subtitle.
      </p>
    </sbb-no-results>
    `);
  });
});
