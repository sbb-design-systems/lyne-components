import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private';

import { SbbCheckboxPanelElement } from './checkbox-panel';

describe('sbb-checkbox-panel', () => {
  let element: SbbCheckboxPanelElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-checkbox-panel></sbb-checkbox-panel>`, {
      modules: ['./checkbox-panel.ts'],
    });
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCheckboxPanelElement);
  });
});
