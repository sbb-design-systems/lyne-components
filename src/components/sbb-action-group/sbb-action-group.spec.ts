import { SbbActionGroup } from './sbb-action-group';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-action-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbActionGroup],
      html: `
        <sbb-action-group align="start" orientation="horizontal">
          <sbb-button variant="secondary" label="Button" />
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
      <sbb-action-group align="start" orientation="horizontal">
        <mock:shadow-root>
          <div class="action-group action-group--align-start">
            <slot></slot>
          </div>
        </mock:shadow-root>
        <sbb-button variant="secondary" label="Button" />
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
