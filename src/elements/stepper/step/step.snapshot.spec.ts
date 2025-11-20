import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbStepElement } from './step.component.ts';
import './step.component.ts';

describe('sbb-step', () => {
  describe('renders', () => {
    let element: SbbStepElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-step>Step content</sbb-step>`);
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
