import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbHintElement } from './hint.component.ts';

import '../../form-field.ts';

describe(`sbb-hint`, () => {
  let element: SbbHintElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-hint></sbb-hint>`);
    assert.instanceOf(element, SbbHintElement);
  });
});
