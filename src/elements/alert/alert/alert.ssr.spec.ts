import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbAlertElement } from './alert.js';

describe(`sbb-alert ssr`, () => {
  let root: SbbAlertElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-alert></sbb-alert>`, { modules: ['./alert.js'] });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbAlertElement);
  });
});
