import { SbbDatepickerNextDay } from './sbb-datepicker-next-day';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-datepicker-next-day', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDatepickerNextDay],
      html: '<sbb-datepicker-next-day />',
    });

    expect(root).toEqualHtml(`
        <sbb-datepicker-next-day>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-datepicker-next-day>
      `);
  });
});
