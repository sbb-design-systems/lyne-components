import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbDialogCloseButtonElement } from './dialog-close-button.component.ts';

describe(`sbb-dialog-close-button ssr`, () => {
  let root: SbbDialogCloseButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-dialog-close-button></sbb-dialog-close-button>`, {
      modules: ['./dialog-close-button.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbDialogCloseButtonElement);
  });
});
