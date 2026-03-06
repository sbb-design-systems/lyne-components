import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbMessageElement } from './message.component.ts';

import '../message.ts';

describe(`sbb-message ssr`, () => {
  let root: SbbMessageElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-message></sbb-message>`, {
      modules: ['../message.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbMessageElement);
  });
});
