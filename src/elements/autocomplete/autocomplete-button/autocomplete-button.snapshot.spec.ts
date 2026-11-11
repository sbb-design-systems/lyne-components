import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';

import type { SbbAutocompleteButtonElement } from './autocomplete-button.component.ts';

import '../../autocomplete.ts';

describe('sbb-autocomplete-button', () => {
  describe('renders', () => {
    let root: SbbAutocompleteButtonElement;

    beforeEach(async () => {
      root = await fixture(
        html`<sbb-autocomplete-button icon-name="pie-small"></sbb-autocomplete-button>`,
      );
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
