import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbToggleSlideElement } from './toggle-slide.component.ts';

import '../toggle-slide.ts';

describe(`sbb-toggle-slide ssr`, () => {
  let root: SbbToggleSlideElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-toggle-slide name="name" value="value" disabled>
        <sbb-toggle-slide-unchecked-label>Pull right to start</sbb-toggle-slide-unchecked-label>
        <sbb-toggle-slide-checked-label>Pull left to stop</sbb-toggle-slide-checked-label>
      </sbb-toggle-slide>`,
      {
        modules: ['../toggle-slide.ts'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbToggleSlideElement);
  });
});
