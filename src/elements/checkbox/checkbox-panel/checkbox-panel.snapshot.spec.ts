import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import { SbbCheckboxPanelElement } from './checkbox-panel.component.ts';

describe('sbb-checkbox-panel', () => {
  let element: SbbCheckboxPanelElement;

  describe('renders unchecked', async () => {
    beforeEach(async () => {
      element = (await fixture(
        html`<sbb-checkbox-panel
          >Label
          <span slot="subtext">Subtext</span>
          <span slot="suffix">Suffix</span>
        </sbb-checkbox-panel>`,
      )) as SbbCheckboxPanelElement;
      assert.instanceOf(element, SbbCheckboxPanelElement);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders checked', async () => {
    beforeEach(async () => {
      element = (await fixture(
        html`<sbb-checkbox-panel checked
          >Label
          <span slot="subtext">Subtext</span>
          <span slot="suffix">Suffix</span>
        </sbb-checkbox-panel>`,
      )) as SbbCheckboxPanelElement;
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders indeterminate', async () => {
    beforeEach(async () => {
      element = (await fixture(
        html`<sbb-checkbox-panel indeterminate
          >Label
          <span slot="subtext">Subtext</span>
          <span slot="suffix">Suffix</span>
        </sbb-checkbox-panel>`,
      )) as SbbCheckboxPanelElement;
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders unchecked disabled', async () => {
    beforeEach(async () => {
      element = (await fixture(
        html`<sbb-checkbox-panel disabled
          >Label
          <span slot="subtext">Subtext</span>
          <span slot="suffix">Suffix</span>
        </sbb-checkbox-panel>`,
      )) as SbbCheckboxPanelElement;
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  testA11yTreeSnapshot(
    html`<sbb-checkbox-panel>Label</sbb-checkbox-panel>`,
    'Unchecked - A11y tree',
  );

  testA11yTreeSnapshot(
    html`<sbb-checkbox-panel checked>Label</sbb-checkbox-panel>`,
    'Checked - A11y tree',
  );
});
