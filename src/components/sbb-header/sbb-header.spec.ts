import { SbbHeader } from './sbb-header';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-header', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbHeader],
      html: '<sbb-header />',
    });

    expect(root).toEqualHtml(`
      <sbb-header class="sbb-header--shadow--hide">
        <mock:shadow-root>
          <div class="sbb-header">
            <div class="sbb-header__wrapper">
              <div class="sbb-header__left">
                <slot></slot>
              </div>
              <div class="sbb-header__right">
                <slot name="logo">
                  <sbb-logo protectiveroom="none"></sbb-logo>
                </slot>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </sbb-header>
    `);
  });
});
