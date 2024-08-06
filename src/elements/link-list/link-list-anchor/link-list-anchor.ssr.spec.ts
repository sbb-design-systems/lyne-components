import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbLinkListAnchorElement } from './link-list-anchor.js';
import '../../link.js';

describe(`sbb-link-list-anchor ssr`, () => {
  let root: SbbLinkListAnchorElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html` <sbb-link-list-anchor title-content="Title">
        <sbb-block-link href="#">Link 1</sbb-block-link>
        <sbb-block-link href="#">Link 2</sbb-block-link>
      </sbb-link-list-anchor>`,
      {
        modules: ['./link-list-anchor.js', '../../link.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbLinkListAnchorElement);
  });
});
