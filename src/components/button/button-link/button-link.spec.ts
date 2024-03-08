import { expect, fixture } from '@open-wc/testing';

import { waitForLitRender } from '../../core/testing';
import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';
import { buttonLinkIconTestTemplate, buttonLinkTestTemplate } from '../common/button-test-utils';

import type { SbbButtonLinkElement } from './button-link';
import './button-link';

describe('sbb-button-link', () => {
  describe('renders a sbb-button-link without icon', async () => {
    let root: SbbButtonLinkElement;

    beforeEach(async () => {
      root = await fixture(buttonLinkTestTemplate('sbb-button-link'));
    });

    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders a disabled sbb-button-link with slotted icon', async () => {
    let root: SbbButtonLinkElement;

    beforeEach(async () => {
      root = await fixture(buttonLinkIconTestTemplate('sbb-button-link'));
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
