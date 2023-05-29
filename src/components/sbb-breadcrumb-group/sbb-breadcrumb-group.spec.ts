import { SbbBreadcrumbGroup } from './sbb-breadcrumb-group';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-breadcrumb-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbBreadcrumbGroup],
      html: `
        <sbb-breadcrumb-group>
          <sbb-breadcrumb href='/' icon-name='pie-small'></sbb-breadcrumb>
          <sbb-breadcrumb href='/one'>One</sbb-breadcrumb>
          <sbb-breadcrumb href='/one'>Two</sbb-breadcrumb>
        </sbb-breadcrumb-group>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-breadcrumb-group role='navigation'>
        <mock:shadow-root>
          <ol class="sbb-breadcrumb-group">
            <li class="sbb-breadcrumb-group__item">
              <slot name="breadcrumb-0"></slot>
              <sbb-icon name="chevron-small-right-small"></sbb-icon>
            </li>
            <li class="sbb-breadcrumb-group__item">
              <slot name="breadcrumb-1"></slot>
              <sbb-icon name="chevron-small-right-small"></sbb-icon>
            </li>
            <li class="sbb-breadcrumb-group__item">
              <slot name="breadcrumb-2"></slot>
            </li>
          </ol>
          <span hidden="">
            <slot></slot>
          </span>
        </mock:shadow-root>
        <sbb-breadcrumb href="/" icon-name="pie-small" slot="breadcrumb-0">
        </sbb-breadcrumb>
        <sbb-breadcrumb href="/one" slot="breadcrumb-1">
          One
        </sbb-breadcrumb>
        <sbb-breadcrumb href="/one" slot="breadcrumb-2">
          Two
        </sbb-breadcrumb>
      </sbb-breadcrumb-group>
    `);
  });
});
