import { LyneInputError } from './lyne-input-error';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-input-error', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneInputError],
      html: '<lyne-input-error message="This is a required field."></lyne-input-error>'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-input-error
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
        </lyne-input-error>
      `);
  });

});
