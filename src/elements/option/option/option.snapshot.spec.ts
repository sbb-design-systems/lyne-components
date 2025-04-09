import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbOptionElement } from './option.component.js';

import '../../autocomplete.js';
import './option.component.js';

describe(`sbb-option`, () => {
  describe('autocomplete', () => {
    let element: SbbOptionElement;

    describe('renders selected', async () => {
      beforeEach(async () => {
        element = (
          await fixture(html`
            <sbb-autocomplete origin="anchor">
              <sbb-option value="1" selected>Option 1</sbb-option>
            </sbb-autocomplete>
            <div id="anchor"></div>
          `)
        ).querySelector('sbb-option')!;
      });

      it('DOM', async () => {
        await expect(element).dom.to.be.equalSnapshot();
      });

      it('Shadow DOM', async () => {
        await expect(element).shadowDom.to.be.equalSnapshot();
      });
    });

    describe('renders disabled', async () => {
      beforeEach(async () => {
        element = (
          await fixture(html`
            <sbb-autocomplete origin="anchor">
              <sbb-option value="1" disabled>Option 1</sbb-option>
            </sbb-autocomplete>
            <div id="anchor"></div>
          `)
        ).querySelector('sbb-option')!;
      });

      it('DOM', async () => {
        await expect(element).dom.to.be.equalSnapshot();
      });

      it('Shadow DOM', async () => {
        await expect(element).shadowDom.to.be.equalSnapshot();
      });
    });
  });

  testA11yTreeSnapshot(html`<sbb-option value="1" selected></sbb-option>`, 'selected');

  testA11yTreeSnapshot(html`<sbb-option value="1" disabled></sbb-option>`, 'disabled');
});
