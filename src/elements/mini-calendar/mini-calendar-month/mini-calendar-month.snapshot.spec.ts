import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbMiniCalendarMonthElement } from './mini-calendar-month.component.js';
import './mini-calendar-month.component.js';
import '../mini-calendar-day.js';

describe(`sbb-mini-calendar-month`, () => {
  describe('renders', () => {
    let element: SbbMiniCalendarMonthElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-mini-calendar-month date="2025-01">
          <sbb-mini-calendar-day date="2025-01-01"></sbb-mini-calendar-day>
        </sbb-mini-calendar-month>
      `);
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
