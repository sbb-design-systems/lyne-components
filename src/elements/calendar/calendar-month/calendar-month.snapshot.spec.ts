import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbCalendarMonthElement } from './calendar-month.component.ts';
import './calendar-month.component.ts';

describe(`sbb-calendar-month`, () => {
  describe('renders', () => {
    let element: SbbCalendarMonthElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-calendar-month .value=${'2025-02'}></sbb-calendar-month>`);
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
