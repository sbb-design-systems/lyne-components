import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbDialogTitleElement } from './dialog-title.component.ts';

describe(`sbb-dialog-title ssr`, () => {
  let root: SbbDialogTitleElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-dialog-title>Title</sbb-dialog-title>`, {
      modules: ['./dialog-title.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbDialogTitleElement);
  });
});
