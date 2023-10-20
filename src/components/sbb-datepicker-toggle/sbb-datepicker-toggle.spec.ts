import { SbbDatepickerToggle } from './sbb-datepicker-toggle';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbFormField } from '../sbb-form-field/sbb-form-field';

import './sbb-datepicker-toggle';
import '../sbb-datepicker';
import '../sbb-form-field';

describe('sbb-datepicker-toggle', () => {
  it('renders', async () => {
    const page = await fixture(html`<sbb-datepicker-toggle />`);

    expect(page).dom.to.equal(`<sbb-datepicker-toggle slot="prefix"></sbb-datepicker-toggle>`);
    expect(page).shadowDom.to.equal(`
      <sbb-tooltip-trigger aria-label="Show calendar" iconName="calendar-small" disabled="" data-icon-small=""></sbb-tooltip-trigger>
      <sbb-tooltip hide-close-button="">
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
            <sbb-tooltip-trigger aria-label="Show calendar" iconName="calendar-small" data-icon-small=""></sbb-tooltip-trigger>
            <sbb-tooltip hide-close-button="">
              <sbb-calendar max="" min=""></sbb-calendar>
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
          <sbb-tooltip-trigger aria-label="Show calendar" iconName="calendar-small" disabled="" data-icon-small=""></sbb-tooltip-trigger>
          <sbb-tooltip hide-close-button="">
            <sbb-calendar max="" min=""></sbb-calendar>
          </sbb-tooltip>
        `,
      );
    });

    it('renders in form-field with calendar parameters', async () => {
      const page = await fixture(html`
        <sbb-form-field>
          <sbb-datepicker-toggle></sbb-datepicker-toggle>
          <sbb-datepicker wide="true"></sbb-datepicker>
          <input min="1600000000" max="1700000000" />
        </sbb-form-field>
      `);
      const element: SbbDatepickerToggle = page.querySelector('sbb-datepicker-toggle');
      expect(element).dom.to.be.equal(
        `<sbb-datepicker-toggle slot="prefix"></sbb-datepicker-toggle>`,
      );
      expect(element).shadowDom.to.be.equal(
        `
          <sbb-tooltip-trigger aria-label="Show calendar" iconName="calendar-small" data-icon-small=""></sbb-tooltip-trigger>
          <sbb-tooltip hide-close-button="">
            <sbb-calendar min="1600000000" max="1700000000" wide=""></sbb-calendar>
          </sbb-tooltip>
        `,
      );
    });
  });
});
