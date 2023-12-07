import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbLoadingIndicatorElement } from './loading-indicator';

describe('sbb-loading-indicator', () => {
  let element: SbbLoadingIndicatorElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-loading-indicator></sbb-loading-indicator>`);
    assert.instanceOf(element, SbbLoadingIndicatorElement);
  });
});
