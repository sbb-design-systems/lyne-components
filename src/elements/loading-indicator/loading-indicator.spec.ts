import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.ts';

import { SbbLoadingIndicatorElement } from './loading-indicator.component.ts';

describe(`sbb-loading-indicator`, () => {
  let element: SbbLoadingIndicatorElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-loading-indicator></sbb-loading-indicator>`);
    assert.instanceOf(element, SbbLoadingIndicatorElement);
  });
});
