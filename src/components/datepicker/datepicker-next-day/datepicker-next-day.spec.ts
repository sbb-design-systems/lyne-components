import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbFormFieldElement } from '../../form-field';

import type { SbbDatepickerNextDayElement } from './datepicker-next-day';

import '../datepicker';
import './datepicker-next-day';

describe('sbb-datepicker-next-day', () => {
  it('renders', async () => {
    const page: SbbDatepickerNextDayElement = await fixture(
      html`<sbb-datepicker-next-day></sbb-datepicker-next-day>`,
    );

    expect(page).dom.to.be.equal(`
      <sbb-datepicker-next-day dir="ltr" role="button" slot="suffix" aria-disabled="true" data-disabled=""></sbb-datepicker-next-day>
    `);

    expect(page).shadowDom.to.be.equal(`
      <span class="sbb-datepicker-next-day">
        <sbb-icon aria-hidden="true" data-namespace="default" name="chevron-small-right-small" role="img"></sbb-icon>
      </span>
    `);
  });

  it('renders with connected datepicker', async () => {
    const page = await fixture(html`
      <div>
        <input id="datepicker-input" value="31-12-2022" />
        <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
        <sbb-datepicker-next-day date-picker="datepicker"></sbb-datepicker-next-day>
      </div>
    `);

    const element: SbbDatepickerNextDayElement = page.querySelector('sbb-datepicker-next-day');
    expect(element).dom.to.be.equal(`
      <sbb-datepicker-next-day
        date-picker="datepicker"
        dir="ltr"
        role="button"
        slot="suffix"
        tabindex="0"
        aria-label="Change to the next day, currently selected December 31, 2022.">
      </sbb-datepicker-next-day>
    `);

    expect(element).shadowDom.to.be.equal(`
      <span class="sbb-datepicker-next-day">
        <sbb-icon aria-hidden="true" data-namespace="default" name="chevron-small-right-small" role="img"></sbb-icon>
      </span>
    `);
  });

  it('renders with datepicker and input disabled', async () => {
    const page: SbbFormFieldElement = await fixture(html`
      <sbb-form-field>
        <input disabled="" />
        <sbb-datepicker></sbb-datepicker>
        <sbb-datepicker-next-day></sbb-datepicker-next-day>
      </sbb-form-field>
    `);

    const element: SbbDatepickerNextDayElement = page.querySelector('sbb-datepicker-next-day');
    expect(element).to.have.attribute('data-disabled');
  });

  it('renders with datepicker and input readonly', async () => {
    const page: SbbFormFieldElement = await fixture(html`
      <sbb-form-field>
        <input readonly="" />
        <sbb-datepicker></sbb-datepicker>
        <sbb-datepicker-next-day></sbb-datepicker-next-day>
      </sbb-form-field>
    `);

    const element: SbbDatepickerNextDayElement = page.querySelector('sbb-datepicker-next-day');
    expect(element).to.have.attribute('data-disabled');
  });
});
