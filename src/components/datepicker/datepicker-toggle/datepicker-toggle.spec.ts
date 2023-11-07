import { SbbDatepickerToggle } from './datepicker-toggle';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbFormField } from '../../form-field';

import './datepicker-toggle';
import '../datepicker';
import '../../form-field';

describe('sbb-datepicker-toggle', () => {
  it('renders', async () => {
    const page = await fixture(html`<sbb-datepicker-toggle></sbb-datepicker-toggle>`);

    expect(page).dom.to.equal(`<sbb-datepicker-toggle slot="prefix"></sbb-datepicker-toggle>`);
    expect(page).shadowDom.to.equal(`
      <sbb-tooltip-trigger
        aria-label="Show calendar"
        aria-controls="sbb-tooltip-1"
        aria-expanded="false"
        aria-haspopup="dialog"
        dir="ltr"
        aria-disabled="true"
        icon-name="calendar-small"
        role="button"
        disabled=""
        data-icon-small=""
      ></sbb-tooltip-trigger>
      <sbb-tooltip
        hide-close-button=""
        data-state="closed"
        hide-close-button=""
        id="sbb-tooltip-1"
        role="tooltip"
      >
        <sbb-calendar></sbb-calendar>
      </sbb-tooltip>
    `);
  });

  describe('renders in form-field', () => {
    it('renders in form-field', async () => {
      const page: SbbFormField = await fixture(html`
        <sbb-form-field>
          <sbb-datepicker-toggle></sbb-datepicker-toggle>
          <sbb-datepicker></sbb-datepicker>
          <input />
        </sbb-form-field>
      `);
      const element: SbbDatepickerToggle = page.querySelector('sbb-datepicker-toggle');
      expect(element).dom.to.be.equal(
        `<sbb-datepicker-toggle slot="prefix"></sbb-datepicker-toggle>`,
      );
      expect(element).shadowDom.to.be.equal(
        `
          <sbb-tooltip-trigger
            tabindex="0"
            aria-label="Show calendar"
            dir="ltr"
            aria-haspopup="dialog"
            aria-expanded="false"
            icon-name="calendar-small"
            data-icon-small=""
            role="button"
            aria-controls="sbb-tooltip-4"
          ></sbb-tooltip-trigger>
            <sbb-tooltip
              hide-close-button=""
              data-state="closed"
              id="sbb-tooltip-4"
              role="tooltip"
            >
              <sbb-calendar></sbb-calendar>
            </sbb-tooltip>
          `,
      );
    });

    it('renders in disabled form-field', async () => {
      const page: SbbFormField = await fixture(html`
        <sbb-form-field>
          <sbb-datepicker-toggle></sbb-datepicker-toggle>
          <sbb-datepicker></sbb-datepicker>
          <input disabled />
        </sbb-form-field>
      `);
      const element: SbbDatepickerToggle = page.querySelector('sbb-datepicker-toggle');
      expect(element).dom.to.be.equal(
        `<sbb-datepicker-toggle slot="prefix"></sbb-datepicker-toggle>`,
      );
      expect(element).shadowDom.to.be.equal(
        `
          <sbb-tooltip-trigger
            aria-label="Show calendar"
            aria-controls="sbb-tooltip-7"
            aria-disabled="true"
            aria-expanded="false"
            aria-haspopup="dialog"
            disabled=""
            dir="ltr"
            icon-name="calendar-small"
            role="button"
            data-icon-small=""
          ></sbb-tooltip-trigger>
          <sbb-tooltip
            data-state="closed"
            id="sbb-tooltip-7"
            hide-close-button=""
            role="tooltip"
          >
            <sbb-calendar></sbb-calendar>
          </sbb-tooltip>
        `,
      );
    });

    it('renders in form-field with calendar parameters', async () => {
      const page = await fixture(html`
        <sbb-form-field>
          <sbb-datepicker-toggle></sbb-datepicker-toggle>
          <sbb-datepicker wide></sbb-datepicker>
          <input min="1600000000" max="1700000000" />
        </sbb-form-field>
      `);
      const element: SbbDatepickerToggle = page.querySelector('sbb-datepicker-toggle');
      expect(element).dom.to.be.equal(
        `<sbb-datepicker-toggle slot="prefix"></sbb-datepicker-toggle>`,
      );
      expect(element).shadowDom.to.be.equal(
        `
          <sbb-tooltip-trigger
            tabindex="0"
            aria-label="Show calendar"
            dir="ltr"
            aria-haspopup="dialog"
            aria-expanded="false"
            icon-name="calendar-small"
            data-icon-small=""
            role="button"
            aria-controls="sbb-tooltip-10"
          ></sbb-tooltip-trigger>
          <sbb-tooltip
            hide-close-button=""
            data-state="closed"
            id="sbb-tooltip-10"
            role="tooltip"
          >
            <sbb-calendar wide=""></sbb-calendar>
          </sbb-tooltip>
        `,
      );
    });
  });
});
