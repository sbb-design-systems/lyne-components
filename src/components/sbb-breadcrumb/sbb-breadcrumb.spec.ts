import { SbbBreadcrumb } from './sbb-breadcrumb';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-breadcrumb', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbBreadcrumb],
      html: '<sbb-breadcrumb href="/test" target="_blank" download="true" rel="subsection">Breadcrumb</sbb-breadcrumb>',
    });

    expect(root).toEqualHtml(`
        <sbb-breadcrumb href="/test" target="_blank" download="true" rel="subsection">
          <mock:shadow-root>
            <a class="sbb-breadcrumb__link" href="/test" target="_blank" download rel="subsection">
              <slot></slot>
            </a>
          </mock:shadow-root>
          Breadcrumb
        </sbb-breadcrumb>
      `);
  });
});
