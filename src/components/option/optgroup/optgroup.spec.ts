import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { isSafari } from '../../core/dom';
import { waitForLitRender } from '../../core/testing';
import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import type { SbbOptGroupElement } from './optgroup';
import '../../autocomplete';
import '../option';
import './optgroup';

describe('sbb-optgroup', () => {
  describe('autocomplete', () => {
    describe('renders', () => {
      let elem: SbbOptGroupElement;

      beforeEach(async () => {
        await fixture(html`
          <sbb-autocomplete origin="anchor">
            <sbb-optgroup label="Label">
              <sbb-option value="1">1</sbb-option>
              <sbb-option value="2">2</sbb-option>
            </sbb-optgroup>
          </sbb-autocomplete>
          <div id="anchor"></div>
        `);
        elem = document.querySelector('sbb-optgroup')!;
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

      testA11yTreeSnapshot();
    });

    describe('renders disabled', () => {
      let elem: SbbOptGroupElement;

      beforeEach(async () => {
        await fixture(html`
          <sbb-autocomplete origin="anchor">
            <sbb-optgroup label="Label" disabled>
              <sbb-option value="1">1</sbb-option>
              <sbb-option value="2">2</sbb-option>
            </sbb-optgroup>
          </sbb-autocomplete>
          <div id="anchor"></div>
        `);
        elem = document.querySelector('sbb-optgroup')!;
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
  });
});
