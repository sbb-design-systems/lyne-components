import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { SbbChipElement } from '../chip';
import type { SbbImageElement } from '../image';

import { SbbTeaserPaidElement } from './teaser-paid';

import '../chip';
import '../image';

describe('sbb-teaser-paid', () => {
  let element: SbbTeaserPaidElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-teaser-paid>
        <sbb-chip>Label</sbb-chip>
        <sbb-image></sbb-image>
      </sbb-teaser-paid>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTeaserPaidElement);
  });

  it('styles slotted components', async () => {
    const chip = element.querySelector<SbbChipElement>('sbb-chip')!;
    const image = element.querySelector<SbbImageElement>('sbb-image')!;

    expect(image.borderRadius).to.be.equal('none');
    expect(chip).to.have.attribute('color', 'charcoal');
  });
});
