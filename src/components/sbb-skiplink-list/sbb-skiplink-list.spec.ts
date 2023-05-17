import { SbbSkiplinkList } from './sbb-skiplink-list';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-skiplink-list', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbSkiplinkList],
      html: `
        <sbb-skiplink-list>
          <sbb-link href='#'>Link 1</sbb-link>
          <sbb-link href='#'>Link 2</sbb-link>
          <sbb-link href='#'>Link 3</sbb-link>
        </sbb-skiplink-list>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-skiplink-list>
        <mock:shadow-root>
          <div class="sbb-skiplink-list__wrapper">
            <ul class="sbb-skiplink-list">
              <li>
                <slot name="link-0"></slot>
              </li>
              <li>
                <slot name="link-1"></slot>
              </li>
              <li>
                <slot name="link-2"></slot>
              </li>
            </ul>
          </div>
        </mock:shadow-root>
        <sbb-link href='#' id="sbb-skiplink-list-link-0" slot='link-0'>Link 1</sbb-link>
        <sbb-link href='#' id="sbb-skiplink-list-link-1" slot='link-1'>Link 2</sbb-link>
        <sbb-link href='#' id="sbb-skiplink-list-link-2" slot='link-2'>Link 3</sbb-link>
      </sbb-skiplink-list>
    `);
  });
});
