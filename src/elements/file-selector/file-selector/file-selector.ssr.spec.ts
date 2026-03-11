import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbFileSelectorElement } from './file-selector.component.ts';

import '../../file-selector.ts';

describe(`sbb-file-selector ssr`, () => {
  let root: SbbFileSelectorElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-file-selector></sbb-file-selector>`, {
      modules: ['../../file-selector.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbFileSelectorElement);
  });
});
