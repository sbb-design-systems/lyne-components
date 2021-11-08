import { LyneTextInput } from './lyne-text-input';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-text-input', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTextInput],
      html: '<lyne-text-input />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-text-input>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-text-input>
      `);
  });

});
