import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbCalendarEnhancedElement } from './calendar-enhanced.component.ts';
import './calendar-enhanced.component.ts';

describe(`sbb-calendar-enhanced`, () => {
  describe('renders', () => {
    let element: SbbCalendarEnhancedElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-calendar-enhanced></sbb-calendar-enhanced>`);
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
