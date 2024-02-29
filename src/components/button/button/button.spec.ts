import { expect, fixture } from '@open-wc/testing';

import { waitForLitRender } from '../../core/testing';
import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';
import {
  buttonTestTemplate,
  buttonIconTestTemplate,
  buttonSlottedIconTestTemplate,
  buttonSpaceIconTestTemplate,
} from '../common/button-test-utils';

import type { SbbButtonElement } from './button';
import './button';

describe('sbb-button', () => {
  describe('renders a sbb-button without icon', async () => {
    const root = await fixture(buttonTestTemplate('sbb-button'));

    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders a sbb-button with slotted icon', async () => {
    let root: SbbButtonElement;

    beforeEach(async () => {
      root = await fixture(buttonSlottedIconTestTemplate('sbb-button'));
      await waitForLitRender(root);
    });

    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });

  it('should detect icon in sbb-button', async () => {
    const root = await fixture(buttonIconTestTemplate('sbb-button'));
    await waitForLitRender(root);
    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });

  it('should detect icon in sbb-button when there is space around icon', async () => {
    const root = await fixture(buttonSpaceIconTestTemplate('sbb-button'));
    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });

  testA11yTreeSnapshot();
});
