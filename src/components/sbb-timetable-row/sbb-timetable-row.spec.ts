import { SbbTimetableRow } from './sbb-timetable-row';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-timetable-row', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTimetableRow],
      html: `<sbb-timetable-row role="row"/>`,
    });

    expect(root).toEqualHtml(`
        <sbb-timetable-row role="row">
          <mock:shadow-root>
            <div class="timetable__row" role="row">
              <slot name="badge"></slot>
                <div class="timetable__row-header" role="rowheader">
                  <slot name="pictogram"></slot>
                  <slot name="transportNumber">
                    <span></span>
                  </slot>
                  <slot name="direction"></slot>
                </div>
              <div class="timetable__row-body" role="gridcell">
                <slot name="walkTimeBefore"></slot>
                <slot name="leftTime"></slot>
                <slot name="pearlChain"></slot>
                <slot name="rightTime"></slot>
                <slot name="walkTimeAfter"></slot>
              </div>

              <div class="timetable__row-footer" role="gridcell">
                <slot name="plattform"></slot>
                <ul class="timetable__row-occupancy">
                  <li>
                    <slot name="occupancyFirstClass">
                      1.
                      <sbb-icon name="walk-small"></sbb-icon>
                    </slot>
                  </li>
                  <li>
                    <slot name="occupancySecondClass">
                      2.
                      <sbb-icon name="walk-small"></sbb-icon>
                    </slot>
                  </li>
                </ul>
                <slot name="travelHints"></slot>
                <slot name="duration"></slot>
                <slot name="warning"></slot>
              </div>
          </mock:shadow-root>
        </sbb-timetable-row>
      `);
  });

  describe('sbb-timetable-row loading state', () => {
    it('renders in loading state', async () => {
      const { root } = await newSpecPage({
        components: [SbbTimetableRow],
        html: `<sbb-timetable-row loading=""/>`,
      });

      expect(root).toEqualHtml(`
          <sbb-timetable-row loading="">
            <mock:shadow-root>
              <div class="loading">
                <span class="loading__badge"></span>
                <div class="loading__row"></div>
                <div class="loading__row"></div>
                <div class="loading__row"></div>
              </div>
            </mock:shadow-root>
          </sbb-timetable-row>
        `);
    });
  });
});
