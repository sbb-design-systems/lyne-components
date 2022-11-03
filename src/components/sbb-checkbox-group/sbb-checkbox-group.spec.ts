import { SbbCheckboxGroup } from './sbb-checkbox-group';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-checkbox-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbCheckboxGroup],
      html: '<sbb-checkbox-group />',
    });

    expect(root).toEqualHtml(`
        <sbb-checkbox-group>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-checkbox-group>
      `);
  });
});
