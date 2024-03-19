import { expect } from '@open-wc/testing';

import { waitForLitRender } from '../../core/testing';
import { fixture, testA11yTreeSnapshot } from '../../core/testing/private';
import { buttonLinkIconTestTemplate, buttonLinkTestTemplate } from '../common/button-test-utils';

import type { SbbTransparentButtonLinkElement } from './transparent-button-link';
import './transparent-button-link';

describe(`sbb-transparent-button-link`, () => {
  describe('renders a sbb-transparent-button-link without icon', async () => {
    let root: SbbTransparentButtonLinkElement;

    beforeEach(async () => {
      root = await fixture(buttonLinkTestTemplate('sbb-transparent-button-link'));
    });

    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders a disabled sbb-transparent-button-link with slotted icon', async () => {
    let root: SbbTransparentButtonLinkElement;

    beforeEach(async () => {
      root = await fixture(buttonLinkIconTestTemplate('sbb-transparent-button-link'));
      await waitForLitRender(root);
    });

    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });
});
