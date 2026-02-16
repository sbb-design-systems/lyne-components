import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbFileSelectorElement } from './file-selector.component.ts';
import './file-selector.component.ts';

describe(`sbb-file-selector`, () => {
  describe('renders', () => {
    let element: SbbFileSelectorElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-file-selector></sbb-file-selector>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    // We skip safari because it has an inconsistent behavior on ci environment
    testA11yTreeSnapshot(undefined, undefined, { safari: true });
  });
});
