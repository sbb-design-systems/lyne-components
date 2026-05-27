import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbPopoverCloseButtonElement } from './popover-close-button.component.ts';

import '../../popover.ts';

describe(`sbb-popover-close-button ssr`, () => {
  let root: SbbPopoverCloseButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-popover-close-button></sbb-popover-close-button>`, {
      modules: ['../../popover.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbPopoverCloseButtonElement);
  });
});
