import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbDialogActionsElement } from './dialog-actions.component.ts';

import '../../dialog.ts';

describe(`sbb-dialog-actions ssr`, () => {
  let root: SbbDialogActionsElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-dialog-actions></sbb-dialog-actions>`, {
      modules: ['../../dialog.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbDialogActionsElement);
  });
});
