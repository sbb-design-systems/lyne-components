import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbOptionHintElement } from './option-hint.component.js';

describe(`sbb-option-hint ssr`, () => {
  let root: SbbOptionHintElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-option-hint></sbb-option-hint>`, {
      modules: ['./option-hint.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbOptionHintElement);
  });
});
