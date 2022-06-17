import { SbbTitle } from './sbb-title';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-title', () => {

  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbTitle],
      html: '<sbb-title level="1" visual-level="1" text="Sample Title Text"></sbb-title>'
    });

    expect(root)
      .toEqualHtml(`
        <sbb-title level="1" visual-level="1" text="Sample Title Text">
          <mock:shadow-root>
            <h1 class="title title--positive title-1">Sample Title Text</h1>
          </mock:shadow-root>
        </sbb-title>
      `);
  });

});
