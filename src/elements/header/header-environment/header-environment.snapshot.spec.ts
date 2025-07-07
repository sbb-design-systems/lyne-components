import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import type { SbbHeaderEnvironmentElement } from './header-environment.component.js';
import './header-environment.component.js';

describe(`sbb-header-environment`, () => {
  describe('renders', () => {
    let element: SbbHeaderEnvironmentElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-header-environment>dev</sbb-header-environment>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
