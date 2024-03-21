import { expect } from '@open-wc/testing';

import { waitForLitRender } from '../../core/testing';
import { fixture, testA11yTreeSnapshot } from '../../core/testing/private';
import { buttonLinkIconTestTemplate, buttonLinkTestTemplate } from '../common/button-test-utils';

import type { SbbTertiaryButtonLinkElement } from './tertiary-button-link';
import './tertiary-button-link';

describe(`sbb-tertiary-button-link`, () => {
  describe('renders a sbb-tertiary-button-link without icon', async () => {
    let root: SbbTertiaryButtonLinkElement;

    beforeEach(async () => {
      root = await fixture(buttonLinkTestTemplate('sbb-tertiary-button-link'));
    });

    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders a disabled sbb-tertiary-button-link with slotted icon', async () => {
    let root: SbbTertiaryButtonLinkElement;

    beforeEach(async () => {
      root = await fixture(buttonLinkIconTestTemplate('sbb-tertiary-button-link'));
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
