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
    page.rootInstance.trip = data;
    await page.waitForChanges();
    expect(page.root).toEqualHtml(
      `<sbb-journey-summary data-now="1661806800000">
      <mock:shadow-root>
        <div class="sbb-journey-summary">
          <div>
            <div class="sbb-journey-summary__via-block">
              <span class="sbb-journey-summary__via-text">
                Via
              </span>
              <ul class="sbb-journey-summary__vias" role="presentation">
                <li class="sbb-journey-summary__via">
                  via
                </li>
              </ul>
            </div>
            <div class="sbb-journey-summary__date">
              <span>
                <time datetime="29 8">
                  Mo. 29.08.2022
                </time>
              </span>
              <time>
                <span class="sbb-screenreaderonly">
                  Travel time 1 Hour
                </span>
                <span aria-hidden="true">
                  , 1 h
                </span>
              </time>
            </div>
            <sbb-pearl-chain-time arrivaltime="2022-08-29T22:30:00" arrivalwalk="0" data-now="1661806800000" departuretime="2022-08-29T20:30:00" departurewalk="0"></sbb-pearl-chain-time>
          </div>
        </div>
      </mock:shadow-root>
    </sbb-journey-summary>`,
    );
  });

  it('renders without vias', async () => {
    const page = await newSpecPage({
      components: [SbbJourneySummary],
      html: `<sbb-journey-summary data-now="${now}"></sbb-journey-summary>`,
    });
    page.rootInstance.trip = dataWithoutVia;
    await page.waitForChanges();
    expect(page.root).toEqualHtml(
      `<sbb-journey-summary data-now="1661806800000">
      <mock:shadow-root>
        <div class="sbb-journey-summary">
          <div>
            <div class="sbb-journey-summary__date">
              <span>
                <time datetime="29 8">
                  Mo. 29.08.2022
                </time>
              </span>
              <time>
                <span class="sbb-screenreaderonly">
                  Travel time 1 Hour 40 Minutes
                </span>
                <span aria-hidden="true">
                  , 1 h 40 min
                </span>
              </time>
            </div>
            <sbb-pearl-chain-time arrivaltime="2022-08-29T22:30:00" arrivalwalk="0" data-now="1661806800000" departuretime="2022-08-29T20:30:00" departurewalk="0"></sbb-pearl-chain-time>
          </div>
        </div>
      </mock:shadow-root>
    </sbb-journey-summary>`,
    );
  });

  it('renders with second journey', async () => {
    const page = await newSpecPage({
      components: [SbbJourneySummary],
      html: `<sbb-journey-summary data-now="${now}"></sbb-journey-summary>`,
    });
    page.rootInstance.trip = dataWithoutVia;
    page.rootInstance.tripBack = data;
    page.rootInstance.roundTrip = true;
    await page.waitForChanges();
    expect(page.root).toEqualHtml(
      `<sbb-journey-summary data-now="1661806800000">
      <mock:shadow-root>
        <div class="sbb-journey-summary">
          <div>
            <div class="sbb-journey-summary__date">
              <span>
                <time datetime="29 8">
                  Mo. 29.08.2022
                </time>
              </span>
              <time>
                <span class="sbb-screenreaderonly">
                  Travel time 1 Hour 40 Minutes
                </span>
                <span aria-hidden="true">
                  , 1 h 40 min
                </span>
              </time>
            </div>
            <sbb-pearl-chain-time arrivaltime="2022-08-29T22:30:00" arrivalwalk="0" data-now="1661806800000" departuretime="2022-08-29T20:30:00" departurewalk="0"></sbb-pearl-chain-time>
          </div>
          <div>
            <div>
              <div class="sbb-journey-summary__via-block">
                <span class="sbb-journey-summary__via-text">
                  Via
                </span>
                <ul class="sbb-journey-summary__vias" role="presentation">
                  <li class="sbb-journey-summary__via">
                    via
                  </li>
                </ul>
              </div>
              <div class="sbb-journey-summary__date">
                <span>
                  <time datetime="29 8">
                    Mo. 29.08.2022
                  </time>
                </span>
                <time>
                  <span class="sbb-screenreaderonly">
                    Travel time 1 Hour
                  </span>
                  <span aria-hidden="true">
                    , 1 h
                  </span>
                </time>
              </div>
              <sbb-pearl-chain-time arrivaltime="2022-08-29T22:30:00" arrivalwalk="0" data-now="1661806800000" departuretime="2022-08-29T20:30:00" departurewalk="0"></sbb-pearl-chain-time>
            </div>
            <sbb-divider class="sbb-journey-summary__divider"></sbb-divider>
          </div>
        </div>
      </mock:shadow-root>
    </sbb-journey-summary>`,
    );
  });
});
