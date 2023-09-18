import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbFormField } from '../../form-field';

import type { SbbDatepickerPreviousDay } from './datepicker-previous-day';

import '../datepicker';
import './datepicker-previous-day';

describe('sbb-datepicker-previous-day', () => {
  it('renders', async () => {
    const page: SbbDatepickerPreviousDay = await fixture(
      html`<sbb-datepicker-previous-day></sbb-datepicker-previous-day>`,
    );

    expect(page).dom.to.equal(`
      <sbb-datepicker-previous-day slot="prefix" dir="ltr" role="button" slot="prefix" tabindex="0"></sbb-datepicker-previous-day>
    `);

    expect(page).shadowDom.to.equal(`
    <span class="sbb-datepicker-previous-day">
      <sbb-icon aria-hidden="true" data-namespace="default" name="chevron-small-left-small" role="img"></sbb-icon>
    </span>`);
  });

  it('renders with datepicker and input disabled', async () => {
    const page: SbbFormField = await fixture(html`
      <sbb-form-field>
        <input disabled="" />
        <sbb-datepicker></sbb-datepicker>
        <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
      </sbb-form-field>
    `);

    const element: SbbDatepickerPreviousDay = page.querySelector('sbb-datepicker-previous-day');
    expect(element).to.have.attribute('data-disabled');
  });

  it('renders with datepicker and input readonly', async () => {
    const page: SbbFormField = await fixture(html`
      <sbb-form-field>
        <input readonly="" />
        <sbb-datepicker></sbb-datepicker>
        <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
      </sbb-form-field>
    `);

    const element: SbbDatepickerPreviousDay = page.querySelector('sbb-datepicker-previous-day');
    expect(element).to.have.attribute('data-disabled');
  });
});
