import { SbbExpansionPanelContent } from './sbb-expansion-panel-content';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-expansion-panel-content', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbExpansionPanelContent],
      html: '<sbb-expansion-panel-content />',
    });

    expect(root).toEqualHtml(`
        <sbb-expansion-panel-content>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-expansion-panel-content>
      `);
  });
});
