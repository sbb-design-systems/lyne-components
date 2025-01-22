import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbChipGroupElement } from './chip-group.js';
import '../chip.js';
import '../../form-field.js';

describe(`sbb-chip-group ssr`, () => {
  let root: SbbChipGroupElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html` <sbb-form-field>
        <sbb-chip-group>
          <sbb-chip value="Value"></sbb-chip>
        </sbb-chip-group>
        <input />
      </sbb-form-field>`,
      {
        modules: ['./chip-group.js', '../chip.js', '../../form-field.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbChipGroupElement);
  });
});
