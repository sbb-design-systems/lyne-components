import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbDialogActionsElement } from './dialog-actions.component.ts';
import './dialog-actions.component.ts';

describe('sbb-dialog-actions', () => {
  describe('renders', async () => {
    let root: SbbDialogActionsElement;

    beforeEach(async () => {
      root = await fixture(html`<sbb-dialog-actions></sbb-dialog-actions>`);
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
