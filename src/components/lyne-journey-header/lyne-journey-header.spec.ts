import { LyneJourneyHeader } from './lyne-journey-header';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-journey-header', () => {

  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneJourneyHeader],
      html: '<lyne-journey-header level="1" visual-level="1" text="Sample Title Text"></lyne-journey-header>'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-journey-header level="1" visual-level="1" text="Sample Title Text">
          <mock:shadow-root>
            <h1 class="title title--positive title-1">Sample Title Text</h1>
          </mock:shadow-root>
        </lyne-journey-header>
      `);
  });

});
