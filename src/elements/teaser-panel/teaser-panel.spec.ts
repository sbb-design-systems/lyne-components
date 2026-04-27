import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.ts';

import { SbbTeaserPanelElement } from './teaser-panel.component.ts';
import '../teaser-panel.ts';

describe(`sbb-teaser-panel`, () => {
  let element: SbbTeaserPanelElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-teaser-panel></sbb-teaser-panel>`);

    assert.instanceOf(element, SbbTeaserPanelElement);
  });
});
