import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbExpansionPanelHeaderElement } from './expansion-panel-header.component.ts';
import './expansion-panel-header.component.ts';
import '../../icon.ts';

describe(`sbb-expansion-panel-header`, () => {
  describe('renders', () => {
    let element: SbbExpansionPanelHeaderElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-expansion-panel-header>Header</sbb-expansion-panel-header>`,
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

  describe('renders with icon', () => {
    let element: SbbExpansionPanelHeaderElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-expansion-panel-header icon-name="pie-medium"
          >Header</sbb-expansion-panel-header
        >`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with slotted icon', () => {
    let element: SbbExpansionPanelHeaderElement;

    beforeEach(async () => {
      element = await fixture(
        html` <sbb-expansion-panel-header>
          <sbb-icon slot="icon" name="pie-medium"></sbb-icon>
          Header
        </sbb-expansion-panel-header>`,
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
