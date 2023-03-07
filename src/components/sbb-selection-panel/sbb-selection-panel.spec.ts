import { SbbSelectionPanel } from './sbb-selection-panel';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-selection-panel', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbSelectionPanel],
      html: '<sbb-selection-panel />',
    });

    expect(root).toEqualHtml(`
        <sbb-selection-panel>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-selection-panel>
      `);
  });
});
