import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';

import type { SbbTeaserPanelElement } from './teaser-panel.component.ts';
import '../teaser-panel.ts';

describe(`sbb-teaser-panel`, () => {
  let element: SbbTeaserPanelElement;

  describe('renders', async () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-teaser-panel>Panel content.</sbb-teaser-panel>`);
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
