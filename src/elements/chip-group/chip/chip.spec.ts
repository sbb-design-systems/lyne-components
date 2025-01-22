import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbChipElement } from './chip.js';

describe('sbb-chip', () => {
  let element: SbbChipElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-chip></sbb-chip>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbChipElement);
  });
});
