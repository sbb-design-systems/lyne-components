import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbMessage } from './message';

describe('sbb-message', () => {
  let element: SbbMessage;

  it('renders', async () => {
    element = await fixture(html`<sbb-message></sbb-message>`);
    assert.instanceOf(element, SbbMessage);
  });
});
