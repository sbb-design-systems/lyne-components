import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbButtonStaticElement } from './button-static.component.ts';

describe(`sbb-button-static ssr`, () => {
  let root: SbbButtonStaticElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-button-static>I am a static button</sbb-button-static>`,
      {
        modules: ['./button-static.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbButtonStaticElement);
  });
});
