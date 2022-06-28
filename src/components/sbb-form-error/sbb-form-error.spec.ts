import { SbbFormError } from './sbb-form-error';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-form-error', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbFormError],
      html: '<sbb-form-error><span slot="error">Required</span></sbb-form-error>',
    });

    expect(root).toEqualHtml(`
        <sbb-form-error>
          <mock:shadow-root>
            <div>
              <slot></slot>
            </div>
          </mock:shadow-root>
          <span slot="error">Required</span>
        </sbb-form-error>
      `);
  });
});
