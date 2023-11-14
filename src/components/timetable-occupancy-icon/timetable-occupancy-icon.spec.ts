import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './timetable-occupancy-icon';

describe('sbb-timetable-occupancy-icon', () => {
  it('renders with high occupancy', async () => {
    const root = await fixture(
      html`<sbb-timetable-occupancy-icon occupancy="high"></sbb-timetable-occupancy-icon>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-timetable-occupancy-icon
        aria-hidden="false"
        aria-label="Very high occupancy expected."
        data-namespace="default"
        name="utilization-high"
        occupancy="high"
        role="img">
      </sbb-timetable-occupancy-icon>
      `);

    expect(root).shadowDom.to.be.equal(`<span class="sbb-icon-inner"></span>`);
  });

  it('renders with none occupancy in negative mode', async () => {
    const root = await fixture(
      html`<sbb-timetable-occupancy-icon occupancy="none" negative></sbb-timetable-occupancy-icon>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-timetable-occupancy-icon
        aria-hidden="false"
        aria-label="No occupancy forecast available."
        data-namespace="default"
        name="utilization-none-negative"
        occupancy="none"
        negative
        role="img">
      </sbb-timetable-occupancy-icon>`);

    expect(root).shadowDom.to.be.equal(`<span class="sbb-icon-inner"></span>`);
  });
});
