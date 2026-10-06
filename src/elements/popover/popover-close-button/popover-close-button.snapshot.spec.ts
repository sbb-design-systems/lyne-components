import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbPopoverCloseButtonElement } from './popover-close-button.component.ts';

import '../../popover.ts';

describe(`sbb-popover-close-button`, () => {
  describe('renders', () => {
    let element: SbbPopoverCloseButtonElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-popover-close-button></sbb-popover-close-button>`);
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
