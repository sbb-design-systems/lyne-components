import { expect, fixture } from '@open-wc/testing';

import { waitForLitRender } from '../../core/testing';
import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';
import {
  buttonTestTemplate,
  buttonIconTestTemplate,
  buttonSlottedIconTestTemplate,
  buttonSpaceIconTestTemplate,
} from '../common/button-test-utils';

import type { SbbSecondaryButtonElement } from './secondary-button';
import './secondary-button';

describe('sbb-secondary-button', () => {
  describe('renders a sbb-secondary-button without icon', async () => {
    const root = await fixture(buttonTestTemplate('sbb-secondary-button'));

    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders a sbb-secondary-button with slotted icon', async () => {
    let root: SbbSecondaryButtonElement;

    beforeEach(async () => {
      root = await fixture(buttonSlottedIconTestTemplate('sbb-secondary-button'));
      await waitForLitRender(root);
    });

    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  it('should detect icon in sbb-secondary-button', async () => {
    const root = await fixture(buttonIconTestTemplate('sbb-secondary-button'));
    await waitForLitRender(root);
    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });

  it('should detect icon in sbb-secondary-button when there is space around icon', async () => {
    const root = await fixture(buttonSpaceIconTestTemplate('sbb-secondary-button'));
    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });
});
