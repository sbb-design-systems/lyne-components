import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbFooterElement } from './footer.js';

describe(`sbb-footer ssr`, () => {
  let root: SbbFooterElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-footer></sbb-footer>`, { modules: ['./footer.js'] });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbFooterElement);
  });
});
