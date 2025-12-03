import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbTimeInputElement } from './time-input.component.ts';

describe(`sbb-time-input ssr`, () => {
  let root: SbbTimeInputElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html` <sbb-time-input value="13:30"></sbb-time-input> `, {
      modules: ['./time-input.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTimeInputElement);
  });
});
