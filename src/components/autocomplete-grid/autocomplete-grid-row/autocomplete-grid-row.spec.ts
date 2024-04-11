import { expect } from '@open-wc/testing';
import type { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private/index.js';

import type { SbbAutocompleteGridRowElement } from './autocomplete-grid-row.js';
import '../autocomplete-grid/index.js';
import './autocomplete-grid-row.js';
import '../autocomplete-grid-option/index.js';
import '../autocomplete-grid-actions/index.js';
import '../autocomplete-grid-button/index.js';

describe('sbb-autocomplete-grid-row', () => {
  let root: SbbAutocompleteGridRowElement;
  const row: TemplateResult = html`
    <sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-option value="1">Option 1</sbb-autocomplete-grid-option>
      <sbb-autocomplete-grid-actions>
        <sbb-autocomplete-grid-button icon-name="pie-small"></sbb-autocomplete-grid-button>
      </sbb-autocomplete-grid-actions>
    </sbb-autocomplete-grid-row>
  `;
  beforeEach(async () => {
    root = (
      await fixture(html`
        <sbb-autocomplete-grid origin="anchor"> ${row} </sbb-autocomplete-grid>
        <div id="anchor"></div>
      `)
    ).querySelector('sbb-autocomplete-grid-row')!;
  });

  it('Dom', async () => {
    await expect(root).dom.to.be.equalSnapshot();
  });

  it('ShadowDom', async () => {
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(row);
});
