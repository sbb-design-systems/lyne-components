import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { isSafari } from '../core/dom';
import { waitForLitRender } from '../core/testing';
import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';
import type { SbbFormFieldElement } from '../form-field';

import type { SbbAutocompleteElement } from './autocomplete';
import '../form-field';
import '../option';
import './autocomplete';

describe('sbb-autocomplete', () => {
  describe('renders standalone', async () => {
    let elem: SbbAutocompleteElement;

    beforeEach(async () => {
      await fixture(html`
        <div id="origin"></div>
        <input id="trigger" />
        <sbb-autocomplete origin="origin" trigger="trigger">
          <sbb-option value="1">1</sbb-option>
          <sbb-option value="2">2</sbb-option>
        </sbb-autocomplete>
      `);
      elem = document.querySelector('sbb-autocomplete')!;
      await waitForLitRender(elem);
    });

    (!isSafari() ? describe : describe.skip)('Chrome-Firefox', async () => {
      it('Dom', async () => {
        await expect(elem).dom.to.be.equalSnapshot();
      });

      it('ShadowDom', async () => {
        await expect(elem).shadowDom.to.be.equalSnapshot();
      });
    });

    (isSafari() ? describe : describe.skip)('Safari', async () => {
      it('Dom', async () => {
        await expect(elem).dom.to.be.equalSnapshot();
      });

      it('ShadowDom', async () => {
        await expect(elem).shadowDom.to.be.equalSnapshot();
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
      await waitForLitRender(root);
    });

    (!isSafari() ? describe : describe.skip)('Chrome-Firefox', async () => {
      it('Dom', async () => {
        await expect(root).dom.to.be.equalSnapshot();
      });

      it('ShadowDom', async () => {
        await expect(root).shadowDom.to.be.equalSnapshot();
      });
    });

    (isSafari() ? describe : describe.skip)('Safari', async () => {
      it('Dom', async () => {
        await expect(root).dom.to.be.equalSnapshot();
      });

      it('ShadowDom', async () => {
        await expect(root).shadowDom.to.be.equalSnapshot();
      });
    });

    testA11yTreeSnapshot();
  });
});
