import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { isSafari } from '../core/dom.ts';
import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';
import { describeIf } from '../core/testing.ts';
import type { SbbFormFieldElement } from '../form-field.ts';

import type { SbbAutocompleteElement } from './autocomplete.component.ts';

import '../form-field.ts';
import '../option.ts';
import './autocomplete.component.ts';

describe(`sbb-autocomplete`, () => {
  describe('renders standalone', async () => {
    let element: SbbAutocompleteElement;

    beforeEach(async () => {
      const testFixture = await fixture(
        html`<div>
          <div id="origin"></div>
          <input id="trigger" />
          <sbb-autocomplete origin="origin" trigger="trigger">
            <sbb-option value="1">1</sbb-option>
            <sbb-option value="2">2</sbb-option>
          </sbb-autocomplete>
        </div> `,
      );
      element = testFixture.querySelector('sbb-autocomplete')!;
    });

    describeIf(!isSafari, 'Chrome-Firefox', async () => {
      it('DOM', async () => {
        await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['id'] });
      });

      it('Shadow DOM', async () => {
        await expect(element).shadowDom.to.be.equalSnapshot();
      });
    });

    describeIf(isSafari, 'Safari', async () => {
      it('DOM', async () => {
        await expect(element).dom.to.be.equalSnapshot();
      });

      it('Shadow DOM', async () => {
        await expect(element).shadowDom.to.be.equalSnapshot();
      });
    });
  });

  describe('renders in form field', async () => {
    let root: SbbFormFieldElement;

    beforeEach(async () => {
      root = await fixture(html`
        <sbb-form-field>
          <input />
          <sbb-autocomplete>
            <sbb-option value="1">1</sbb-option>
            <sbb-option value="2">2</sbb-option>
          </sbb-autocomplete>
        </sbb-form-field>
      `);
    });

    describeIf(!isSafari, 'Chrome-Firefox', async () => {
      it('DOM', async () => {
        await expect(root).dom.to.be.equalSnapshot({ ignoreAttributes: ['id'] });
      });

      it('Shadow DOM', async () => {
        await expect(root).shadowDom.to.be.equalSnapshot();
      });
    });

    describeIf(isSafari, 'Safari', async () => {
      it('DOM', async () => {
        await expect(root).dom.to.be.equalSnapshot();
      });

      it('Shadow DOM', async () => {
        await expect(root).shadowDom.to.be.equalSnapshot();
      });
    });

    testA11yTreeSnapshot();
  });
});
