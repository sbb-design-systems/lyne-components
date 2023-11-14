import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { SbbTimetableOccupancy } from './timetable-occupancy';
import './timetable-occupancy';

describe('sbb-timetable-occupancy', () => {
  it('renders', async () => {
    const element: SbbTimetableOccupancy = await fixture(html`
      <sbb-timetable-occupancy
        first-class-occupancy="high"
        second-class-occupancy="high"
      ></sbb-timetable-occupancy>
    `);

    expect(element).dom.to.be.equal(
      `<sbb-timetable-occupancy first-class-occupancy="high" second-class-occupancy="high"></sbb-timetable-occupancy>`,
    );
    expect(element).shadowDom.to.be.equal(`
      <ul class="sbb-timetable-occupancy__list">
        <li class="sbb-timetable-occupancy__list-item">
          <span aria-hidden="true" class="sbb-timetable-occupancy__list-item-wagon">
            1.
          </span>
          <span class="sbb-timetable-occupancy__visually-hidden">
            First Class.
          </span>
          <sbb-timetable-occupancy-icon
            aria-hidden="false"
            aria-label="Very high occupancy expected."
            class="sbb-timetable-occupancy__list-item-icon"
            data-namespace='default'
            name='utilization-high'
            role='img'
          >
          </sbb-timetable-occupancy-icon>
        </li>
        <li class="sbb-timetable-occupancy__list-item">
          <span aria-hidden="true" class="sbb-timetable-occupancy__list-item-wagon">
            2.
          </span>
          <span class="sbb-timetable-occupancy__visually-hidden">
            Second Class.
          </span>
          <sbb-timetable-occupancy-icon
            aria-hidden="false"
            aria-label="Very high occupancy expected."
            class="sbb-timetable-occupancy__list-item-icon"
            data-namespace='default'
            name='utilization-high'
            role='img'
          >
          </sbb-timetable-occupancy-icon>
        </li>
      </ul>
    `);
  });

  it('renders negative', async () => {
    const element: SbbTimetableOccupancy = await fixture(html`
      <sbb-timetable-occupancy
        negative
        first-class-occupancy="low"
        second-class-occupancy="medium"
      ></sbb-timetable-occupancy>
    `);

    expect(element).dom.to.be.equal(
      `<sbb-timetable-occupancy negative first-class-occupancy="low" second-class-occupancy="medium"></sbb-timetable-occupancy>`,
    );
    expect(element).shadowDom.to.be.equal(`
      <ul class="sbb-timetable-occupancy__list">
        <li class="sbb-timetable-occupancy__list-item">
          <span aria-hidden="true" class="sbb-timetable-occupancy__list-item-wagon">
            1.
          </span>
          <span class="sbb-timetable-occupancy__visually-hidden">
            First Class.
          </span>
          <sbb-timetable-occupancy-icon
            aria-hidden="false"
            aria-label="Low to medium occupancy expected."
            class="sbb-timetable-occupancy__list-item-icon"
            data-namespace='default'
            name='utilization-low-negative'
            negative=''
            role='img'
          >
          </sbb-timetable-occupancy-icon>
        </li>
        <li class="sbb-timetable-occupancy__list-item">
          <span aria-hidden="true" class="sbb-timetable-occupancy__list-item-wagon">
            2.
          </span>
          <span class="sbb-timetable-occupancy__visually-hidden">
            Second Class.
          </span>
          <sbb-timetable-occupancy-icon
            aria-hidden="false"
            aria-label="High occupancy expected."
            class="sbb-timetable-occupancy__list-item-icon"
            data-namespace='default'
            name='utilization-medium-negative'
            negative=''
            role='img'
          >
          </sbb-timetable-occupancy-icon>
        </li>
      </ul>
    `);
  });

  it('renders only first class wagon', async () => {
    const element: SbbTimetableOccupancy = await fixture(html`
      <sbb-timetable-occupancy first-class-occupancy="low"></sbb-timetable-occupancy>
    `);

    expect(element).dom.to.be.equal(
      `<sbb-timetable-occupancy first-class-occupancy="low"></sbb-timetable-occupancy>`,
    );
    expect(element).shadowDom.to.be.equal(`
      <ul class="sbb-timetable-occupancy__list" role="presentation">
        <li class="sbb-timetable-occupancy__list-item">
          <span aria-hidden="true" class="sbb-timetable-occupancy__list-item-wagon">
            1.
          </span>
          <span class="sbb-timetable-occupancy__visually-hidden">
            First Class.
          </span>
          <sbb-timetable-occupancy-icon
            aria-hidden="false"
            aria-label="Low to medium occupancy expected."
            class="sbb-timetable-occupancy__list-item-icon"
            data-namespace='default'
            name='utilization-low'
            role='img'
          >
          </sbb-timetable-occupancy-icon>
        </li>
      </ul>
    `);
  });

  it('renders only second class wagon', async () => {
    const element: SbbTimetableOccupancy = await fixture(html`
      <sbb-timetable-occupancy second-class-occupancy="medium"></sbb-timetable-occupancy>
    `);

    expect(element).dom.to.be.equal(
      `<sbb-timetable-occupancy second-class-occupancy="medium"></sbb-timetable-occupancy>`,
    );
    expect(element).shadowDom.to.be.equal(`
      <ul class="sbb-timetable-occupancy__list" role="presentation">
        <li class="sbb-timetable-occupancy__list-item">
          <span aria-hidden="true" class="sbb-timetable-occupancy__list-item-wagon">
            2.
          </span>
          <span class="sbb-timetable-occupancy__visually-hidden">
            Second Class.
          </span>
          <sbb-timetable-occupancy-icon
            aria-hidden="false"
            aria-label="High occupancy expected."
            class="sbb-timetable-occupancy__list-item-icon"
            data-namespace='default'
            name='utilization-medium'
            role='img'
          >
          </sbb-timetable-occupancy-icon>
        </li>
      </ul>
    `);
  });
});
