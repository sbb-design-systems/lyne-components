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
          <button>
            <sbb-icon name="chevron-small-left-small" />
          </button>
        </mock:shadow-root>
      </sbb-datepicker-previous-day>
    `);
  });

  it('renders disabled with datepicker disabled', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbFormField, SbbDatepicker, SbbDatepickerPreviousDay],
      html: `
        <sbb-form-field>
          <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          <sbb-datepicker disabled="true"></sbb-datepicker>
        </sbb-form-field>
      `,
    });

    const element: HTMLSbbDatepickerPreviousDayElement = page.doc.querySelector(
      'sbb-datepicker-previous-day'
    );
    const button: HTMLButtonElement = element.shadowRoot.querySelector('button');
    expect(button).toHaveAttribute('disabled');
  });

  it('renders disabled with datepicker readonly', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbFormField, SbbDatepicker, SbbDatepickerPreviousDay],
      html: `
        <sbb-form-field>
          <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          <sbb-datepicker readonly="true"></sbb-datepicker>
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
