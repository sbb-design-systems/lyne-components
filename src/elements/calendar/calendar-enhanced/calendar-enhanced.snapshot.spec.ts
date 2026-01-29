import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbCalendarEnhancedElement } from './calendar-enhanced.component.ts';
import { createSlottedDays } from './calendar-enhanced.helper.private.ts';

import './calendar-enhanced.component.ts';
import '../calendar-day/calendar-day.component.ts';

describe(`sbb-calendar-enhanced`, () => {
  describe('renders', () => {
    let element: SbbCalendarEnhancedElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-calendar-enhanced selected="2023-01-20">
          ${createSlottedDays(2023, 1)}
        </sbb-calendar-enhanced>`,
      );
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
