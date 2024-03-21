import { expect } from '@open-wc/testing';

import { waitForLitRender } from '../../core/testing';
import { fixture, testA11yTreeSnapshot } from '../../core/testing/private';
import { buttonLinkIconTestTemplate, buttonLinkTestTemplate } from '../common/button-test-utils';

import type { SbbSecondaryButtonLinkElement } from './secondary-button-link';
import './secondary-button-link';

describe(`sbb-secondary-button-link`, () => {
  describe('renders a sbb-secondary-button-link without icon', async () => {
    let root: SbbSecondaryButtonLinkElement;

    beforeEach(async () => {
      root = await fixture(buttonLinkTestTemplate('sbb-secondary-button-link'));
    });

    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders a disabled sbb-secondary-button-link with slotted icon', async () => {
    let root: SbbSecondaryButtonLinkElement;

    beforeEach(async () => {
      root = await fixture(buttonLinkIconTestTemplate('sbb-secondary-button-link'));
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
