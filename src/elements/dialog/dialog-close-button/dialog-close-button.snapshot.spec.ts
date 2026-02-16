import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbDialogCloseButtonElement } from './dialog-close-button.component.ts';

import './dialog-close-button.component.ts';

describe(`sbb-dialog-close-button`, () => {
  describe('renders', () => {
    let element: SbbDialogCloseButtonElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-dialog-close-button></sbb-dialog-close-button>`);
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
