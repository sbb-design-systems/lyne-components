import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';
import type { SbbFormFieldElement } from '../form-field.ts';

import type { SbbFormFieldClearElement } from './form-field-clear.component.ts';
import './form-field-clear.component.ts';
import '../form-field.ts';

describe(`sbb-form-field-clear`, () => {
  describe('renders', () => {
    let root: SbbFormFieldElement;
    let element: SbbFormFieldClearElement;

    beforeEach(async () => {
      root = await fixture(html`
        <sbb-form-field>
          <label>Label</label>
          <input type="text" placeholder="Input placeholder" value="Input value" />
          <sbb-form-field-clear></sbb-form-field-clear>
        </sbb-form-field>
      `);
      element = root.querySelector('sbb-form-field-clear')!;
    });

    it('form-field DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('form-field-clear Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
