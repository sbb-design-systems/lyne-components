import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbTransparentButtonStaticElement } from './transparent-button-static.js';

describe(`sbb-transparent-button-static ssr`, () => {
  let root: SbbTransparentButtonStaticElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-transparent-button-static>Button</sbb-transparent-button-static>`,
      { modules: ['./transparent-button-static.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTransparentButtonStaticElement);
  });
});
