import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbAlertElement } from './alert.js';

import './alert.js';

describe(`sbb-alert`, () => {
  let element: SbbAlertElement;

  describe('should render default properties', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-alert title-content="Interruption">Alert content</sbb-alert>`,
      );
    });
    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });
    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('should render customized properties', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-alert
          title-content="Interruption"
          title-level="2"
          size="l"
          icon-name="disruption"
          accessibility-label="label"
          href="https://www.sbb.ch"
          rel="noopener"
          target="_blank"
          link-content="Show much more"
          >Alert content</sbb-alert
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

  testA11yTreeSnapshot(html`
    <sbb-alert
      title-content="Interruption"
      href="https://www.sbb.ch"
      accessibility-label="test-a11y-label"
    >
      Alert content
    </sbb-alert>
  `);
});
