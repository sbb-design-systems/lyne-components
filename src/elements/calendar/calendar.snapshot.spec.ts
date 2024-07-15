import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import './calendar.js';
import type { SbbCalendarElement } from './calendar.js';

describe(`sbb-calendar`, () => {
  describe('renders', () => {
    let element: SbbCalendarElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-calendar selected="2023-01-20T00:00:00" now="2023-01-04T00:00:00"></sbb-calendar>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    // We skip safari because it has an inconsistent behavior on ci environment
    testA11yTreeSnapshot(undefined, undefined, { safari: true });
  });
});
