import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './timetable-occupancy-icon';

describe('sbb-timetable-occupancy-icon', () => {
  it('renders with high occupancy', async () => {
    const root = await fixture(
      html`<sbb-timetable-occupancy-icon occupancy="HIGH"></sbb-timetable-occupancy-icon>`,
    );

    expect(root).dom.to.be.equal(
      `<sbb-timetable-occupancy-icon occupancy='HIGH'></sbb-timetable-occupancy-icon>`,
    );

    expect(root).shadowDom.to.be.equal(`
      <sbb-icon aria-hidden="true" data-namespace="default" name="utilization-high" role="img"></sbb-icon>
      <span class="sbb-timetable-occupancy-icon--visually-hidden">
        Very high occupancy expected
      </span>
    `);
  });

  it('renders with unknown occupancy in negative mode', async () => {
    const root = await fixture(
      html`<sbb-timetable-occupancy-icon
        occupancy="UNKNOWN"
        negative=""
      ></sbb-timetable-occupancy-icon>`,
    );

    expect(root).dom.to.be.equal(
      `<sbb-timetable-occupancy-icon occupancy='UNKNOWN' negative=''></sbb-timetable-occupancy-icon>`,
    );

    expect(root).shadowDom.to.be.equal(`
      <sbb-icon aria-hidden="true" data-namespace="default" name="utilization-none-negative" role="img"></sbb-icon>
      <span class="sbb-timetable-occupancy-icon--visually-hidden">
        No occupancy forecast available
      </span>
    `);
  });
});
