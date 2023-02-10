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

  it('renders disabled required with value', async () => {
    const { root } = await newSpecPage({
      components: [SbbDatepicker],
      html: '<sbb-datepicker disabled="true" required="true" value="10-02-2023"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-datepicker disabled="" required="true" value="10-02-2023">
        <mock:shadow-root>
          <input maxlength="10" disabled="" required="" value="10.02.2023" placeholder="DD.MM.YYYY" type="text">
        </mock:shadow-root>
      </sbb-datepicker>
    `);
  });

  it('renders readonly with form', async () => {
    const { root } = await newSpecPage({
      components: [SbbDatepicker],
      html: '<sbb-datepicker readonly="true" form="form" accessibility-label="label"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-datepicker readonly="true" form="form" accessibility-label="label">
        <mock:shadow-root>
          <input maxlength="10" readonly="" form="form" placeholder="DD.MM.YYYY" type="text" aria-label="label">
        </mock:shadow-root>
      </sbb-datepicker>
    `);
  });
});
