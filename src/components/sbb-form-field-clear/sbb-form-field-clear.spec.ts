import { SbbFormFieldClear } from './sbb-form-field-clear';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-form-field-clear', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbFormFieldClear],
      html: '<sbb-form-field-clear />',
    });

    expect(root).toEqualHtml(`
        <sbb-form-field-clear>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-form-field-clear>
      `);
  });
});
