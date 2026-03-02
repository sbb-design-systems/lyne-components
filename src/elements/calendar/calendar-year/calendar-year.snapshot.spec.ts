import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbCalendarYearElement } from './calendar-year.component.ts';
import './calendar-year.component.ts';

describe(`sbb-calendar-year`, () => {
  describe('renders', () => {
    let element: SbbCalendarYearElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-calendar-year .value=${2026}></sbb-calendar-year>`);
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
