import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';

import type { SbbPopoverElement } from './popover.component.ts';
import './popover.component.ts';

describe(`sbb-popover`, () => {
  let element: SbbPopoverElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-popover></sbb-popover>`);
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
