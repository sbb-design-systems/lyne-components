import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbDialogContentElement } from './dialog-content.component.js';
import './dialog-content.component.js';

describe('sbb-dialog-content', () => {
  describe('renders', async () => {
    let root: SbbDialogContentElement;

    beforeEach(async () => {
      root = await fixture(html`<sbb-dialog-content>Content</sbb-dialog-content>`);
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
