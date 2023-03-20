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
      <sbb-datepicker-previous-day slot="prefix">
        <mock:shadow-root>
          <div class="sbb-datepicker-previous-day">
            <button aria-label="Previous day" class="sbb-datepicker-previous-day__button" type="button">
              <sbb-icon name="chevron-small-left-small" />
            </button>
          </div>
        </mock:shadow-root>
      </sbb-datepicker-previous-day>
    `);
  });

  it('renders with datepicker and input disabled', async () => {
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
    const button: HTMLButtonElement = element.shadowRoot.querySelector('button');
    expect(button).toHaveAttribute('disabled');
  });

  it('renders with datepicker and input readonly', async () => {
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
    const button: HTMLButtonElement = element.shadowRoot.querySelector('button');
    expect(button).toHaveAttribute('disabled');
  });
});
