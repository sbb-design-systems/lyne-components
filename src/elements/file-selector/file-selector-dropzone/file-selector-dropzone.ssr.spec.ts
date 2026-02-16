import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbFileSelectorDropzoneElement } from './file-selector-dropzone.component.ts';

describe(`sbb-file-selector-dropzone ssr`, () => {
  let root: SbbFileSelectorDropzoneElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-file-selector-dropzone></sbb-file-selector-dropzone>`,
      {
        modules: ['./file-selector-dropzone.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbFileSelectorDropzoneElement);
  });
});
