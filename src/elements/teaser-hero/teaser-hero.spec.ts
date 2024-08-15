import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { SbbChipElement } from '../chip.js';
import { fixture } from '../core/testing/private.js';
import { waitForLitRender } from '../core/testing.js';
import type { SbbImageElement } from '../image.js';

import { SbbTeaserHeroElement } from './teaser-hero.js';
import '../chip.js';

const imageUrl = import.meta.resolve('../core/testing/assets/lucerne.png');

describe(`sbb-teaser-hero`, () => {
  let element: SbbTeaserHeroElement;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-teaser-hero href="https://www.sbb.ch" image-src=${imageUrl}></sbb-teaser-hero>`,
    );

    assert.instanceOf(element, SbbTeaserHeroElement);
  });

  it('should receive focus', async () => {
    element = await fixture(
      html`<sbb-teaser-hero href="link" id="focus-id">Hero content</sbb-teaser-hero>`,
    );

    element.focus();
    await waitForLitRender(element);

    expect(document.activeElement!.id).to.be.equal('focus-id');
  });

  it('styles slotted components', async () => {
    element = await fixture(
      html`<sbb-teaser-hero href="https://www.sbb.ch" image-src=${imageUrl}>
        <sbb-chip slot="chip">Label</sbb-chip>
      </sbb-teaser-hero>`,
    );

    const chip = element.querySelector<SbbChipElement>('sbb-chip')!;
    const image = element.shadowRoot!.querySelector<SbbImageElement>('sbb-image')!;

    expect(chip).to.have.attribute('color', 'charcoal');
    expect(image).to.have.attribute('data-teaser');
  });
});
