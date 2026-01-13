import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbTabNavBarElement } from './tab-nav-bar.component.ts';

describe('sbb-tab-nav-bar', () => {
  let element: SbbTabNavBarElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-tab-nav-bar></sbb-tab-nav-bar>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTabNavBarElement);
  });
});
