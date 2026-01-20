import { expect } from '@open-wc/testing';
import { repeat } from 'lit/directives/repeat.js';
import { html } from 'lit/static-html.js';

import { defaultDateAdapter } from '../../core/datetime.ts';
import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbCalendarEnhancedElement } from './calendar-enhanced.component.ts';

import './calendar-enhanced.component.ts';
import '../calendar-day/calendar-day.component.ts';

describe(`sbb-calendar-enhanced`, () => {
  describe('renders', () => {
    let element: SbbCalendarEnhancedElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-calendar-enhanced selected="2023-01-20">
          ${repeat(new Array(31), (_, index) => {
            const slotName = defaultDateAdapter.toIso8601(new Date(`2023-01-${index + 1}`));
            return html` <sbb-calendar-day slot=${slotName}></sbb-calendar-day>`;
          })}
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
