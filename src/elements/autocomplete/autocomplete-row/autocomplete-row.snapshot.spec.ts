import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbAutocompleteRowElement } from './autocomplete-row.component.ts';

import '../../autocomplete.ts';

describe('sbb-autocomplete-row', () => {
  describe('renders', () => {
    let root: SbbAutocompleteRowElement;

    beforeEach(async () => {
      root = await fixture(html`
        <sbb-autocomplete-row>
          <sbb-option value="1">Option 1</sbb-option>
          <sbb-autocomplete-button icon-name="pie-small"></sbb-autocomplete-button>
        </sbb-autocomplete-row>
      `);
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
