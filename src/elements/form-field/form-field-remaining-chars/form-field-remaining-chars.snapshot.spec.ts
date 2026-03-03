import { expect } from '@open-wc/testing';
import { html } from 'lit';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import './form-field-remaining-chars.component.ts';
import '../form-field/form-field.component.ts';

describe(`sbb-form-field-remaining-chars`, () => {
  describe('renders', () => {
    let root: HTMLElement;

    beforeEach(async () => {
      root = await fixture(html`
        <sbb-form-field>
          <label>Description</label>
          <textarea maxlength="100"></textarea>
          <sbb-form-field-remaining-chars></sbb-form-field-remaining-chars>
        </sbb-form-field>
      `);
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      const element = root.querySelector('sbb-form-field-remaining-chars')!;
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
