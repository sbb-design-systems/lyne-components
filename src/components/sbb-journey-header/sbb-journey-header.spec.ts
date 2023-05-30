import { SbbJourneyHeader } from './sbb-journey-header';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-journey-header', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbJourneyHeader],
      html: '<sbb-journey-header origin="A" destination="B"></sbb-journey-header>',
    });

    expect(root).toEqualHtml(`
      <sbb-journey-header origin="A" destination="B" size="m">
        <mock:shadow-root>
          <sbb-title level="3" visual-level="5">
            <span class="sbb-journey-header" dir="ltr">
              <span class="sbb-journey-header__origin">
                <span class="sbb-journey-header__connection--visually-hidden">
                  Connection from
                </span>
                A
              </span>
              <sbb-icon name="arrow-long-right-small"></sbb-icon>
              <span class="sbb-journey-header__destination">
                <span class="sbb-journey-header__connection--visually-hidden">
                  to
                </span>
                B
              </span>
            </span>
          </sbb-title>
        </mock:shadow-root>
      </sbb-journey-header>
    `);
  });

  it('renders H1 L-sized round-trip negative', async () => {
    const { root } = await newSpecPage({
      components: [SbbJourneyHeader],
      html: '<sbb-journey-header level="1" size="l" round-trip="true" origin="B" destination="C" negative="true"></sbb-journey-header>',
    });

    expect(root).toEqualHtml(`
      <sbb-journey-header level="1"size="l" round-trip="true" origin="B" destination="C" negative="">
        <mock:shadow-root>
          <sbb-title level="1" visual-level="4" negative="">
            <span class="sbb-journey-header" dir="ltr">
              <span class="sbb-journey-header__origin">
                <span class="sbb-journey-header__connection--visually-hidden">
                  Connection from
                </span>
                B
              </span>
              <sbb-icon name="arrows-long-right-left-small"></sbb-icon>
              <span class="sbb-journey-header__destination">
                <span class="sbb-journey-header__connection--visually-hidden">
                  to
                </span>
                C
                <span class="sbb-journey-header__connection--visually-hidden">
                  and back to B.
                </span>
              </span>
            </span>
          </sbb-title>
        </mock:shadow-root>
      </sbb-journey-header>
    `);
  });
});
