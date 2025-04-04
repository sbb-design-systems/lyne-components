import { expect } from '@open-wc/testing';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';
import {
  buttonSlottedIconTestTemplate,
  buttonTestTemplate,
} from '../common/button-test-utils.private.js';

import type { SbbTransparentButtonStaticElement } from './transparent-button-static.js';

import './transparent-button-static.js';

describe(`sbb-transparent-button-static`, () => {
  let element: SbbTransparentButtonStaticElement;

  describe('renders without icon', async () => {
    beforeEach(async () => {
      element = await fixture(buttonTestTemplate('sbb-transparent-button-static', true));
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with slotted icon', async () => {
    beforeEach(async () => {
      element = await fixture(buttonSlottedIconTestTemplate('sbb-transparent-button-static'));
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
