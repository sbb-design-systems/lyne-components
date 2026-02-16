import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbToggleElement } from './toggle.component.ts';

import '../toggle-option.ts';

describe(`sbb-toggle ssr`, () => {
  let root: SbbToggleElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-toggle value="Value one">
          <sbb-toggle-option id="sbb-toggle-option-1" value="Value one">
            Value one
          </sbb-toggle-option>
          <sbb-toggle-option id="sbb-toggle-option-2" value="Value two">
            Value two
          </sbb-toggle-option>
        </sbb-toggle>
      `,
      { modules: ['./toggle.component.js', '../toggle-option.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbToggleElement);
  });
});
