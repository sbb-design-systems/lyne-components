import { LyneHeading } from './lyne-heading';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-heading', () => {

  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneHeading],
      html: '<lyne-heading level="1" visual-level="1" text="Sample Heading"></lyne-heading>'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-heading level="1" visual-level="1" text="Sample Heading">
          <mock:shadow-root>
            <h1 class="title title--level1">Sample Heading</h1>
          </mock:shadow-root>
        </lyne-heading>
      `);
  });

});
