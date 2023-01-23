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
            <button class="some-class">A</button>
          </mock:shadow-root>
        </sbb-datepicker>
      `);
  });
});
