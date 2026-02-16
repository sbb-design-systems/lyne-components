import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbErrorElement } from './error.component.ts';

describe(`sbb-error`, () => {
  let element: SbbErrorElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-error></sbb-error>`);
    assert.instanceOf(element, SbbErrorElement);
  });
});
