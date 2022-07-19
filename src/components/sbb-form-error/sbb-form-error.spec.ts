import { SbbFormError } from './sbb-form-error';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-form-error', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbFormError],
      html: '<sbb-form-error><span slot="error">Required</span></sbb-form-error>',
    });

    expect(root).toEqualHtml(`
      <sbb-form-error aria-live="polite" id="sbb-form-error-1">
          <mock:shadow-root>
            <span class="form-error--error-space-default input-label-error__icon">
              <slot name='icon'>
                <sbb-icon name="circle-information-small"></sbb-icon>
              </slot>
            </span>
            <span class="input-label-error">
              <slot></slot>
            </span>
          </mock:shadow-root>
          <span slot="error">Required</span>
        </sbb-form-error>
      `);
  });
});
