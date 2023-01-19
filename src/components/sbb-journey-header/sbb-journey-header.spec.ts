import { SbbJourneyHeader } from './sbb-journey-header';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-journey-header', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbJourneyHeader],
      html: '<sbb-journey-header level="1" origin="A" destination="B"></sbb-journey-header>',
    });

    expect(root).toEqualHtml(`
      <sbb-journey-header level="1" origin="A" destination="B" size="m">
        <mock:shadow-root>
          <h1 class="sbb-journey-header" dir="ltr">
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
          </h1>
        </mock:shadow-root>
      </sbb-journey-header>
    `);
  });

  it('renders L-sized round-trip negative', async () => {
    const { root } = await newSpecPage({
      components: [SbbJourneyHeader],
      html: '<sbb-journey-header size="l" round-trip="true" origin="B" destination="C" negative="true"></sbb-journey-header>',
    });

    expect(root).toEqualHtml(`
      <sbb-journey-header size="l" round-trip="true" origin="B" destination="C" negative="">
        <mock:shadow-root>
          <span class="sbb-journey-header" dir="ltr">
            <span class="sbb-journey-header__origin">
              <span class="sbb-journey-header__connection--visually-hidden">
                Connection from
              </span>
              B
            </span>
            <sbb-icon name="arrows-left-right-small"></sbb-icon>
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
        </mock:shadow-root>
      </sbb-journey-header>
    `);
  });
});
