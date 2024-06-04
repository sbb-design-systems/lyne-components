import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { fixture } from '../../core/testing/private.js';
import type { SbbFormFieldElement } from '../../form-field.js';

import { SbbOptionElement } from './option.js';

import '../../form-field.js';
import '../../autocomplete.js';

describe(`sbb-option ${fixture.name}`, () => {
  let root: SbbFormFieldElement;

  beforeEach(async () => {
    root = await fixture(
      html`
        <sbb-form-field>
          <input />
          <sbb-autocomplete>
            <sbb-option id="option-1" value="1">Option 1</sbb-option>
            <sbb-option id="option-2" value="2">Option 2</sbb-option>
            <sbb-option id="option-3" value="3">Option 3</sbb-option>
          </sbb-autocomplete>
        </sbb-form-field>
      `,
      { modules: ['../../form-field.js', '../../autocomplete.js', './option.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root.querySelector('sbb-option'), SbbOptionElement);
  });
});
