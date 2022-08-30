import { SbbJourneySummary } from './sbb-journey-summary';
import { newSpecPage } from '@stencil/core/testing';
import { InterfaceJourneySummaryAttributes } from './sbb-journey-summary.custom';

const data: InterfaceJourneySummaryAttributes = {
  config: {
    legs: '',
    vias: ['via'],
    startPoint: '',
    destination: '',
    arrivalWalk: 0,
    departure: { time: '2022-08-29T20:30:00' },
    arrival: { time: '2022-08-29T22:30:00' },
    departureWalk: 0,
    duration: 0,
  },
};

describe('sbb-journey-summary', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SbbJourneySummary],
      html: `<sbb-journey-summary></sbb-journey-summary>`,
    });
    page.rootInstance.summaryConfig = data?.config;
    await page.waitForChanges();
    expect(page.root).toEqualHtml(
      ` <sbb-journey-summary>
    <mock:shadow-root>
      <div class="journey-summary">
        <div class="journey-summary__via-block">
          <span class="journey-summary__via-text">
            Via
          </span>
          <ul class="journey-summary__vias">
            <li class="journey-summary__via">
              via
            </li>
          </ul>
        </div>
        <div class="journey-summary__body">
          <span>
            <time>
              29.08,
            </time>
            <span>
              <time>
                2
              </time>
              <span>
                h
              </span>
              <time>
                0
              </time>
              <span>
                m
              </span>
            </span>
          </span>
          <div class="journey-summary__transportation-details">
            <span class="screenreaderonly">
              Departure
            </span>
            0
            <time>
             20:30
            </time>
            <div class="journey-summary__pearlchain">
              <sbb-pearl-chain legs=""></sbb-pearl-chain>
            </div>
            <time>
              22:30
            </time>
            <span class="screenreaderonly">
              Arrival
            </span>
            0
          </div>
          <div class="journey-summary_slot">
            <slot></slot>
          </div>
        </div>
      </div>
    </mock:shadow-root>
  </sbb-journey-summary>`
    );
  });
});
