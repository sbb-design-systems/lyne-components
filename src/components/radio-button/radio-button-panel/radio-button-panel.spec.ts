import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import { SbbRadioButtonPanelElement } from './radio-button-panel.js';

describe('sbb-radio-button-panel', () => {
  let element: SbbRadioButtonPanelElement;

  describe('should render unchecked', async () => {
    beforeEach(async () => {
      element = (await fixture(
        html`<sbb-radio-button-panel value="radio-value">
          Label
          <span slot="subtext">Subtext</span>
          <span slot="suffix">Suffix</span>
        </sbb-radio-button-panel>`,
      )) as SbbRadioButtonPanelElement;
      assert.instanceOf(element, SbbRadioButtonPanelElement);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('should render checked', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-radio-button-panel value="radio-value" checked>
          Label
          <span slot="subtext">Subtext</span>
          <span slot="suffix">Suffix</span>
        </sbb-radio-button-panel>`,
      );
    });

    it('renders - Dom', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('renders - ShadowDom', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  testA11yTreeSnapshot(
    html`<sbb-radio-button-panel>Label</sbb-radio-button-panel>`,
    'Unchecked - A11y tree',
  );

  testA11yTreeSnapshot(
    html`<sbb-radio-button-panel checked>Label</sbb-radio-button-panel>`,
    'Checked - A11y tree',
  );
});
