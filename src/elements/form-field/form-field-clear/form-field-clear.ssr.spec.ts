import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';
import type { SbbFormFieldElement } from '../form-field/form-field.component.ts';

import { SbbFormFieldClearElement } from './form-field-clear.component.ts';

import '../../form-field.ts';

describe(`sbb-form-field-clear ssr`, () => {
  let root: SbbFormFieldElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html` <sbb-form-field>
        <label>Label</label>
        <input id="input" type="text" placeholder="Input placeholder" value="Input value" />
        <sbb-form-field-clear></sbb-form-field-clear>
      </sbb-form-field>`,
      { modules: ['../../form-field.ts'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root.querySelector('sbb-form-field-clear'), SbbFormFieldClearElement);
  });
});
