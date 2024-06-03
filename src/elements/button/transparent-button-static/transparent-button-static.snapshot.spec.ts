import { expect } from '@open-wc/testing';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';
import {
  buttonIconTestTemplate,
  buttonSlottedIconTestTemplate,
  buttonSpaceIconTestTemplate,
  buttonTestTemplate,
} from '../common/button-test-utils.js';

import type { SbbTransparentButtonStaticElement } from './transparent-button-static.js';
import './transparent-button-static.js';

describe(`sbb-transparent-button-static`, () => {
  describe('renders a sbb-transparent-button-static without icon', async () => {
    let root: SbbTransparentButtonStaticElement;

    beforeEach(async () => {
      root = await fixture(buttonTestTemplate('sbb-transparent-button-static', true));
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders a sbb-transparent-button-static with slotted icon', async () => {
    let root: SbbTransparentButtonStaticElement;

    beforeEach(async () => {
      root = await fixture(buttonSlottedIconTestTemplate('sbb-transparent-button-static'));
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  it('should detect icon in sbb-transparent-button-static', async () => {
    const root = await fixture(buttonIconTestTemplate('sbb-transparent-button-static'));
    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });

  it('should detect icon in sbb-transparent-button-static when there is space around icon', async () => {
    const root = await fixture(buttonSpaceIconTestTemplate('sbb-transparent-button-static'));
    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });
});
