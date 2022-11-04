import { SbbJourneySummary } from './sbb-journey-summary';
import { newSpecPage } from '@stencil/core/testing';
import { InterfaceJourneySummaryAttributes } from './sbb-journey-summary.custom';

const data: InterfaceJourneySummaryAttributes = {
  config: {
    legs: [],
    vias: ['via'],
    origin: '',
    destination: '',
    arrivalWalk: 0,
    departure: { time: '2022-08-29T20:30:00', delay: 0 },
    arrival: { time: '2022-08-29T22:30:00', delay: 0 },
    departureWalk: 0,
    duration: 60,
  },
};

const dataWithoutVia: InterfaceJourneySummaryAttributes = {
  config: {
    legs: [],
    origin: '',
    vias: [],
    destination: '',
    arrivalWalk: 0,
    departure: { time: '2022-08-29T20:30:00', delay: 0 },
    arrival: { time: '2022-08-29T22:30:00', delay: 0 },
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
    page.rootInstance.config = data?.config;
    await page.waitForChanges();
    expect(page.root).toEqualHtml(
      `<sbb-journey-summary>
      <mock:shadow-root>
        <div class="sbb-journey-summary">
          <div class="sbb-journey-summary__via-block">
            <span class="sbb-journey-summary__via-text">
              Via
            </span>
            <ul class="sbb-journey-summary__vias">
              <li class="sbb-journey-summary__via">
                via
              </li>
            </ul>
          </div>
          <div class="sbb-journey-summary__body">
            <span>
              <time datetime="29 8">
                29.08,
              </time>
              <time datetime="1 0">
                <span>
                  1h
                </span>
                0min
              </time>
            </span>
            <sbb-pearl-chain-time arrivaltime="2022-08-29T22:30:00" arrivalwalk="0" departuretime="2022-08-29T20:30:00" departurewalk="0"></sbb-pearl-chain-time>
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
    page.rootInstance.config = dataWithoutVia?.config;
    await page.waitForChanges();
    expect(page.root).toEqualHtml(
      `<sbb-journey-summary>
      <mock:shadow-root>
        <div class="sbb-journey-summary">
          <div class="sbb-journey-summary__via-block">
            <span class="sbb-journey-summary__via-text">
              Via
            </span>
            <ul class="sbb-journey-summary__vias"></ul>
          </div>
          <div class="sbb-journey-summary__body">
            <span>
              <time datetime="29 8">
                29.08,
              </time>
              <time datetime="1 40">
                <span>
                  1h
                </span>
                40min
              </time>
            </span>
            <sbb-pearl-chain-time arrivaltime="2022-08-29T22:30:00" arrivalwalk="0" departuretime="2022-08-29T20:30:00" departurewalk="0"></sbb-pearl-chain-time>
          </div>
        </div>
      </mock:shadow-root>
    </sbb-journey-summary>`
    );
  });
});
