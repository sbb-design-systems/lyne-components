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
            <slot></slot>
          </mock:shadow-root>
        </lyne-timetable>
      `);
  });

});
