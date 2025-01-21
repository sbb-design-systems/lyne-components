import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbSidebarCloseButtonElement } from './sidebar-close-button.js';

describe('sbb-sidebar-close-button', () => {
  let element: SbbSidebarCloseButtonElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-sidebar-close-button></sbb-sidebar-close-button>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSidebarCloseButtonElement);
  });
});
