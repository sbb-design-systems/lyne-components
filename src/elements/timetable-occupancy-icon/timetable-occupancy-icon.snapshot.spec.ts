import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.ts';

import type { SbbTimetableOccupancyIconElement } from './timetable-occupancy-icon.component.ts';

import './timetable-occupancy-icon.component.ts';

describe(`sbb-timetable-occupancy-icon`, () => {
  let element: SbbTimetableOccupancyIconElement;

  describe('renders with high occupancy', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-timetable-occupancy-icon occupancy="high"></sbb-timetable-occupancy-icon>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with none occupancy in negative mode', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-timetable-occupancy-icon
          occupancy="none"
          negative
        ></sbb-timetable-occupancy-icon>`,
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
