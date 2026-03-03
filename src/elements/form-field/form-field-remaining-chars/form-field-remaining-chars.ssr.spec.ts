import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbFormFieldRemainingCharsElement } from './form-field-remaining-chars.component.ts';

import '../../form-field.ts';

describe(`sbb-form-field-remaining-chars ssr`, () => {
  let root: SbbFormFieldRemainingCharsElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-form-field>
          <label>Description</label>
          <textarea maxlength="100"></textarea>
          <sbb-form-field-remaining-chars></sbb-form-field-remaining-chars>
        </sbb-form-field>
      `,
      { modules: ['../form-field.ts', './form-field-remaining-chars.component.ts'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(
      root.querySelector('sbb-form-field-remaining-chars'),
      SbbFormFieldRemainingCharsElement,
    );
  });
});
