import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbTransparentButtonStaticElement } from './transparent-button-static.component.ts';

import '../../button.ts';

describe(`sbb-transparent-button-static ssr`, () => {
  let root: SbbTransparentButtonStaticElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-transparent-button-static>Button</sbb-transparent-button-static>`,
      { modules: ['../../button.ts'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTransparentButtonStaticElement);
  });
});
