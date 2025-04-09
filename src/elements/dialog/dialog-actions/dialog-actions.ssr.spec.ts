import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbDialogActionsElement } from './dialog-actions.component.js';

describe(`sbb-dialog-actions ssr`, () => {
  let root: SbbDialogActionsElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-dialog-actions></sbb-dialog-actions>`, {
      modules: ['./dialog-actions.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbDialogActionsElement);
  });
});
