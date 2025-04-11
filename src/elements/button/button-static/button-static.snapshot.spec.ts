import { expect } from '@open-wc/testing';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';
import {
  buttonSlottedIconTestTemplate,
  buttonTestTemplate,
} from '../common/button-test-utils.private.js';

import type { SbbButtonStaticElement } from './button-static.component.js';

import './button-static.component.js';

describe(`sbb-button-static`, () => {
  let element: SbbButtonStaticElement;

  describe('renders without icon', async () => {
    beforeEach(async () => {
      element = await fixture(buttonTestTemplate('sbb-button-static', true));
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
      element = await fixture(buttonSlottedIconTestTemplate('sbb-button-static'));
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
