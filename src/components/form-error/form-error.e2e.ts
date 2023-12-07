import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbFormErrorElement } from './form-error';

describe('sbb-form-error', () => {
  let element: SbbFormErrorElement;

  it('renders', async () => {
    await fixture(html`<sbb-form-error></sbb-form-error>`);

    element = document.querySelector('sbb-form-error');
    assert.instanceOf(element, SbbFormErrorElement);
  });
});
