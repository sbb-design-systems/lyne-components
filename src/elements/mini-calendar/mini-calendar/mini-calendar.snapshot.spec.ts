import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing/wait-for-render.ts';

import type { SbbMiniCalendarElement } from './mini-calendar.component.ts';
import './mini-calendar.component.ts';
import '../mini-calendar-month.ts';
import '../mini-calendar-day.ts';

describe(`sbb-mini-calendar`, () => {
  describe('renders', () => {
    let element: SbbMiniCalendarElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-mini-calendar>
          <sbb-mini-calendar-month date="2025-01">
            <sbb-mini-calendar-day date="2025-01-01"></sbb-mini-calendar-day>
          </sbb-mini-calendar-month>
        </sbb-mini-calendar>
      `);
      await waitForLitRender(element);
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
