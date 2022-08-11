import { SbbMenu } from './sbb-menu';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-menu', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbMenu],
      html: '<sbb-menu />',
    });

    expect(root).toEqualHtml(`
        <sbb-menu>
          <mock:shadow-root>
            <dialog class="sbb-menu">
              <div class="sbb-menu__content">
                <slot></slot>
              </div>
            </dialog>
          </mock:shadow-root>
        </sbb-menu>
      `);
  });
});
