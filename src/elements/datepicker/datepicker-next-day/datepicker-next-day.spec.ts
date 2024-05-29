import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';
import type { SbbFormFieldElement } from '../../form-field.js';

import type { SbbDatepickerNextDayElement } from './datepicker-next-day.js';

import './datepicker-next-day.js';
import '../datepicker.js';
import '../../form-field.js';

describe(`sbb-datepicker-next-day`, () => {
  it('renders', async () => {
    const page: SbbDatepickerNextDayElement = await fixture(
      html`<sbb-datepicker-next-day></sbb-datepicker-next-day>`,
    );

    await expect(page).dom.to.be.equalSnapshot();

    expect(page).shadowDom.to.be.equal(`
      <span class="sbb-action-base sbb-datepicker-next-day">
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

    const element: SbbDatepickerNextDayElement =
      page.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;

    await expect(element).dom.to.be.equalSnapshot();

    expect(element).shadowDom.to.be.equal(`
      <span class="sbb-action-base sbb-datepicker-next-day">
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

    const element: SbbDatepickerNextDayElement =
      page.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
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

    const element: SbbDatepickerNextDayElement =
      page.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
    expect(element).to.have.attribute('data-disabled');
  });

  testA11yTreeSnapshot(html`<sbb-datepicker-next-day></sbb-datepicker-next-day>`);
});
