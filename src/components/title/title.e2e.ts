import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing';

import { SbbTitleElement } from './title';

describe(`sbb-title with ${fixture.name}`, () => {
  let element: SbbTitleElement;

  it('renders', async () => {
    await fixture(html`<sbb-title></sbb-title>`, { modules: ['./title.ts'] });
    element = document.querySelector<SbbTitleElement>('sbb-title')!;
    assert.instanceOf(element, SbbTitleElement);
  });
});
