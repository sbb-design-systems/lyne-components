import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';
import type { SbbCardElement } from '../card.js';

import { SbbCardButtonElement } from './card-button.component.js';

import '../card.js';

describe(`sbb-card-button ssr`, () => {
  let root: SbbCardElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-card><sbb-card-button active>Click me</sbb-card-button>Content</sbb-card>`,
      { modules: ['../card.js', './card-button.component.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root.querySelector('sbb-card-button'), SbbCardButtonElement);
  });
});
