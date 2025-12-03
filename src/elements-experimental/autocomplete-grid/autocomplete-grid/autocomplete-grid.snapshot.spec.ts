import { expect } from '@open-wc/testing';
import { isSafari } from '@sbb-esta/lyne-elements/core/dom.js';
import { fixture, testA11yTreeSnapshot } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { describeIf } from '@sbb-esta/lyne-elements/core/testing.js';
import type { SbbFormFieldElement } from '@sbb-esta/lyne-elements/form-field.js';
import { html } from 'lit/static-html.js';

import type { SbbAutocompleteGridElement } from './autocomplete-grid.component.ts';
import './autocomplete-grid.component.ts';
import '../autocomplete-grid-row.ts';
import '../autocomplete-grid-option.ts';
import '../autocomplete-grid-cell.ts';
import '../autocomplete-grid-button.ts';
import '@sbb-esta/lyne-elements/form-field/form-field/form-field.component.js';

describe('sbb-autocomplete-grid', () => {
  let root: SbbFormFieldElement;
  let element: SbbAutocompleteGridElement;

  beforeEach(async () => {
    root = await fixture(html`
      <sbb-form-field>
        <input />
        <sbb-autocomplete-grid>
          <sbb-autocomplete-grid-row>
            <sbb-autocomplete-grid-option>Option 1</sbb-autocomplete-grid-option>
            <sbb-autocomplete-grid-cell>
              <sbb-autocomplete-grid-button icon-name="dog-small"></sbb-autocomplete-grid-button>
            </sbb-autocomplete-grid-cell>
          </sbb-autocomplete-grid-row>
          <sbb-autocomplete-grid-row>
            <sbb-autocomplete-grid-option>Option 2</sbb-autocomplete-grid-option>
            <sbb-autocomplete-grid-cell>
              <sbb-autocomplete-grid-button icon-name="dog-small"></sbb-autocomplete-grid-button>
            </sbb-autocomplete-grid-cell>
          </sbb-autocomplete-grid-row>
        </sbb-autocomplete-grid>
      </sbb-form-field>
    `);
    element = root.querySelector('sbb-autocomplete-grid')!;
  });

  describeIf(!isSafari, 'Chrome-Firefox', async () => {
    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['id'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describeIf(isSafari, 'Safari', async () => {
    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['id'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
