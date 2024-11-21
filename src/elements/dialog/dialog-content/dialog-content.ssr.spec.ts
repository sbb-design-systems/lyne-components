import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbDialogContentElement } from './dialog-content.js';

describe(`sbb-dialog-content ssr`, () => {
  let root: SbbDialogContentElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-dialog-content>Content</sbb-dialog-content>`, {
      modules: ['./dialog-content.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbDialogContentElement);
  });
});
