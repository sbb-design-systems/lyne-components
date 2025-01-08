import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbSidebarElement } from './sidebar.js';

describe('sbb-sidebar', () => {
  let element: SbbSidebarElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-sidebar></sbb-sidebar>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSidebarElement);
  });
});
