import { assert, expect } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import { html } from 'lit/static-html.js';

import { SbbTeaserHeroElement } from './teaser-hero.js';

const imageUrl = import.meta.resolve('../../elements/core/testing/assets/lucerne.png');

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
});
