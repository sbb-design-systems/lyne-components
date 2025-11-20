import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbOverlayElement } from './overlay.component.ts';

describe(`sbb-overlay ssr`, () => {
  let root: SbbOverlayElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-overlay id="my-overlay-1" accessibility-label="Label">
          <p>Overlay content</p>
        </sbb-overlay>
      `,
      { modules: ['./overlay.component.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbOverlayElement);
  });
});
