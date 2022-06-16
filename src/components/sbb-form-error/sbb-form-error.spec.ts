import { SbbFormError } from './sbb-form-error';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-form-error', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbFormError],
      html: '<sbb-form-error />'
    });

    expect(root)
      .toEqualHtml(`
        <sbb-form-error>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-form-error>
      `);
  });

});
