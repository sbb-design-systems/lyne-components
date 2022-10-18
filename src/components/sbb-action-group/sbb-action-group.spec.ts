import { SbbActionGroup } from './sbb-action-group';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-action-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbActionGroup],
      html: `
        <sbb-action-group align="start" orientation="horizontal">
          <sbb-button variant="secondary">Button</sbb-button>
          <sbb-link
            variant="block"
            text-size="s"
            icon-name="chevron-small-left-small"
            icon-placement="start"
            href="https://github.com/lyne-design-system/lyne-components">
            Link
          </sbb-link>
        </sbb-action-group>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-action-group align="start" orientation="horizontal" align-group="start" horizontal-from="medium">
        <mock:shadow-root>
          <div class="sbb-action-group">
            <slot></slot>
          </div>
        </mock:shadow-root>
        <sbb-button variant="secondary">Button</sbb-button>
        <sbb-link
          variant="block"
          text-size="s"
          icon-name="chevron-small-left-small"
          icon-placement="start"
          href="https://github.com/lyne-design-system/lyne-components">
          Link
        </sbb-link>
      </sbb-action-group>
      `);
  });
});
