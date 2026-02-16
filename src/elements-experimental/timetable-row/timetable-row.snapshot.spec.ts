import { expect } from '@open-wc/testing';
import { fixture, testA11yTreeSnapshot } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import type { SbbTimetableRowElement } from './timetable-row.component.ts';
import {
  accessLegTrip,
  busTrip,
  defaultTrip,
  trainTrip,
} from './timetable-row.sample-data.private.ts';

import './timetable-row.component.ts';

const now = '2022-08-16T15:00:00Z';

describe(`sbb-timetable-row`, () => {
  let element: SbbTimetableRowElement;

  describe('renders defaultTrip', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-timetable-row .now=${now} .trip=${defaultTrip}></sbb-timetable-row>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders platform', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-timetable-row .now=${now} .trip=${trainTrip}></sbb-timetable-row>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders bus strip', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-timetable-row .now=${now} .trip=${busTrip}></sbb-timetable-row>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders trip with access leg', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-timetable-row .now=${now} .trip=${accessLegTrip}></sbb-timetable-row>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders loading state', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-timetable-row
          loading-trip
          a11y-footpath
          loading-price
          .now=${now}
        ></sbb-timetable-row>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
