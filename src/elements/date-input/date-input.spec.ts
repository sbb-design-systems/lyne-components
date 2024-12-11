import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.js';

import { SbbDateInputElement } from './date-input.js';

describe('sbb-date-input', () => {
  let element: SbbDateInputElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-date-input></sbb-date-input>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbDateInputElement);
  });
});
