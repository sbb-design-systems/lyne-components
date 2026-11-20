import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbAlertElement } from './alert.component.ts';

import '../../alert.ts';
import '../../link.ts';

describe(`sbb-alert`, () => {
  let element: SbbAlertElement;

  describe('should render default properties', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-alert>
          <h3>Interruption</h3>
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
          <h2>Interruption</h2>
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
