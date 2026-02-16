import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';
import { waitForLitRender } from '../core/testing.ts';

import type { SbbOverlayElement } from './overlay.component.ts';
import './overlay.component.ts';

describe('sbb-overlay', () => {
  describe('renders', () => {
    let root: SbbOverlayElement;

    beforeEach(async () => {
      root = await fixture(html`<sbb-overlay></sbb-overlay>`);
      root.open();
      await waitForLitRender(root);
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
