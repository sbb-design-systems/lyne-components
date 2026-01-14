import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbCalendarDayElement } from './calendar-day.component.ts';
import './calendar-day.component.ts';

describe(`sbb-calendar-day`, () => {
  describe('renders', () => {
    let element: SbbCalendarDayElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-calendar-day slot="2025-01-01"></sbb-calendar-day>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders with content', () => {
    let element: SbbCalendarDayElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-calendar-day slot="2025-01-01"><span>99.-</span></sbb-calendar-day>`,
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
