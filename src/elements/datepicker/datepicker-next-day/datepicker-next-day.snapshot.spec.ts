import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbDatepickerNextDayElement } from './datepicker-next-day.component.ts';

import './datepicker-next-day.component.ts';
import '../../date-input.ts';

describe(`sbb-datepicker-next-day`, () => {
  let element: SbbDatepickerNextDayElement;

  describe('renders', async () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-datepicker-next-day></sbb-datepicker-next-day>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders with connected date input', async () => {
    beforeEach(async () => {
      const page = await fixture(html`
        <div>
          <sbb-date-input id="datepicker-input" value="2022-12-31"></sbb-date-input>
          <sbb-datepicker-next-day input="datepicker-input"></sbb-datepicker-next-day>
        </div>
      `);

      element = page.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
