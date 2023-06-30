import { SbbExpansionPanelHeader } from './sbb-expansion-panel-header';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-expansion-panel-header', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbExpansionPanelHeader],
      html: '<sbb-expansion-panel-header />',
    });

    expect(root).toEqualHtml(`
        <sbb-expansion-panel-header>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-expansion-panel-header>
      `);
  });
});
