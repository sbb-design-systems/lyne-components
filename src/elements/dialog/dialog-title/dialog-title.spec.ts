import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbDialogTitleElement } from './dialog-title.component.ts';

describe('sbb-dialog-title', () => {
  let element: SbbDialogTitleElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-dialog-title>Title</sbb-dialog-title>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbDialogTitleElement);
  });
});
