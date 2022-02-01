import { LyneTeaserList } from './lyne-teaser-list';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-teaser-list', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTeaserList],
      html: '<lyne-teaser-list />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-teaser-list>
          <mock:shadow-root>
            <div class="teaser-list" role="list">
              <slot></slot>
            </div>
          </mock:shadow-root>
        </lyne-teaser-list>
      `);
  });

});
