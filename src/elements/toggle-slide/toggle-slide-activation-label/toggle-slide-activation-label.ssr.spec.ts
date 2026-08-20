import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbToggleSlideActivationLabelElement } from './toggle-slide-activation-label.component.ts';

import '../../toggle-slide.ts';

describe(`sbb-toggle-slide-activation-label ssr`, () => {
  let root: SbbToggleSlideActivationLabelElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-toggle-slide-activation-label>Label</sbb-toggle-slide-activation-label>`,
      {
        modules: ['../../toggle-slide.ts'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbToggleSlideActivationLabelElement);
  });
});
