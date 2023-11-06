import images from '../core/images';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { waitForLitRender } from '../core/testing';
import { SbbTeaserHero } from './teaser-hero';
import '../teaser-hero';
import '../link';
import '../image';

describe('sbb-teaser-hero', () => {
  let element: SbbTeaserHero;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-teaser-hero href="https://www.sbb.ch" image-src="${images[0]}"></sbb-teaser-hero>`,
    );
    assert.instanceOf(element, SbbTeaserHero);
  });

  it('should receive focus', async () => {
    element = await fixture(
      html`<sbb-teaser-hero href="link" id="focus-id">Hero content</sbb-teaser-hero>`,
    );

    element.focus();
    await waitForLitRender(element);

    expect(document.activeElement.id).to.be.equal('focus-id');
  });
});
