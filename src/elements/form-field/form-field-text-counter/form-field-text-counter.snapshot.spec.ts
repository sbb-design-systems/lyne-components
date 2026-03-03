import { expect } from '@open-wc/testing';
import { html } from 'lit';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import './form-field-text-counter.component.ts';
import '../form-field/form-field.component.ts';

describe(`sbb-form-field-text-counter`, () => {
  describe('renders', () => {
    let root: HTMLElement;

    beforeEach(async () => {
      root = await fixture(html`
        <sbb-form-field>
          <label>Description</label>
          <textarea maxlength="100"></textarea>
          <sbb-form-field-text-counter></sbb-form-field-text-counter>
        </sbb-form-field>
      `);
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      const element = root.querySelector('sbb-form-field-text-counter')!;
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
