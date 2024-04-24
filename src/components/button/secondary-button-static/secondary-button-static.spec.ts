import { expect } from '@open-wc/testing';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';
import {
  buttonIconTestTemplate,
  buttonSlottedIconTestTemplate,
  buttonSpaceIconTestTemplate,
  buttonTestTemplate,
} from '../common/button-test-utils.js';

import type { SbbSecondaryButtonStaticElement } from './secondary-button-static.js';
import './secondary-button-static.js';

describe(`sbb-secondary-button-static`, () => {
  describe('renders a sbb-secondary-button-static without icon', async () => {
    let root: SbbSecondaryButtonStaticElement;

    beforeEach(async () => {
      root = await fixture(buttonTestTemplate('sbb-secondary-button-static', true));
    });

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
