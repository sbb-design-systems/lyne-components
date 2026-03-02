import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.ts';

import { SbbBarContainerElement } from './bar-container.component.ts';

describe('sbb-bar-container', () => {
  let element: SbbBarContainerElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-bar-container></sbb-bar-container>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbBarContainerElement);
  });
});
