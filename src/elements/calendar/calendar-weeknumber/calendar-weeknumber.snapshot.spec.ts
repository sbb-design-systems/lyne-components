import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbCalendarWeeknumberElement } from './calendar-weeknumber.component.ts';

import '../../calendar.ts';

describe(`sbb-calendar-weeknumber`, () => {
  describe('renders', () => {
    let element: SbbCalendarWeeknumberElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-calendar-weeknumber .value=${'27'}></sbb-calendar-weeknumber>`,
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
