import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbDialogTitleElement } from './dialog-title.component.ts';

import './dialog-title.component.ts';

describe('sbb-dialog-title', () => {
  let element: SbbDialogTitleElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-dialog-title>Title</sbb-dialog-title>`);
    });

    it('Light DOM', async () => {
      await expect(element).dom.to.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
