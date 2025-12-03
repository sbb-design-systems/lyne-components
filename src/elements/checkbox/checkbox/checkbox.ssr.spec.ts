import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCheckboxElement } from './checkbox.component.ts';

describe(`sbb-checkbox ssr`, () => {
  let root: SbbCheckboxElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-checkbox name="name" value="value">Label</sbb-checkbox>`,
      {
        modules: ['./checkbox.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCheckboxElement);
  });
});
