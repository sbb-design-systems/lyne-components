import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbChipElement } from './chip.js';

describe('sbb-chip', () => {
  let element: SbbChipElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-chip id="focus-id"></sbb-chip>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbChipElement);
  });

  it('should focus the chip', async () => {
    element.focus();

    expect(document.activeElement!.id).to.be.equal('focus-id');
    expect(element.shadowRoot!.activeElement).to.have.class('sbb-chip__label-wrapper');
  });
});
