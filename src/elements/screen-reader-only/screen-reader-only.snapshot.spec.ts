import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';

import type { SbbScreenReaderOnlyElement } from './screen-reader-only.component.ts';

import './screen-reader-only.component.ts';

describe(`sbb-screen-reader-only`, () => {
  describe('renders', async () => {
    let root: SbbScreenReaderOnlyElement;

    beforeEach(async () => {
      root = await fixture(html`<sbb-screen-reader-only></sbb-screen-reader-only>`);
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
