import { SbbTimetableButton } from './sbb-timetable-button';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-timetable-button', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbTimetableButton],
      html: '<sbb-timetable-button/>'
    });

    expect(root)
      .toEqualHtml(`
        <sbb-timetable-button>
          <mock:shadow-root>
            <button
                class="button button--earlier-connections"
                dir="ltr"
                type="button"
            >
                <div class="button__inner_wrapper">
                    Earlier connections
                </div>
            </button>
          </mock:shadow-root>
        </sbb-timetable-button>
      `);
  });

});
