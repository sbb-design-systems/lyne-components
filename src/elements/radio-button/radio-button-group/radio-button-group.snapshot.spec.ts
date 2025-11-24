import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbRadioButtonGroupElement } from './radio-button-group.component.ts';

import './radio-button-group.component.ts';
import '../radio-button.ts';
import '../radio-button-panel.ts';
import '../../selection-expansion-panel.ts';

describe(`sbb-radio-button-group`, () => {
  let element: SbbRadioButtonGroupElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-radio-button-group name="group-1" value="2">
          <sbb-radio-button value="1">1</sbb-radio-button>
          <sbb-radio-button value="2">2</sbb-radio-button>
          <sbb-radio-button value="3">3</sbb-radio-button>
        </sbb-radio-button-group>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['name'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders with panel', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-radio-button-group>
          <sbb-radio-button-panel value="checkbox-1">Label 1</sbb-radio-button-panel>
          <sbb-radio-button-panel value="checkbox-2">Label 2</sbb-radio-button-panel>
          <sbb-radio-button-panel value="checkbox-3">Label 3</sbb-radio-button-panel>
        </sbb-radio-button-group>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['name'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with selection-expansion-panel', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-radio-button-group>
          <sbb-selection-expansion-panel>
            <sbb-radio-button-panel value="checkbox-1">Label 1</sbb-radio-button-panel>
            <sbb-radio-button-panel value="checkbox-2">Label 2</sbb-radio-button-panel>
            <sbb-radio-button-panel value="checkbox-3">Label 3</sbb-radio-button-panel>
          </sbb-selection-expansion-panel>
        </sbb-radio-button-group>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['name'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
