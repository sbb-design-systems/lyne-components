import { SbbTimetableOccupancy } from './sbb-timetable-occupancy';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { occupancySampleData } from './sbb-timetable-occupancy.sample-data';

describe('sbb-timetable-occupancy', () => {
  it('renders', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbTimetableOccupancy],
      html: `<sbb-timetable-occupancy></sbb-timetable-occupancy>`,
    });
    await page.waitForChanges();

    const element: HTMLSbbTimetableOccupancyElement =
      page.doc.querySelector('sbb-timetable-occupancy');
    element.occupancy = occupancySampleData[9];
    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <sbb-timetable-occupancy>
        <mock:shadow-root>
          <ul class="sbb-timetable-occupancy" role="list">
            <li>
              <span aria-hidden="true">
                1.
              </span>
              <sbb-icon class="sbb-timetable-occupancy__item" name="utilization-high"></sbb-icon>
              <sbb-icon class="sbb-timetable-occupancy__item--negative" name="utilization-high-negative"></sbb-icon>
              <sbb-icon class="sbb-timetable-occupancy__item--high-contrast" name="utilization-high-high-contrast"></sbb-icon>
              <span class="sbb-timetable-occupancy--visually-hidden">
                First Class Very high occupancy expected.
              </span>
            </li>
            <li>
              <span aria-hidden="true">
                2.
              </span>
              <sbb-icon class="sbb-timetable-occupancy__item" name="utilization-high"></sbb-icon>
              <sbb-icon class="sbb-timetable-occupancy__item--negative" name="utilization-high-negative"></sbb-icon>
              <sbb-icon class="sbb-timetable-occupancy__item--high-contrast" name="utilization-high-high-contrast"></sbb-icon>
              <span class="sbb-timetable-occupancy--visually-hidden">
                First Class Very high occupancy expected.
              </span>
            </li>
          </ul>
        </mock:shadow-root>
      </sbb-timetable-occupancy>
    `);
  });
});
