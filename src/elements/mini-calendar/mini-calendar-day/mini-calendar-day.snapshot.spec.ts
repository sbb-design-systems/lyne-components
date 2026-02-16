import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbMiniCalendarDayElement } from './mini-calendar-day.component.ts';
import './mini-calendar-day.component.ts';

describe(`sbb-mini-calendar-day`, () => {
  describe('renders', () => {
    let element: SbbMiniCalendarDayElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-mini-calendar-day date="2025-01-01"></sbb-mini-calendar-day>`,
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
