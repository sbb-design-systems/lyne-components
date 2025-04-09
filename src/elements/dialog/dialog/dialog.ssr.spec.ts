import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbDialogElement } from './dialog.component.js';

import '../dialog-actions.js';
import '../dialog-content.js';
import '../dialog-title.js';

describe(`sbb-dialog ssr`, () => {
  let root: SbbDialogElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-dialog id="my-dialog-1">
          <sbb-dialog-title>Title</sbb-dialog-title>
          <sbb-dialog-content>Dialog content</sbb-dialog-content>
          <sbb-dialog-actions>Action group</sbb-dialog-actions>
        </sbb-dialog>
      `,
      {
        modules: [
          './dialog.component.js',
          '../dialog-actions.js',
          '../dialog-content.js',
          '../dialog-title.js',
        ],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbDialogElement);
  });
});
