import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbLinkStaticElement } from './link-static.component.ts';

describe(`sbb-link-static ssr`, () => {
  let root: SbbLinkStaticElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-link-static id="focus-id">Link static</sbb-link-static>`,
      {
        modules: ['./link-static.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbLinkStaticElement);
  });
});
