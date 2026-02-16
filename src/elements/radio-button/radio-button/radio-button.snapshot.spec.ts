import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbRadioButtonElement } from './radio-button.component.ts';

import './radio-button.component.ts';

describe(`sbb-radio-button`, () => {
  let element: SbbRadioButtonElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-radio-button value="radio-value" name="radio">Label</sbb-radio-button>`,
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

  testA11yTreeSnapshot(
    html`<sbb-radio-button value="radio-value" name="radio" checked>Label</sbb-radio-button>`,
    'renders checked - A11y tree',
  );
  testA11yTreeSnapshot(
    html`<sbb-radio-button value="radio-value" name="radio" disabled>Label</sbb-radio-button>`,
    'renders disabled - A11y tree',
  );
  testA11yTreeSnapshot(
    html`<sbb-radio-button value="radio-value" name="radio" required>Label</sbb-radio-button>`,
    'renders required - A11y tree',
  );
});
