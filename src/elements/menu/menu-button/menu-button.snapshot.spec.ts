import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbMenuButtonElement } from './menu-button.component.ts';

import './menu-button.component.ts';

describe(`sbb-menu-button`, () => {
  describe('renders', () => {
    let element: SbbMenuButtonElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-menu-button form="formid" name="name" type="submit" aria-label="a11y label">
          Action
        </sbb-menu-button>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders component with icon', () => {
    let element: SbbMenuButtonElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-menu-button icon-name="menu-small">Action</sbb-menu-button>
      `);
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
