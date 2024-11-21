import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbPopoverElement } from './popover.js';
import './popover.js';

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
