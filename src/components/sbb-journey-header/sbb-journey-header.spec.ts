import { SbbJourneyHeader } from './sbb-journey-header';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-journey-header', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbJourneyHeader],
      html: '<sbb-journey-header level="1" visual-level="1" text="Sample Title Text"></sbb-journey-header>',
    });

    expect(root).toEqualHtml(`
        <sbb-journey-header level="1" visual-level="1" text="Sample Title Text">
          <mock:shadow-root>
            <span class="journey-header journey-header--primary journey-header--size-5" dir="ltr">
              <span class="connection-text-origin connection--visually-hidden">
                Connection from
              </span>
              <span class="origin"></span>
              <span class="icon">
                <span class="connection-text-destination connection--visually-hidden">
                  to
                </span>
              </span>
              <span class="destination"></span>
            </span>
          </mock:shadow-root>
        </sbb-journey-header>
      `);
  });
});
