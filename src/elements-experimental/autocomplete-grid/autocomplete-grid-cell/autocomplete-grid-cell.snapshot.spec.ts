import { expect } from '@open-wc/testing';
import { fixture, testA11yTreeSnapshot } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import type { SbbAutocompleteGridCellElement } from './autocomplete-grid-cell.component.ts';
import '../autocomplete-grid.ts';
import '../autocomplete-grid-row.ts';
import './autocomplete-grid-cell.component.ts';
import '../autocomplete-grid-button.ts';

describe('sbb-autocomplete-grid-cell', () => {
  describe('renders', () => {
    let root: SbbAutocompleteGridCellElement;
    beforeEach(async () => {
      root = (
        await fixture(html`
          <sbb-autocomplete-grid origin="anchor">
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-cell>
                <sbb-autocomplete-grid-button icon-name="pie-small"></sbb-autocomplete-grid-button>
              </sbb-autocomplete-grid-cell>
            </sbb-autocomplete-grid-row>
          </sbb-autocomplete-grid>
          <div id="anchor"></div>
        `)
      ).querySelector('sbb-autocomplete-grid-cell')!;
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });

  testA11yTreeSnapshot(html`
    <sbb-autocomplete-grid-cell>
      <sbb-autocomplete-grid-button icon-name="pie-small"></sbb-autocomplete-grid-button>
    </sbb-autocomplete-grid-cell>
  `);
});
