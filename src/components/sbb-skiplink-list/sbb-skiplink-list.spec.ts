import { SbbSkiplinkList } from './sbb-skiplink-list';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-skiplink-list', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbSkiplinkList],
      html: `
        <sbb-skiplink-list>
          <sbb-link href='#'>Link</sbb-link>
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
            </ul>
          </div>
        </mock:shadow-root>
        <sbb-link href='#' slot='link-0'>Link</sbb-link>
      </sbb-skiplink-list>
    `);
  });
});
