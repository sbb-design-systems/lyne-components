import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';

import type { SbbClockElement } from './clock.component.ts';
import './clock.component.ts';

describe(`sbb-clock`, () => {
  let element: SbbClockElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-clock></sbb-clock>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders with fixed time', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-clock now="12:30:00"></sbb-clock>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
