import { SbbNavigationSection } from './sbb-navigation-section';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-navigation-section', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbNavigationSection],
      html: '<sbb-navigation-section />',
    });

    expect(root).toEqualHtml(`
        <sbb-navigation-section>
          <mock:shadow-root>
            <slot name="label"></slot>
            <slot></slot>
          </mock:shadow-root>
        </sbb-navigation-section>
      `);
  });
});
