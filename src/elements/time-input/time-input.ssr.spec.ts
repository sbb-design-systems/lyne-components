import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbTimeInputElement } from './time-input.component.js';

describe(`sbb-time-input ssr`, () => {
  let root: SbbTimeInputElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-time-input input="input-1"></sbb-time-input>
        <input id="input-1" />
      `,
      { modules: ['./time-input.component.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTimeInputElement);
  });
});
