import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { isFirefox } from '../core/dom';
import { describeIf, waitForLitRender } from '../core/testing';
import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';

import type { SbbToastElement } from './toast';

import './toast';

describe('sbb-toast', () => {
  describe('renders', () => {
    let elem: SbbToastElement;

    beforeEach(async () => {
      elem = await fixture(html`
        <sbb-toast icon-name="circle-tick-small" dismissible> 'Lorem ipsum dolor' </sbb-toast>
      `);
      await waitForLitRender(elem);
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
