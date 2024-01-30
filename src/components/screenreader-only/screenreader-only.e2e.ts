import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbScreenreaderOnlyElement } from './screenreader-only';

describe('sbb-screenreader-only', () => {
  let element: SbbScreenreaderOnlyElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-screenreader-only></sbb-screenreader-only>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbScreenreaderOnlyElement);
  });
});
