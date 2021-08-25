import { LyneHeading } from './lyne-title';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-title', () => {

  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneHeading],
      html: '<lyne-title level="1" visual-level="1" text="Sample Title Text"></lyne-title>'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-title level="1" visual-level="1" text="Sample Title Text">
          <mock:shadow-root>
            <h1 class="title title--level1">Sample Title Text</h1>
          </mock:shadow-root>
        </lyne-title>
      `);
  });

});
