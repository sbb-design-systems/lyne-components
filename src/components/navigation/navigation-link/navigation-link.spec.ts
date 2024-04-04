import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private';

import type { SbbNavigationLinkElement } from './navigation-link';

import './navigation-link';

describe(`sbb-navigation-link`, () => {
  let element: SbbNavigationLinkElement;

  describe('renders', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-navigation-link href="https://www.sbb.ch" target="_blank"
          >This is a link</sbb-navigation-link
        >`,
      );
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
