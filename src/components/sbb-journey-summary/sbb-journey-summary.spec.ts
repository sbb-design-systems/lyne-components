import { SbbJourneySummary } from './sbb-journey-summary';
import { newSpecPage } from '@stencil/core/testing';
import { InterfaceJourneySummaryAttributes } from './sbb-journey-summary.custom';

const data: InterfaceJourneySummaryAttributes = {
  config: {
    legs: '',
    vias: ['via'],
    origin: '',
    destination: '',
    arrivalWalk: 0,
    departure: { time: '2022-08-29T20:30:00' },
    arrival: { time: '2022-08-29T22:30:00' },
    departureWalk: 0,
    duration: 60,
  },
};

const dataWithoutVia: InterfaceJourneySummaryAttributes = {
  config: {
    legs: '',
    origin: '',
    vias: [],
    destination: '',
    arrivalWalk: 0,
    departure: { time: '2022-08-29T20:30:00' },
    arrival: { time: '2022-08-29T22:30:00' },
    departureWalk: 0,
    duration: 100,
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
      `<sbb-journey-summary>
      <mock:shadow-root>
        <div class="journey-summary">
          <div class="journey-summary__body">
            <div class="journey-summary__transportation-details">
              <span class="screenreaderonly">
                Departure
              </span>
              <div class="journey-summary__pearlchain">
                <sbb-pearl-chain></sbb-pearl-chain>
              </div>
              <span class="screenreaderonly">
                Arrival
              </span>
            </div>
          </div>
        </div>
      </mock:shadow-root>
    </sbb-journey-summary>`
    );
  });

  it('renders without vias', async () => {
    const page = await newSpecPage({
      components: [SbbJourneySummary],
      html: `<sbb-journey-summary></sbb-journey-summary>`,
    });
    page.rootInstance.summaryConfig = dataWithoutVia?.config;
    await page.waitForChanges();
    expect(page.root).toEqualHtml(
      `<sbb-journey-summary>
      <mock:shadow-root>
        <div class="journey-summary">
          <div class="journey-summary__body">
            <div class="journey-summary__transportation-details">
              <span class="screenreaderonly">
                Departure
              </span>
              <div class="journey-summary__pearlchain">
                <sbb-pearl-chain></sbb-pearl-chain>
              </div>
              <span class="screenreaderonly">
                Arrival
              </span>
            </div>
          </div>
        </div>
      </mock:shadow-root>
    </sbb-journey-summary>`
    );
  });
});
