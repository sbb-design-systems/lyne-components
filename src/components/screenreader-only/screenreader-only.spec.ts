import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private';

import type { SbbScreenreaderOnlyElement } from './screenreader-only';

import './screenreader-only';

describe(`sbb-screenreader-only`, () => {
  describe('renders', async () => {
    let root: SbbScreenreaderOnlyElement;

    beforeEach(async () => {
      root = await fixture(html`<sbb-screenreader-only></sbb-screenreader-only>`);
    });

    it('with Light DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('with Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
