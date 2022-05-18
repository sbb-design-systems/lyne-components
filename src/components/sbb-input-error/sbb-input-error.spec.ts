import { SbbInputError } from './sbb-input-error';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-input-error', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbInputError],
      html: '<sbb-input-error message="This is a required field."></sbb-input-error>'
    });

    expect(root)
      .toEqualHtml(`
        <sbb-input-error
            message="This is a required field."
        >
          <mock:shadow-root>
            <span
                aria-hidden="true"
                class="input-label-error"
            >
                <span class="input-label-error__icon"></span>
                This is a required field.
            </span>
          </mock:shadow-root>
        </sbb-input-error>
      `);
  });

});
