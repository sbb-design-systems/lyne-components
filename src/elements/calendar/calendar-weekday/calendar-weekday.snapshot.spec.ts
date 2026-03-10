import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';
import type { Weekday } from '../calendar/calendar.component.ts';

import type { SbbCalendarWeekdayElement } from './calendar-weekday.component.ts';

import './calendar-weekday.component.ts';

describe(`sbb-calendar-weekday`, () => {
  describe('renders', () => {
    let element: SbbCalendarWeekdayElement;

    beforeEach(async () => {
      const weekDay: Weekday = { long: 'Monday', narrow: 'M' };
      element = await fixture(
        html`<sbb-calendar-weekday .value=${weekDay}></sbb-calendar-weekday>`,
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
