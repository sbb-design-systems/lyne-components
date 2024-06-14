import { assert, expect } from '@open-wc/testing';
import type { SbbChipElement } from '@sbb-esta/lyne-elements/chip.js';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import type { SbbImageElement } from '@sbb-esta/lyne-elements/image.js';
import { html } from 'lit/static-html.js';

import { SbbTeaserPaidElement } from './teaser-paid.js';

import '@sbb-esta/lyne-elements/chip.js';
import '@sbb-esta/lyne-elements/image.js';

describe(`sbb-teaser-paid`, () => {
  let element: SbbTeaserPaidElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-teaser-paid>
        <sbb-chip slot="chip">Label</sbb-chip>
        <sbb-image slot="image"></sbb-image>
      </sbb-teaser-paid>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTeaserPaidElement);
  });

  it('styles slotted components', async () => {
    const chip = element.querySelector<SbbChipElement>('sbb-chip')!;
    const image = element.querySelector<SbbImageElement>('sbb-image')!;

    expect(chip).to.have.attribute('color', 'charcoal');
    expect(image).to.have.attribute('data-teaser');
  });
});
