import { SbbDatepicker } from './sbb-datepicker';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-datepicker', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDatepicker],
      html: '<sbb-datepicker />',
    });

    expect(root).toEqualHtml(`
      <sbb-datepicker>
        <mock:shadow-root>
          <input maxlength="10" placeholder="DD.MM.YYYY" type="text">
        </mock:shadow-root>
      </sbb-datepicker>
    `);
  });
});
