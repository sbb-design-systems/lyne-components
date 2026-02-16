import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { isSafari } from '../core/dom.ts';
import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';
import { describeIf } from '../core/testing.ts';

import type { SbbSelectElement } from './select.component.ts';
import './select.component.ts';
import '../option.ts';

describe(`sbb-select`, () => {
  describe('renders', () => {
    let elem: SbbSelectElement;

    beforeEach(async () => {
      elem = await fixture(html`
        <sbb-select>
          <sbb-option value="1">Option 1</sbb-option>
          <sbb-option value="2">Option 2</sbb-option>
          <sbb-option value="3">Option 3</sbb-option>
        </sbb-select>
      `);
    });

    describeIf(!isSafari, 'Chrome-Firefox', async () => {
      it('DOM', async () => {
        await expect(elem).dom.to.be.equalSnapshot({ ignoreAttributes: ['id'] });
      });

      it('Shadow DOM', async () => {
        await expect(elem).shadowDom.to.be.equalSnapshot();
      });
    });

    describeIf(isSafari, 'Safari', async () => {
      it('DOM', async () => {
        await expect(elem).dom.to.be.equalSnapshot();
      });

      it('Shadow DOM', async () => {
        await expect(elem).shadowDom.to.be.equalSnapshot();
      });
    });

    testA11yTreeSnapshot();
  });

  describe('renders multiple', () => {
    let elem: SbbSelectElement;

    beforeEach(async () => {
      elem = await fixture(html`
        <sbb-select multiple>
          <sbb-option value="1">Option 1</sbb-option>
          <sbb-option value="2">Option 2</sbb-option>
          <sbb-option value="3">Option 3</sbb-option>
        </sbb-select>
      `);
    });

    describeIf(!isSafari, 'Chrome-Firefox', async () => {
      it('DOM', async () => {
        await expect(elem).dom.to.be.equalSnapshot({ ignoreAttributes: ['id'] });
      });

      it('Shadow DOM', async () => {
        await expect(elem).shadowDom.to.be.equalSnapshot({ ignoreAttributes: ['id'] });
      });
    });

    describeIf(isSafari, 'Safari', async () => {
      it('DOM', async () => {
        await expect(elem).dom.to.be.equalSnapshot();
      });

      it('Shadow DOM', async () => {
        await expect(elem).shadowDom.to.be.equalSnapshot();
      });
    });

    testA11yTreeSnapshot();
  });
});
