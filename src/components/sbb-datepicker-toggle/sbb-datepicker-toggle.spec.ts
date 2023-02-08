import { SbbDatepickerToggle } from './sbb-datepicker-toggle';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-datepicker-toggle', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDatepickerToggle],
      html: '<sbb-datepicker-toggle />',
    });

    expect(root).toEqualHtml(`
        <sbb-datepicker-toggle>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-datepicker-toggle>
      `);
  });
});
