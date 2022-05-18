import { LyneTimetable } from './lyne-timetable';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-timetable', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetable],
      html: '<lyne-timetable />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable>
          <mock:shadow-root>
            <div class="timetable-wrapper">
                <lyne-timetable-button appearance="earlier-connections"></lyne-timetable-button>
                    <div class="timetable" role="grid">
                        <slot></slot>
                    </div>
                <lyne-timetable-button appearance="later-connections"></lyne-timetable-button>
            </div>
          </mock:shadow-root>
        </lyne-timetable>
      `);
  });

});
