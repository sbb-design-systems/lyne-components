import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbFileSelectorElement } from './file-selector.component.js';

describe(`sbb-file-selector ssr`, () => {
  let root: SbbFileSelectorElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-file-selector></sbb-file-selector>`, {
      modules: ['./file-selector.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbFileSelectorElement);
  });
});
