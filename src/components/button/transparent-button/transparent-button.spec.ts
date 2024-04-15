import { expect } from '@open-wc/testing';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';
import {
  buttonTestTemplate,
  buttonIconTestTemplate,
  buttonSlottedIconTestTemplate,
  buttonSpaceIconTestTemplate,
} from '../common/button-test-utils.js';

import type { SbbTransparentButtonElement } from './transparent-button.js';
import './transparent-button.js';

describe(`sbb-transparent-button`, () => {
  describe('renders a sbb-transparent-button without icon', async () => {
    let root: SbbTransparentButtonElement;

    beforeEach(async () => {
      root = await fixture(buttonTestTemplate('sbb-transparent-button'));
    });

    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders a sbb-transparent-button with slotted icon', async () => {
    let root: SbbTransparentButtonElement;

    beforeEach(async () => {
      root = await fixture(buttonSlottedIconTestTemplate('sbb-transparent-button'));
    });

    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  it('should detect icon in sbb-transparent-button', async () => {
    const root = await fixture(buttonIconTestTemplate('sbb-transparent-button'));
    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });

  it('should detect icon in sbb-transparent-button when there is space around icon', async () => {
    const root = await fixture(buttonSpaceIconTestTemplate('sbb-transparent-button'));
    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });
});
