import { SbbDatepickerPreviousDay } from './sbb-datepicker-previous-day';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { SbbFormField } from '../sbb-form-field/sbb-form-field';
import { SbbDatepicker } from '../sbb-datepicker/sbb-datepicker';

describe('sbb-datepicker-previous-day', () => {
  it('renders', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbDatepickerPreviousDay],
      html: '<sbb-datepicker-previous-day />',
    });

    expect(page.root).toEqualHtml(`
      <sbb-datepicker-previous-day slot="prefix" aria-label="Previous day" dir="ltr" role="button" slot="prefix" tabindex="0">
        <mock:shadow-root>
          <span class="sbb-datepicker-previous-day">
            <sbb-icon name="chevron-small-left-small" />
          </span>
        </mock:shadow-root>
      </sbb-datepicker-previous-day>
    `);
  });

  it.skip('renders with datepicker and input disabled', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbFormField, SbbDatepicker, SbbDatepickerPreviousDay],
      html: `
        <sbb-form-field>
          <input disabled="">
          <sbb-datepicker></sbb-datepicker>
          <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
        </sbb-form-field>
      `,
    });

    const element: HTMLSbbDatepickerPreviousDayElement = page.doc.querySelector(
      'sbb-datepicker-previous-day'
    );
    expect(element).toHaveAttribute('disabled');
  });

  it.skip('renders with datepicker and input readonly', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbFormField, SbbDatepicker, SbbDatepickerPreviousDay],
      html: `
        <sbb-form-field>
          <input readonly="">
          <sbb-datepicker></sbb-datepicker>
          <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
        </sbb-form-field>
      `,
    });

    const element: HTMLSbbDatepickerPreviousDayElement = page.doc.querySelector(
      'sbb-datepicker-previous-day'
    );
    expect(element).toHaveAttribute('disabled');
  });
});
