import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { isFirefox } from '../core/dom';
import { describeIf } from '../core/testing';
import { fixture, testA11yTreeSnapshot } from '../core/testing/private';

import type { SbbToastElement } from './toast';

import './toast';

describe(`sbb-toast`, () => {
  describe('renders', () => {
    let elem: SbbToastElement;

    beforeEach(async () => {
      elem = await fixture(html`
        <sbb-toast icon-name="circle-tick-small" dismissible> 'Lorem ipsum dolor' </sbb-toast>
      `);
    });

    describeIf(!isFirefox(), 'Chrome-Safari', async () => {
      it('Dom', async () => {
        await expect(elem).dom.to.be.equalSnapshot();
      });

      it('ShadowDom', async () => {
        await expect(elem).shadowDom.to.be.equalSnapshot();
      });
    });

    describeIf(isFirefox(), 'Firefox', async () => {
      it('Dom', async () => {
        await expect(elem).dom.to.be.equalSnapshot();
      });

      it('ShadowDom', async () => {
        await expect(elem).shadowDom.to.be.equalSnapshot();
      });
    });

    testA11yTreeSnapshot();
  });
});
