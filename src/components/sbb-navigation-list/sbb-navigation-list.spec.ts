import { SbbNavigationList } from './sbb-navigation-list';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-navigation-list', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbNavigationList],
      html: '<sbb-navigation-list />',
    });

    expect(root).toEqualHtml(`
        <sbb-navigation-list class="sbb-navigation-list">
          <mock:shadow-root>
            <slot name="label"></slot>
            <slot></slot>
          </mock:shadow-root>
        </sbb-navigation-list>
      `);
  });
});
