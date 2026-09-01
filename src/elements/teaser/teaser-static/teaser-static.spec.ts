import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbTeaserStaticElement } from './teaser-static.component.ts';

import '../../teaser.ts';

describe(`sbb-teaser-static`, () => {
  let element: SbbTeaserStaticElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-teaser-static>Content</sbb-teaser-static>`);
  });

  it('should render', async () => {
    assert.instanceOf(element, SbbTeaserStaticElement);
  });
});
