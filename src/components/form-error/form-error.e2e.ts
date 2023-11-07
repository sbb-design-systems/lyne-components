import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbFormError } from './form-error';

describe('sbb-form-error', () => {
  let element: SbbFormError;

  it('renders', async () => {
    await fixture(html`<sbb-form-error></sbb-form-error>`);

    element = document.querySelector('sbb-form-error');
    assert.instanceOf(element, SbbFormError);
  });
});
