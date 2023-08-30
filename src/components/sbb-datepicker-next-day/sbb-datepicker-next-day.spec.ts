import { SbbDatepickerNextDay } from './sbb-datepicker-next-day';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { SbbFormField } from '../sbb-form-field/sbb-form-field';
import { SbbDatepicker } from '../sbb-datepicker/sbb-datepicker';

describe('sbb-datepicker-next-day', () => {
  it('renders', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbDatepickerNextDay],
      html: '<sbb-datepicker-next-day />',
    });

    expect(page.root).toEqualHtml(`
      <sbb-datepicker-next-day dir="ltr" role="button" slot="suffix" tabindex="0">
        <mock:shadow-root>
          <span class="sbb-datepicker-next-day">
            <sbb-icon name="chevron-small-right-small" />
          </span>
        </mock:shadow-root>
      </sbb-datepicker-next-day>
    `);
  });

  it('renders with datepicker and input disabled', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbFormField, SbbDatepicker, SbbDatepickerNextDay],
      html: `
        <sbb-form-field>
          <input disabled="">
          <sbb-datepicker></sbb-datepicker>
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
        </sbb-form-field>
      `,
    });

    const element: HTMLSbbDatepickerNextDayElement =
      page.doc.querySelector('sbb-datepicker-next-day');
    expect(element).toHaveAttribute('data-disabled');
  });

  it('renders with datepicker and input readonly', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbFormField, SbbDatepicker, SbbDatepickerNextDay],
      html: `
        <sbb-form-field>
          <input readonly="">
          <sbb-datepicker></sbb-datepicker>
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
        </sbb-form-field>
      `,
    });

    const element: HTMLSbbDatepickerNextDayElement =
      page.doc.querySelector('sbb-datepicker-next-day');
    expect(element).toHaveAttribute('data-disabled');
  });
});
