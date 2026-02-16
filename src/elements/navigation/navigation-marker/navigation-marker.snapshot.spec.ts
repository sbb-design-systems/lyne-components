import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import type { SbbNavigationMarkerElement } from './navigation-marker.component.ts';

import './navigation-marker.component.ts';

describe(`sbb-navigation-marker`, () => {
  let element: SbbNavigationMarkerElement;

  describe('renders', async () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-navigation-marker size="l"></sbb-navigation-marker>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
