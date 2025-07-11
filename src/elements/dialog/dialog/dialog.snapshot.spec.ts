import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';
import { waitForLitRender } from '../../core/testing.js';

import type { SbbDialogElement } from './dialog.component.js';
import './dialog.component.js';
import '../dialog-title.js';
import '../dialog-close-button.js';
import '../dialog-content.js';

describe(`sbb-dialog`, () => {
  describe('renders an open dialog', async () => {
    let root: SbbDialogElement;

    beforeEach(async () => {
      root = await fixture(
        html`<sbb-dialog>
          <sbb-dialog-title>Title</sbb-dialog-title>
          <sbb-dialog-content>Content</sbb-dialog-content>
        </sbb-dialog>`,
      );
      root.open();
      await waitForLitRender(root);
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot({ ignoreAttributes: ['id'] });
    });

    it('Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders an open dialog with close button negative', async () => {
    let root: SbbDialogElement;

    beforeEach(async () => {
      root = await fixture(
        html`<sbb-dialog negative>
          <sbb-dialog-title>Title</sbb-dialog-title>
          <sbb-dialog-close-button></sbb-dialog-close-button>
          <sbb-dialog-content>Content</sbb-dialog-content>
        </sbb-dialog>`,
      );
      root.open();
      await waitForLitRender(root);
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot({ ignoreAttributes: ['id'] });
    });

    it('Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
