import { expect } from '@open-wc/testing';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';
import {
  buttonLinkIconTestTemplate,
  buttonLinkTestTemplate,
} from '../common/button-test-utils.private.ts';

import type { SbbAccentButtonLinkElement } from './accent-button-link.component.ts';
import './accent-button-link.component.ts';

describe(`sbb-accent-button-link`, () => {
  let element: SbbAccentButtonLinkElement;

  describe('renders a sbb-accent-button-link without icon', async () => {
    beforeEach(async () => {
      element = await fixture(buttonLinkTestTemplate('sbb-accent-button-link'));
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders a disabled sbb-accent-button-link with slotted icon', async () => {
    beforeEach(async () => {
      element = await fixture(buttonLinkIconTestTemplate('sbb-accent-button-link'));
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
