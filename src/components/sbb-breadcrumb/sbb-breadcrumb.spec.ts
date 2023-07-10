import { SbbBreadcrumb } from './sbb-breadcrumb';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-breadcrumb', () => {
  it('renders with text', async () => {
    const { root } = await newSpecPage({
      components: [SbbBreadcrumb],
      html: '<sbb-breadcrumb href="/test" target="_blank" download="true" rel="subsection">Breadcrumb</sbb-breadcrumb>',
    });

    expect(root).toEqualHtml(`
      <sbb-breadcrumb dir="ltr" role="link" tabindex="0" href="/test" target="_blank" download="true" rel="subsection">
        <mock:shadow-root>
          <a role="gridcell" tabindex="-1" class="sbb-breadcrumb" href="/test" target="_blank" download rel="subsection">
            <span class="sbb-breadcrumb__label">
              <slot></slot>
              <span class="sbb-breadcrumb__label--opens-in-new-window">
                . Link target opens in new window.
              </span>
            </span>
          </a>
        </mock:shadow-root>
        Breadcrumb
      </sbb-breadcrumb>
    `);
  });

  it('renders with icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbBreadcrumb],
      html: `
        <sbb-breadcrumb href="/" icon-name='house-small'></sbb-breadcrumb>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-breadcrumb dir="ltr" role="link" tabindex="0" href="/" icon-name="house-small">
        <mock:shadow-root>
          <a role="gridcell" tabindex="-1" class="sbb-breadcrumb" href="/">
            <span class="sbb-breadcrumb__icon">
              <slot name="icon">
                <sbb-icon name="house-small"></sbb-icon>
              </slot>
            </span>
          </a>
        </mock:shadow-root>
      </sbb-breadcrumb>
    `);
  });

  it('renders with icon and text', async () => {
    const { root } = await newSpecPage({
      components: [SbbBreadcrumb],
      html: `
        <sbb-breadcrumb href="/" icon-name='house-small'>Home</sbb-breadcrumb>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-breadcrumb dir="ltr" role="link" tabindex="0" href="/" icon-name="house-small">
        <mock:shadow-root>
          <a role="gridcell" tabindex="-1" class="sbb-breadcrumb" href="/">
            <span class="sbb-breadcrumb__icon">
              <slot name="icon">
                <sbb-icon name="house-small"></sbb-icon>
              </slot>
            </span>
            <span class="sbb-breadcrumb__label">
              <slot></slot>
            </span>
          </a>
        </mock:shadow-root>
        Home
      </sbb-breadcrumb>
    `);
  });

  it('renders as span if no href is provided', async () => {
    const { root } = await newSpecPage({
      components: [SbbBreadcrumb],
      html: '<sbb-breadcrumb>Breadcrumb</sbb-breadcrumb>',
    });

    expect(root).toEqualHtml(`
      <sbb-breadcrumb dir="ltr">
        <mock:shadow-root>
          <span class="sbb-breadcrumb">
            <span class="sbb-breadcrumb__label">
              <slot></slot>
            </span>
          </span>
        </mock:shadow-root>
        Breadcrumb
      </sbb-breadcrumb>
    `);
  });
});
