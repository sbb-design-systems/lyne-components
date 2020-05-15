import { LyneLink } from './lyne-link';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-link', () => {

  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneLink],
      html: '<lyne-link text="Link text" link="https://www.sbb.ch" open-in-new-window="false"></lyne-link>'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-link text="Link text" link="https://www.sbb.ch" open-in-new-window="false">
          <mock:shadow-root>
            <a class="link" href="https://www.sbb.ch">Link text</a>
          </mock:shadow-root>
        </lyne-link>
      `);
  });

});
