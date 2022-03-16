import { LyneToast } from './lyne-toast';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-toast', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneToast],
      html: '<lyne-toast />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-toast>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-toast>
      `);
  });

});
