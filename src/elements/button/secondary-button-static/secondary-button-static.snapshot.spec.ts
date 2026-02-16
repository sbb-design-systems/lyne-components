import { expect } from '@open-wc/testing';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';
import {
  buttonSlottedIconTestTemplate,
  buttonTestTemplate,
} from '../common/button-test-utils.private.ts';

import type { SbbSecondaryButtonStaticElement } from './secondary-button-static.component.ts';

import './secondary-button-static.component.ts';

describe(`sbb-secondary-button-static`, () => {
  let element: SbbSecondaryButtonStaticElement;

  describe('renders without icon', async () => {
    beforeEach(async () => {
      element = await fixture(buttonTestTemplate('sbb-secondary-button-static', true));
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
      element = await fixture(buttonSlottedIconTestTemplate('sbb-secondary-button-static'));
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
