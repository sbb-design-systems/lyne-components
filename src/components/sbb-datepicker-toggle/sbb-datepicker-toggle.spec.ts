import { SbbDatepickerToggle } from './sbb-datepicker-toggle';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { SbbFormField } from '../sbb-form-field/sbb-form-field';
import { SbbDatepicker } from '../sbb-datepicker/sbb-datepicker';

describe('sbb-datepicker-toggle', () => {
  it('renders', async () => {
    const page: SpecPage = await newSpecPage({
      components: [SbbDatepickerToggle],
      html: '<sbb-datepicker-toggle />',
    });

    expect(page.root).toEqualHtml(`
      <sbb-datepicker-toggle slot="prefix">
        <mock:shadow-root>
          <sbb-tooltip-trigger aria-label="Show calendar" iconName="calendar-small" disabled=""></sbb-tooltip-trigger>
          <sbb-tooltip data-hide-close-button="">
            <sbb-calendar></sbb-calendar>
          </sbb-tooltip>
        </mock:shadow-root>
      </sbb-datepicker-toggle>
    `);
  });

  describe('renders in form-field', () => {
    it('renders in form-field', async () => {
      const page: SpecPage = await newSpecPage({
        components: [SbbFormField, SbbDatepicker, SbbDatepickerToggle],
        html: `
          <sbb-form-field>
            <sbb-datepicker-toggle></sbb-datepicker-toggle>
            <sbb-datepicker></sbb-datepicker>
            <input/>
          </sbb-form-field>
        `,
      });
      const element: HTMLSbbDatepickerToggleElement =
        page.doc.querySelector('sbb-datepicker-toggle');
      expect(element).toEqualHtml(`
        <sbb-datepicker-toggle slot="prefix">
          <mock:shadow-root>
            <sbb-tooltip-trigger aria-label="Show calendar" iconName="calendar-small"></sbb-tooltip-trigger>
            <sbb-tooltip data-hide-close-button="">
              <sbb-calendar max="" min=""></sbb-calendar>
            </sbb-tooltip>
          </mock:shadow-root>
        </sbb-datepicker-toggle>
      `);
    });

    it('renders in disabled form-field', async () => {
      const page = await newSpecPage({
        components: [SbbFormField, SbbDatepicker, SbbDatepickerToggle],
        html: `
          <sbb-form-field>
            <sbb-datepicker-toggle></sbb-datepicker-toggle>
            <sbb-datepicker></sbb-datepicker>
            <input disabled/>
          </sbb-form-field>
        `,
      });
      const element: HTMLSbbDatepickerToggleElement =
        page.doc.querySelector('sbb-datepicker-toggle');
      expect(element).toEqualHtml(`
        <sbb-datepicker-toggle slot="prefix">
          <mock:shadow-root>
            <sbb-tooltip-trigger aria-label="Show calendar" iconName="calendar-small" disabled=""></sbb-tooltip-trigger>
            <sbb-tooltip data-hide-close-button="">
              <sbb-calendar max="" min=""></sbb-calendar>
            </sbb-tooltip>
          </mock:shadow-root>
        </sbb-datepicker-toggle>
      `);
    });

    it('renders in form-field with calendar parameters', async () => {
      const page = await newSpecPage({
        components: [SbbFormField, SbbDatepicker, SbbDatepickerToggle],
        html: `
          <sbb-form-field>
            <sbb-datepicker-toggle></sbb-datepicker-toggle>
            <sbb-datepicker wide="true"></sbb-datepicker>
            <input min="1600000000" max="1700000000"/>
          </sbb-form-field>
        `,
      });
      const element: HTMLSbbDatepickerToggleElement =
        page.doc.querySelector('sbb-datepicker-toggle');
      expect(element).toEqualHtml(`
        <sbb-datepicker-toggle slot="prefix">
          <mock:shadow-root>
            <sbb-tooltip-trigger aria-label="Show calendar" iconName="calendar-small"></sbb-tooltip-trigger>
            <sbb-tooltip data-hide-close-button="">
              <sbb-calendar min="1600000000" max="1700000000" wide=""></sbb-calendar>
            </sbb-tooltip>
          </mock:shadow-root>
        </sbb-datepicker-toggle>
      `);
    });
  });
});
