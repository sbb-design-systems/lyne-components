import { LyneTimetableButton } from './lyne-timetable-button';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-timetable-button', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableButton],
      html: '<lyne-timetable-button/>'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-button>
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
        </lyne-timetable-button>
      `);
  });

});
