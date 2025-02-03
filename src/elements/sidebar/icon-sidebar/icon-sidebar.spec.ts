import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbIconSidebarElement } from './icon-sidebar.js';

describe('sbb-icon-sidebar', () => {
  let element: SbbIconSidebarElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-icon-sidebar></sbb-icon-sidebar>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbIconSidebarElement);
  });
});
