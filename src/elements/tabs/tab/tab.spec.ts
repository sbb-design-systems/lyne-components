import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbTabElement } from './tab.component.js';

describe('sbb-tab', () => {
  let element: SbbTabElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-tab>Content</sbb-tab>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTabElement);
  });
});
