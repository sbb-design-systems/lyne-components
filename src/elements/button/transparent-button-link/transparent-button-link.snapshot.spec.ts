import { expect } from '@open-wc/testing';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';
import {
  buttonLinkIconTestTemplate,
  buttonLinkTestTemplate,
} from '../common/button-test-utils.private.ts';

import type { SbbTransparentButtonLinkElement } from './transparent-button-link.component.ts';
import './transparent-button-link.component.ts';

describe(`sbb-transparent-button-link`, () => {
  let element: SbbTransparentButtonLinkElement;

  describe('renders a sbb-transparent-button-link without icon', async () => {
    beforeEach(async () => {
      element = await fixture(buttonLinkTestTemplate('sbb-transparent-button-link'));
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders a disabled sbb-transparent-button-link with slotted icon', async () => {
    beforeEach(async () => {
      element = await fixture(buttonLinkIconTestTemplate('sbb-transparent-button-link'));
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
