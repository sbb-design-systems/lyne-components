import { SbbFormField } from './sbb-form-field';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-form-field', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbFormField],
      html: '<sbb-form-field />'
    });

    expect(root)
      .toEqualHtml(`
        <sbb-form-field>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-form-field>
      `);
  });

});
