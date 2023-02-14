import { SbbJourneySummary } from './sbb-journey-summary';
import { newSpecPage } from '@stencil/core/testing';
import { InterfaceSbbJourneySummaryAttributes } from './sbb-journey-summary.custom';

const now = new Date('2022-08-29T21:00:00Z').valueOf();

const data: InterfaceSbbJourneySummaryAttributes = {
  legs: [],
  vias: ['via'],
  origin: '',
  destination: '',
  arrivalWalk: 0,
  departure: '2022-08-29T20:30:00',
  arrival: '2022-08-29T22:30:00',
  departureWalk: 0,
  duration: 60,
};

const dataWithoutVia: InterfaceSbbJourneySummaryAttributes = {
  legs: [],
  origin: '',
  vias: [],
  destination: '',
  arrivalWalk: 0,
  departure: '2022-08-29T20:30:00',
  arrival: '2022-08-29T22:30:00',
  departureWalk: 0,
  duration: 100,
};

describe('sbb-journey-summary', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SbbJourneySummary],
      html: `<sbb-journey-summary data-now="${now}"></sbb-journey-summary>`,
    });
    page.rootInstance.config = data;
    await page.waitForChanges();
    expect(page.root).toEqualHtml(
      `<sbb-journey-summary data-now="1661806800000">
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
            <span class="sbb-journey-summary__date">
              <span>
                <time datetime="29 8">
                  29.08
                </time>
              </span>
              <span>
                ,
                <time>
                  1 h
                </time>
              </span>
            </span>
            <sbb-pearl-chain-time arrivaltime="2022-08-29T22:30:00" arrivalwalk="0" data-now="1661806800000" departuretime="2022-08-29T20:30:00" departurewalk="0"></sbb-pearl-chain-time>
          </div>
        </mock:shadow-root>
      </sbb-journey-summary>`
    );
  });

  it('renders without vias', async () => {
    const page = await newSpecPage({
      components: [SbbJourneySummary],
      html: `<sbb-journey-summary data-now="${now}"></sbb-journey-summary>`,
    });
    page.rootInstance.config = dataWithoutVia;
    await page.waitForChanges();
    expect(page.root).toEqualHtml(
      `<sbb-journey-summary data-now="1661806800000">
        <mock:shadow-root>
          <div class="sbb-journey-summary">
            <span class="sbb-journey-summary__date">
              <span>
                <time datetime="29 8">
                  29.08
                </time>
              </span>
              <span>
                ,
                <time>
                  1 h 40 min
                </time>
              </span>
            </span>
            <sbb-pearl-chain-time arrivaltime="2022-08-29T22:30:00" arrivalwalk="0" data-now="1661806800000" departuretime="2022-08-29T20:30:00" departurewalk="0"></sbb-pearl-chain-time>
          </div>
        </mock:shadow-root>
      </sbb-journey-summary>`
    );
  });
});
