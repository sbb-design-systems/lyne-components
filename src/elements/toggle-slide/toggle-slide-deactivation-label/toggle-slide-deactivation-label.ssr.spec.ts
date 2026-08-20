import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbToggleSlideDeactivationLabelElement } from './toggle-slide-deactivation-label.component.ts';

import '../../toggle-slide.ts';

describe(`sbb-toggle-slide-deactivation-label ssr`, () => {
  let root: SbbToggleSlideDeactivationLabelElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-toggle-slide-deactivation-label>Label</sbb-toggle-slide-deactivation-label>`,
      {
        modules: ['../../toggle-slide.ts'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbToggleSlideDeactivationLabelElement);
  });
});
