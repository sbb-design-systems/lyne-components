import { expect } from '@open-wc/testing';
import { fixture, testA11yTreeSnapshot } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import type { SbbAutocompleteGridOptionElement } from './autocomplete-grid-option.component.ts';
import '../autocomplete-grid.ts';
import '../autocomplete-grid-row.ts';
import './autocomplete-grid-option.component.ts';
import '../autocomplete-grid-cell.ts';
import '../autocomplete-grid-button.ts';

describe('sbb-autocomplete-grid-option', () => {
  describe('renders', () => {
    let root: SbbAutocompleteGridOptionElement;
    beforeEach(async () => {
      root = (
        await fixture(html`
          <sbb-autocomplete-grid origin="anchor">
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option value="1">Option 1</sbb-autocomplete-grid-option>
            </sbb-autocomplete-grid-row>
          </sbb-autocomplete-grid>
          <div id="anchor"></div>
        `)
      ).querySelector('sbb-autocomplete-grid-option')!;
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot({ ignoreAttributes: ['aria-hidden'] });
    });
  });

  describe('renders disabled', () => {
    let root: SbbAutocompleteGridOptionElement;
    beforeEach(async () => {
      root = (
        await fixture(html`
          <sbb-autocomplete-grid origin="anchor">
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option value="1" disabled
                >Option 1</sbb-autocomplete-grid-option
              >
            </sbb-autocomplete-grid-row>
          </sbb-autocomplete-grid>
          <div id="anchor"></div>
        `)
      ).querySelector('sbb-autocomplete-grid-option')!;
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot({ ignoreAttributes: ['aria-hidden'] });
    });
  });

  testA11yTreeSnapshot(
    html`<sbb-autocomplete-grid-option value="1">Option 1</sbb-autocomplete-grid-option>`,
  );
});
