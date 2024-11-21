import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbPopoverTriggerElement } from './popover-trigger.js';
import './popover-trigger.js';

describe(`sbb-popover-trigger`, () => {
  let element: SbbPopoverTriggerElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-popover-trigger></sbb-popover-trigger>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders with custom content', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-popover-trigger>Custom Content</sbb-popover-trigger>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
