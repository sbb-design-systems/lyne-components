import { SbbExpansionPanel } from './sbb-expansion-panel';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-expansion-panel', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbExpansionPanel],
      html: '<sbb-expansion-panel />',
    });

    expect(root).toEqualHtml(`
        <sbb-expansion-panel>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-expansion-panel>
      `);
  });
});
