import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';

import type { SbbJourneySummary, InterfaceSbbJourneySummaryAttributes } from './journey-summary';

import './journey-summary';

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
    const root = (await fixture(
      html` <sbb-journey-summary data-now="${now}"></sbb-journey-summary>`,
    )) as SbbJourneySummary;
    root.trip = data;

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-journey-summary data-now="1661806800000">
      </sbb-journey-summary>`);
    expect(root).shadowDom.to.be.equal(`
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
            <time datetime="29 8">
              Mo. 29.08.2022
            </time>
            ,
            <time>
              <span class="sbb-screenreaderonly">
                Travel time 1 Hour
              </span>
              <span aria-hidden="true">
                1 h
              </span>
            </time>
          </div>
          <sbb-pearl-chain-time data-now="1661806800000"></sbb-pearl-chain-time>
        </div>
      </div>
    `);
  });

  it('renders without vias', async () => {
    const root = (await fixture(
      html` <sbb-journey-summary data-now="${now}"></sbb-journey-summary>`,
    )) as SbbJourneySummary;
    root.trip = dataWithoutVia;

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-journey-summary data-now="1661806800000">
      </sbb-journey-summary>`);
    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-journey-summary">
        <div>
          <div class="sbb-journey-summary__date">
            <time datetime="29 8">
              Mo. 29.08.2022
            </time>
            ,
            <time>
              <span class="sbb-screenreaderonly">
                Travel time 1 Hour 40 Minutes
              </span>
              <span aria-hidden="true">
                1 h 40 min
              </span>
            </time>
          </div>
          <sbb-pearl-chain-time data-now="1661806800000"></sbb-pearl-chain-time>
        </div>
      </div>
    `);
  });

  it('renders with second journey', async () => {
    const root = (await fixture(
      html` <sbb-journey-summary data-now="${now}"></sbb-journey-summary>`,
    )) as SbbJourneySummary;
    root.trip = dataWithoutVia;
    root.tripBack = data;
    root.roundTrip = true;

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-journey-summary data-now="1661806800000">
      </sbb-journey-summary>`);
    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-journey-summary">
        <div>
          <div class="sbb-journey-summary__date">
            <time datetime="29 8">
              Mo. 29.08.2022
            </time>
            ,
            <time>
              <span class="sbb-screenreaderonly">
                Travel time 1 Hour 40 Minutes
              </span>
              <span aria-hidden="true">
                1 h 40 min
              </span>
            </time>
          </div>
          <sbb-pearl-chain-time data-now="1661806800000"></sbb-pearl-chain-time>
        </div>
        <div>
          <sbb-divider class="sbb-journey-summary__divider" role="separator" orientation="horizontal" aria-orientation="horizontal"></sbb-divider>
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
              <time datetime="29 8">
                Mo. 29.08.2022
              </time>
              ,
              <time>
                <span class="sbb-screenreaderonly">
                  Travel time 1 Hour
                </span>
                <span aria-hidden="true">
                  1 h
                </span>
              </time>
            </div>
            <sbb-pearl-chain-time data-now="1661806800000"></sbb-pearl-chain-time>
          </div>
        </div>
      </div>
    `);
  });
});
