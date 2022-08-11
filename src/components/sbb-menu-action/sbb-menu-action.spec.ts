import { SbbMenuAction } from './sbb-menu-action';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-menu-action', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbMenuAction],
      html: '<sbb-menu-action />',
    });

    expect(root).toEqualHtml(`
        <sbb-menu-action>
          <mock:shadow-root>
            <button class="sbb-action">
              <div class="sbb-action__content">
                <sbb-icon></sbb-icon>
                <span class="sbb-action__label"></span>
              </div>
            </button>
          </mock:shadow-root>
        </sbb-menu-action>
      `);
  });
});
