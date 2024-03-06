import { expect, fixture } from '@open-wc/testing';

import { waitForLitRender } from '../../core/testing';
import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';
import {
  buttonIconTestTemplate,
  buttonSlottedIconTestTemplate,
  buttonSpaceIconTestTemplate,
  buttonTestTemplate,
} from '../common/button-test-utils';

import type { SbbSecondaryButtonStaticElement } from './secondary-button-static';
import './secondary-button-static';

describe('sbb-secondary-button-static', () => {
  describe('renders a sbb-secondary-button-static without icon', async () => {
    const root = await fixture(buttonTestTemplate('sbb-secondary-button-static', true));

    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders a sbb-secondary-button-static with slotted icon', async () => {
    let root: SbbSecondaryButtonStaticElement;

    beforeEach(async () => {
      root = await fixture(buttonSlottedIconTestTemplate('sbb-secondary-button-static'));
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

  it('should detect icon in sbb-secondary-button-static', async () => {
    const root = await fixture(buttonIconTestTemplate('sbb-secondary-button-static'));
    await waitForLitRender(root);
    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });

  it('should detect icon in sbb-secondary-button-static when there is space around icon', async () => {
    const root = await fixture(buttonSpaceIconTestTemplate('sbb-secondary-button-static'));
    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });
});
