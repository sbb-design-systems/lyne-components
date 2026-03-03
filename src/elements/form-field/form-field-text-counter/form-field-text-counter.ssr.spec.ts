import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbFormFieldTextCounterElement } from './form-field-text-counter.component.ts';

import '../../form-field.ts';

describe(`sbb-form-field-text-counter ssr`, () => {
  let root: SbbFormFieldTextCounterElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-form-field>
          <label>Description</label>
          <textarea maxlength="100"></textarea>
          <sbb-form-field-text-counter></sbb-form-field-text-counter>
        </sbb-form-field>
      `,
      { modules: ['../form-field.ts', './form-field-text-counter.component.ts'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(
      root.querySelector('sbb-form-field-text-counter'),
      SbbFormFieldTextCounterElement,
    );
  });
});
