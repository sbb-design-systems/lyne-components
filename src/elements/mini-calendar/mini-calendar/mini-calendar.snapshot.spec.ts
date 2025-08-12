import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbMiniCalendarElement } from './mini-calendar.component.js';
import './mini-calendar.component.js';

describe(`sbb-mini-calendar`, () => {
  describe('renders', () => {
    let element: SbbMiniCalendarElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-mini-calendar></sbb-mini-calendar>`);
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
