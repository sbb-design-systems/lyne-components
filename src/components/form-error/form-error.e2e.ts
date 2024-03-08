import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing';

import { SbbFormErrorElement } from './form-error';

describe(`sbb-form-error with ${fixture.name}`, () => {
  let element: SbbFormErrorElement;

  it('renders', async () => {
    await fixture(html`<sbb-form-error></sbb-form-error>`, { modules: ['./form-error.ts'] });

    element = document.querySelector<SbbFormErrorElement>('sbb-form-error')!;
    assert.instanceOf(element, SbbFormErrorElement);
  });
});
