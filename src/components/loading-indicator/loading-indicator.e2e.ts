import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private/index.js';

import { SbbLoadingIndicatorElement } from './loading-indicator.js';

describe(`sbb-loading-indicator with ${fixture.name}`, () => {
  let element: SbbLoadingIndicatorElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-loading-indicator></sbb-loading-indicator>`, {
      modules: ['./loading-indicator.ts'],
    });
    assert.instanceOf(element, SbbLoadingIndicatorElement);
  });
});
