import { SbbTimetable } from './sbb-timetable';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-timetable', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTimetable],
      html: '<sbb-timetable />',
    });

    expect(root).toEqualHtml(`
        <sbb-timetable>
          <mock:shadow-root>
            <div class="timetable-wrapper">
                <sbb-timetable-button appearance="earlier-connections"></sbb-timetable-button>
                    <div class="timetable" role="grid">
                        <slot></slot>
                    </div>
                <sbb-timetable-button appearance="later-connections"></sbb-timetable-button>
            </div>
          </mock:shadow-root>
        </sbb-timetable>
      `);
  });
});
