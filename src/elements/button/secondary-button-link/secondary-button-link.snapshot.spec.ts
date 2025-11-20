import { expect } from '@open-wc/testing';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';
import {
  buttonLinkIconTestTemplate,
  buttonLinkTestTemplate,
} from '../common/button-test-utils.private.ts';

import type { SbbSecondaryButtonLinkElement } from './secondary-button-link.component.ts';
import './secondary-button-link.component.ts';

describe(`sbb-secondary-button-link`, () => {
  let element: SbbSecondaryButtonLinkElement;

  describe('renders a sbb-secondary-button-link without icon', async () => {
    beforeEach(async () => {
      element = await fixture(buttonLinkTestTemplate('sbb-secondary-button-link'));
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders a disabled sbb-secondary-button-link with slotted icon', async () => {
    beforeEach(async () => {
      element = await fixture(buttonLinkIconTestTemplate('sbb-secondary-button-link'));
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
