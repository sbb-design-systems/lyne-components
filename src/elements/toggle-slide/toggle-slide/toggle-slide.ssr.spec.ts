import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbToggleSlideElement } from './toggle-slide.component.ts';

import '../../toggle-slide.ts';

describe(`sbb-toggle-slide ssr`, () => {
  let root: SbbToggleSlideElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-toggle-slide id="focus-id" name="name" value="value"></sbb-toggle-slide>`,
      {
        modules: ['../../toggle-slide.ts'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbToggleSlideElement);
  });
});
