import { expect } from '@open-wc/testing';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private/index.js';
import {
  buttonTestTemplate,
  buttonIconTestTemplate,
  buttonSlottedIconTestTemplate,
  buttonSpaceIconTestTemplate,
} from '../common/button-test-utils.js';

import type { SbbButtonElement } from './button.js';

import './button.js';

describe(`sbb-button`, () => {
  describe('renders a sbb-button without icon', async () => {
    let root: SbbButtonElement;

    beforeEach(async () => {
      root = await fixture(buttonTestTemplate('sbb-button'));
    });

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
    });

    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  it('should detect icon in sbb-button', async () => {
    const root = await fixture(buttonIconTestTemplate('sbb-button'));
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
});
