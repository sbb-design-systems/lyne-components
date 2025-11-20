import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbFooterElement } from './footer.component.ts';

describe(`sbb-footer ssr`, () => {
  let root: SbbFooterElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-footer></sbb-footer>`, {
      modules: ['./footer.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbFooterElement);
  });
});
