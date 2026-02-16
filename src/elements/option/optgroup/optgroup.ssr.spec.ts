import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbOptGroupElement } from './optgroup.component.ts';
import '../option.ts';

describe(`sbb-optgroup ssr`, () => {
  let root: SbbOptGroupElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-optgroup label="Group 1">
          <sbb-option id="option-1" value="option-1">Label 1</sbb-option>
          <sbb-option id="option-2" disabled value="option-2">Label 2</sbb-option>
          <sbb-option id="option-3" value="option-3">Label 3</sbb-option>
        </sbb-optgroup>
      `,
      { modules: ['./optgroup.component.js', '../option.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbOptGroupElement);
  });
});
