import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCheckboxGroupElement } from './checkbox-group.component.ts';

import '../checkbox.ts';

describe(`sbb-checkbox-group ssr`, () => {
  let root: SbbCheckboxGroupElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-checkbox-group>
          <sbb-checkbox id="checkbox-1" value="checkbox-1">Label 1</sbb-checkbox>
          <sbb-checkbox id="checkbox-2" disabled value="checkbox-2">Label 2</sbb-checkbox>
          <sbb-checkbox id="checkbox-3" value="checkbox-3">Label 3</sbb-checkbox>
        </sbb-checkbox-group>
      `,
      { modules: ['./checkbox-group.component.js', '../checkbox.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCheckboxGroupElement);
  });
});
