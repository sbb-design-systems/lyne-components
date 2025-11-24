import { expect } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import type {
  InterfaceSbbJourneySummaryAttributes,
  SbbJourneySummaryElement,
} from './journey-summary.component.ts';

import './journey-summary.component.ts';

const now = '2022-08-29T21:00:00Z';

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

describe(`sbb-journey-summary`, () => {
  let root: SbbJourneySummaryElement;

  describe('renders', () => {
    beforeEach(async () => {
      root = await fixture(
        html`<sbb-journey-summary .now=${now} .trip=${data}></sbb-journey-summary>`,
      );
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders without vias', () => {
    beforeEach(async () => {
      root = await fixture(
        html`<sbb-journey-summary .now=${now} .trip=${dataWithoutVia}></sbb-journey-summary>`,
      );
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with second journey', () => {
    beforeEach(async () => {
      root = await fixture(html`
        <sbb-journey-summary
          .now=${now}
          .trip=${dataWithoutVia}
          .tripBack=${data}
          round-trip
        ></sbb-journey-summary>
      `);
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });
});
