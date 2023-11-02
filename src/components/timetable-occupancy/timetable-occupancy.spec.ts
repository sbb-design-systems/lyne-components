import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';

import type { SbbTimetableOccupancy } from './timetable-occupancy';
import { occupancySampleData } from './timetable-occupancy.sample-data';
import './timetable-occupancy';

describe('sbb-timetable-occupancy', () => {
  it('renders', async () => {
    const element: SbbTimetableOccupancy = await fixture(html`
      <sbb-timetable-occupancy></sbb-timetable-occupancy>
    `);

    await waitForLitRender(element);
    element.occupancy = occupancySampleData[9];
    await waitForLitRender(element);

    expect(element).dom.to.be.equal(`<sbb-timetable-occupancy></sbb-timetable-occupancy>`);
    expect(element).shadowDom.to.be.equal(`
      <ul class="sbb-timetable-occupancy__list" role="list">
        <li class="sbb-timetable-occupancy__list-item">
          <span aria-hidden="true" class="sbb-timetable-occupancy__list-item-class">
            1.
          </span>
          <span class="sbb-timetable-occupancy__visually-hidden">
            First Class.
          </span>
          <sbb-timetable-occupancy-icon
            class="sbb-timetable-occupancy__list-item-icon"
            occupancy="HIGH"
          >
          </sbb-timetable-occupancy-icon>
        </li>
        <li class="sbb-timetable-occupancy__list-item">
          <span aria-hidden="true" class="sbb-timetable-occupancy__list-item-class">
            2.
          </span>
          <span class="sbb-timetable-occupancy__visually-hidden">
            Second Class.
          </span>
          <sbb-timetable-occupancy-icon
            class="sbb-timetable-occupancy__list-item-icon"
            occupancy="HIGH"
          >
          </sbb-timetable-occupancy-icon>
        </li>
      </ul>
    `);
  });

  it('renders negative', async () => {
    const element: SbbTimetableOccupancy = await fixture(html`
      <sbb-timetable-occupancy negative></sbb-timetable-occupancy>
    `);

    await waitForLitRender(element);
    element.occupancy = occupancySampleData[5];
    await waitForLitRender(element);

    expect(element).dom.to.be.equal(`<sbb-timetable-occupancy negative></sbb-timetable-occupancy>`);
    expect(element).shadowDom.to.be.equal(`
      <ul class="sbb-timetable-occupancy__list" role="list">
        <li class="sbb-timetable-occupancy__list-item">
          <span aria-hidden="true" class="sbb-timetable-occupancy__list-item-class">
            1.
          </span>
          <span class="sbb-timetable-occupancy__visually-hidden">
            First Class.
          </span>
          <sbb-timetable-occupancy-icon
            class="sbb-timetable-occupancy__list-item-icon"
            negative=""
            occupancy="LOW"
          >
          </sbb-timetable-occupancy-icon>
        </li>
        <li class="sbb-timetable-occupancy__list-item">
          <span aria-hidden="true" class="sbb-timetable-occupancy__list-item-class">
            2.
          </span>
          <span class="sbb-timetable-occupancy__visually-hidden">
            Second Class.
          </span>
          <sbb-timetable-occupancy-icon
            class="sbb-timetable-occupancy__list-item-icon"
            negative=""
            occupancy="MEDIUM"
          >
          </sbb-timetable-occupancy-icon>
        </li>
      </ul>
    `);
  });
});
