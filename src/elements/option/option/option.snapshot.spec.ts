import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbOptionElement } from './option.component.ts';

import '../../autocomplete.ts';
import './option.component.ts';

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
        await expect(element).shadowDom.to.be.equalSnapshot({ ignoreAttributes: ['aria-hidden'] });
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
        await expect(element).shadowDom.to.be.equalSnapshot({ ignoreAttributes: ['aria-hidden'] });
      });
    });
  });

  testA11yTreeSnapshot(html`<sbb-option value="1" selected></sbb-option>`, 'selected');

  testA11yTreeSnapshot(html`<sbb-option value="1" disabled></sbb-option>`, 'disabled');
});
