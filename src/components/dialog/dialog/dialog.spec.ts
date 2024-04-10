import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing/index.js';
import { fixture, testA11yTreeSnapshot } from '../../core/testing/private/index.js';

import type { SbbDialogElement } from './dialog.js';
import './dialog.js';
import '../dialog-title/index.js';
import '../dialog-content/index.js';

describe(`sbb-dialog`, () => {
  describe('renders an open dialog', async () => {
    let root: SbbDialogElement;
    beforeEach(async () => {
      root = await fixture(
        html` <sbb-dialog disable-animation>
          <sbb-dialog-title>Title</sbb-dialog-title>
          <sbb-dialog-content>Content</sbb-dialog-content>
        </sbb-dialog>`,
      );
      root.open();
      await waitForLitRender(root);
    });
    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });
    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
    testA11yTreeSnapshot();
  });
});
