import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbAlertElement } from './alert.component.ts';

import './alert.component.ts';
import '../../link/link.ts';
import '../../title.ts';

describe(`sbb-alert`, () => {
  let element: SbbAlertElement;

  describe('should render default properties', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-alert>
          <sbb-title level="3">Interruption</sbb-title>
          Alert content
        </sbb-alert>`,
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
        html`<sbb-alert size="l" icon-name="disruption">
          <sbb-title level="2">Interruption</sbb-title>
          Alert content Alert content <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
        </sbb-alert>`,
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
});
