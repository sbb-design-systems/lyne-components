import { SbbRadioButtonGroup } from './sbb-radio-button-group';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-radio-button-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbRadioButtonGroup],
      html: '<sbb-radio-button-group />',
    });

    expect(root).toEqualHtml(`
        <sbb-radio-button-group orientation="horizontal" role="radiogroup">
          <mock:shadow-root>
          <div class="sbb-radio-group">
            <slot></slot>
          </div>
          </mock:shadow-root>
        </sbb-radio-button-group>
      `);
  });
});
