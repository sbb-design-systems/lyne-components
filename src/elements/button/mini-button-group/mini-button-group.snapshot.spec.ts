import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbMiniButtonGroupElement } from './mini-button-group.js';
import './mini-button-group.js';
import '../mini-button.js';
import '../../divider/divider.js';

describe(`sbb-mini-button-group`, () => {
  describe('renders', () => {
    let element: SbbMiniButtonGroupElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-mini-button-group accessibility-label="Group label">
          <sbb-mini-button icon-name="pen-small"></sbb-mini-button>
          <sbb-divider orientation="vertical"></sbb-divider>
          <sbb-mini-button icon-name="pen-small"></sbb-mini-button>
        </sbb-mini-button-group>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders negative', () => {
    let element: SbbMiniButtonGroupElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-mini-button-group negative>
          <sbb-mini-button icon-name="pen-small"></sbb-mini-button>
          <sbb-mini-button icon-name="pen-small"></sbb-mini-button>
        </sbb-mini-button-group>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
