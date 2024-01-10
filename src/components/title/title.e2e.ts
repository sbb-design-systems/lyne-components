import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTitleElement } from './title';

describe('sbb-title', () => {
  let element: SbbTitleElement;

  it('renders', async () => {
    await fixture(html`<sbb-title></sbb-title>`);
    element = document.querySelector<SbbTitleElement>('sbb-title')!;
    assert.instanceOf(element, SbbTitleElement);
  });
});
