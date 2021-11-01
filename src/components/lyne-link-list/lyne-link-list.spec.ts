import { LyneLinkList } from './lyne-link-list';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-link-list', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneLinkList],
      html: '<lyne-link-list />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-link-list>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-link-list>
      `);
  });

});
