import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbCheckboxGroupElement } from './checkbox-group.component.js';

import './checkbox-group.component.js';
import '../checkbox.js';
import '../checkbox-panel.js';
import '../../selection-expansion-panel.js';

describe(`sbb-checkbox-group`, () => {
  let element: SbbCheckboxGroupElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-checkbox-group>
          <sbb-checkbox value="checkbox-1">Label 1</sbb-checkbox>
          <sbb-checkbox value="checkbox-2">Label 2</sbb-checkbox>
          <sbb-checkbox value="checkbox-3">Label 3</sbb-checkbox>
        </sbb-checkbox-group>
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

  describe('renders with panel', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-checkbox-group>
          <sbb-checkbox-panel value="checkbox-1">Label 1</sbb-checkbox-panel>
          <sbb-checkbox-panel value="checkbox-2">Label 2</sbb-checkbox-panel>
          <sbb-checkbox-panel value="checkbox-3">Label 3</sbb-checkbox-panel>
        </sbb-checkbox-group>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with selection-expansion-panel', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-checkbox-group>
          <sbb-selection-expansion-panel>
            <sbb-checkbox-panel value="checkbox-1">Label 1</sbb-checkbox-panel>
            <sbb-checkbox-panel value="checkbox-2">Label 2</sbb-checkbox-panel>
            <sbb-checkbox-panel value="checkbox-3">Label 3</sbb-checkbox-panel>
          </sbb-selection-expansion-panel>
        </sbb-checkbox-group>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
