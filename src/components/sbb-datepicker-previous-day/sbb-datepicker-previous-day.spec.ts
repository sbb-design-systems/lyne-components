import { SbbDatepickerPreviousDay } from './sbb-datepicker-previous-day';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-datepicker-previous-day', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDatepickerPreviousDay],
      html: '<sbb-datepicker-previous-day />',
    });

    expect(root).toEqualHtml(`
        <sbb-datepicker-previous-day>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-datepicker-previous-day>
      `);
  });
});
