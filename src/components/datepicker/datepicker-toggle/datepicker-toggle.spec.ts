import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { SbbFormFieldElement } from '../../form-field';

import type { SbbDatepickerToggleElement } from './datepicker-toggle';

import '../datepicker';
import './datepicker-toggle';

describe('sbb-datepicker-toggle', () => {
  it('renders', async () => {
    const page = await fixture(html`<sbb-datepicker-toggle></sbb-datepicker-toggle>`);

    expect(page).dom.to.equal(`<sbb-datepicker-toggle slot="prefix"></sbb-datepicker-toggle>`);
    expect(page).shadowDom.to.equal(`
      <sbb-popover-trigger
        aria-label="Show calendar"
        aria-controls="sbb-popover-1"
        aria-expanded="false"
        aria-haspopup="dialog"
        dir="ltr"
        aria-disabled="true"
        icon-name="calendar-small"
        role="button"
        disabled=""
        data-icon-small=""
      ></sbb-popover-trigger>
      <sbb-popover
        hide-close-button=""
        data-state="closed"
        hide-close-button=""
        id="sbb-popover-1"
      >
        <sbb-calendar></sbb-calendar>
      </sbb-popover>
    `);
  });

  describe('renders in form-field', () => {
    it('renders in form-field', async () => {
      const page: SbbFormFieldElement = await fixture(html`
        <sbb-form-field>
          <sbb-datepicker-toggle></sbb-datepicker-toggle>
          <sbb-datepicker></sbb-datepicker>
          <input />
        </sbb-form-field>
      `);
      const element: SbbDatepickerToggleElement =
        page.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
      expect(element).dom.to.be.equal(
        `<sbb-datepicker-toggle slot="prefix"></sbb-datepicker-toggle>`,
      );
      expect(element).shadowDom.to.be.equal(
        `
          <sbb-popover-trigger
            tabindex="0"
            aria-label="Show calendar"
            dir="ltr"
            aria-haspopup="dialog"
            aria-expanded="false"
            icon-name="calendar-small"
            data-icon-small=""
            role="button"
            aria-controls="sbb-popover-2"
          ></sbb-popover-trigger>
            <sbb-popover
              hide-close-button=""
              data-state="closed"
              id="sbb-popover-2"
            >
              <sbb-calendar></sbb-calendar>
            </sbb-popover>
          `,
      );
    });

    it('renders in disabled form-field', async () => {
      const page: SbbFormFieldElement = await fixture(html`
        <sbb-form-field>
          <sbb-datepicker-toggle></sbb-datepicker-toggle>
          <sbb-datepicker></sbb-datepicker>
          <input disabled />
        </sbb-form-field>
      `);
      const element: SbbDatepickerToggleElement =
        page.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
      expect(element).dom.to.be.equal(
        `<sbb-datepicker-toggle slot="prefix"></sbb-datepicker-toggle>`,
      );
      expect(element).shadowDom.to.be.equal(
        `
          <sbb-popover-trigger
            aria-label="Show calendar"
            aria-controls="sbb-popover-3"
            aria-disabled="true"
            aria-expanded="false"
            aria-haspopup="dialog"
            disabled=""
            dir="ltr"
            icon-name="calendar-small"
            role="button"
            data-icon-small=""
          ></sbb-popover-trigger>
          <sbb-popover
            data-state="closed"
            id="sbb-popover-3"
            hide-close-button=""
          >
            <sbb-calendar></sbb-calendar>
          </sbb-popover>
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
      const element: SbbDatepickerToggleElement =
        page.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
      expect(element).dom.to.be.equal(
        `<sbb-datepicker-toggle slot="prefix"></sbb-datepicker-toggle>`,
      );
      expect(element).shadowDom.to.be.equal(
        `
          <sbb-popover-trigger
            tabindex="0"
            aria-label="Show calendar"
            dir="ltr"
            aria-haspopup="dialog"
            aria-expanded="false"
            icon-name="calendar-small"
            data-icon-small=""
            role="button"
            aria-controls="sbb-popover-4"
          ></sbb-popover-trigger>
          <sbb-popover
            hide-close-button=""
            data-state="closed"
            id="sbb-popover-4"
          >
            <sbb-calendar wide=""></sbb-calendar>
          </sbb-popover>
        `,
      );
    });
  });
});
