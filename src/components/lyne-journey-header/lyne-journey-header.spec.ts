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
            <span class="journey-header journey-header--primary journey-header--size-5" dir="ltr" itemscope="" itemtype="https://schema.org/TravelAction">
              <span class="connection-text-hidden connection-text-origin">
                Connection from
              </span>
              <span class="origin" itemprop="fromLocation" itemscope="" itemtype="https://schema.org/Place"></span>
              <span class="icon">
                <span class="connection-text-destination connection-text-hidden">
                  to
                </span>
              </span>
              <span class="destination" itemprop="toLocation" itemscope="" itemtype="https://schema.org/Place"></span>
            </span>
          </mock:shadow-root>
        </lyne-journey-header>
      `);
  });

});
