import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private/index.js';

import type { SbbAutocompleteGridActionsElement } from './autocomplete-grid-actions.js';
import '../autocomplete-grid/index.js';
import '../autocomplete-grid-row/index.js';
import './autocomplete-grid-actions.js';
import '../autocomplete-grid-button/index.js';

describe('sbb-autocomplete-grid-actions', () => {
  let root: SbbAutocompleteGridActionsElement;
  beforeEach(async () => {
    root = (
      await fixture(html`
        <sbb-autocomplete-grid origin="anchor">
          <sbb-autocomplete-grid-row>
            <sbb-autocomplete-grid-actions>
              <sbb-autocomplete-grid-button icon-name="pie-small"></sbb-autocomplete-grid-button>
            </sbb-autocomplete-grid-actions>
          </sbb-autocomplete-grid-row>
        </sbb-autocomplete-grid>
        <div id="anchor"></div>
      `)
    ).querySelector('sbb-autocomplete-grid-actions')!;
  });

  it('Dom', async () => {
    await expect(root).dom.to.be.equalSnapshot();
  });

  it('ShadowDom', async () => {
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(html`
    <sbb-autocomplete-grid-actions>
      <sbb-autocomplete-grid-button icon-name="pie-small"></sbb-autocomplete-grid-button>
    </sbb-autocomplete-grid-actions>
  `);
});
