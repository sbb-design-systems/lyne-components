import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbMessage } from './sbb-message';

describe('sbb-message', () => {
  let element: SbbMessage;

  it('renders', async () => {
    await fixture(html`<sbb-message></sbb-message>`);

    element = document.querySelector('sbb-message');
    assert.instanceOf(element, SbbMessage);
  });
});
