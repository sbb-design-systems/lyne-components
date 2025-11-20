import { expect } from '@open-wc/testing';
import { fixture, testA11yTreeSnapshot } from '@sbb-esta/lyne-elements/core/testing/private.js';
import type { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import type { SbbAutocompleteGridRowElement } from './autocomplete-grid-row.component.ts';

import '../autocomplete-grid.ts';
import './autocomplete-grid-row.component.ts';
import '../autocomplete-grid-option.ts';
import '../autocomplete-grid-cell.ts';
import '../autocomplete-grid-button.ts';

describe('sbb-autocomplete-grid-row', () => {
  const row: TemplateResult = html`
    <sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-option value="1">Option 1</sbb-autocomplete-grid-option>
      <sbb-autocomplete-grid-cell>
        <sbb-autocomplete-grid-button icon-name="pie-small"></sbb-autocomplete-grid-button>
      </sbb-autocomplete-grid-cell>
    </sbb-autocomplete-grid-row>
  `;

  describe('renders', () => {
    let root: SbbAutocompleteGridRowElement;
    beforeEach(async () => {
      root = (
        await fixture(html`
          <sbb-autocomplete-grid origin="anchor"> ${row} </sbb-autocomplete-grid>
          <div id="anchor"></div>
        `)
      ).querySelector('sbb-autocomplete-grid-row')!;
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });

  testA11yTreeSnapshot(row);
});
