import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbDialogContentElement } from './dialog-content.component.ts';

describe(`sbb-dialog-content ssr`, () => {
  let root: SbbDialogContentElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-dialog-content>Content</sbb-dialog-content>`, {
      modules: ['./dialog-content.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbDialogContentElement);
  });
});
