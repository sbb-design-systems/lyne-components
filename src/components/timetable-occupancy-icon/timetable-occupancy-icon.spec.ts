import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './timetable-occupancy-icon';

describe('sbb-timetable-occupancy-icon', () => {
  it('renders with high occupancy', async () => {
    const root = await fixture(
      html`<sbb-timetable-occupancy-icon occupancy="HIGH"></sbb-timetable-occupancy-icon>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-timetable-occupancy-icon
        aria-hidden="false"
        aria-label="Very high occupancy expected."
        data-namespace="default"
        name="utilization-high"
        occupancy="HIGH"
        role="img">
      </sbb-timetable-occupancy-icon>
      `);

    expect(root).shadowDom.to.be.equal(`<span class="sbb-icon-inner"></span>`);
  });

  it('renders with unknown occupancy in negative mode', async () => {
    const root = await fixture(
      html`<sbb-timetable-occupancy-icon
        occupancy="UNKNOWN"
        negative=""
      ></sbb-timetable-occupancy-icon>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-timetable-occupancy-icon
        aria-hidden="false"
        aria-label="No occupancy forecast available."
        data-namespace="default"
        name="utilization-none-negative"
        occupancy="UNKNOWN"
        negative=''
        role="img">
      </sbb-timetable-occupancy-icon>`);

    expect(root).shadowDom.to.be.equal(`<span class="sbb-icon-inner"></span>`);
  });
});
