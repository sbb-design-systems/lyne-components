import { SbbTeaserHero } from './sbb-teaser-hero';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-teaser-hero', () => {
  it('should render all properties', async () => {
    const { root } = await newSpecPage({
      components: [SbbTeaserHero],
      html: '<sbb-teaser-hero accessibility-label="label" accessibility-describedby="describedby" accessibility-labelledby="labelledby" href="https://www.sbb.ch" rel="external" target="_blank" id-value="id1" link-content="Find out more" image-src="https://cdn.img.sbb.ch/content/dam/internet/sharedimages/personen/frau-im-ferien.jpg?crop=focalpoint&fp-x=0.5053125&fp-y=0.6458333" image-alt="SBB CFF FFS Employee">Break out and explore castles and palaces.</sbb-teaser-hero>',
    });

    expect(root).toEqualHtml(`
      <sbb-teaser-hero accessibility-label="label" accessibility-describedby="describedby" accessibility-labelledby="labelledby" href="https://www.sbb.ch" rel="external" target="_blank" id-value="id1" link-content="Find out more" image-src="https://cdn.img.sbb.ch/content/dam/internet/sharedimages/personen/frau-im-ferien.jpg?crop=focalpoint&fp-x=0.5053125&fp-y=0.6458333" image-alt="SBB CFF FFS Employee">
          <mock:shadow-root>
            <a
              aria-describedby="describedby"
              aria-label="label. Link target opens in new window."
              aria-labelledby="labelledby"
              class="teaser-hero"
              dir="ltr"
              id="id1"
              href="https://www.sbb.ch"
              rel="external"
              target="_blank"
            >
              <span class="teaser-hero__panel">
                <span class="teaser-hero__panel-text">
                  <slot></slot>
                </span>
                <sbb-link
                  class="teaser-hero__panel-link"
                  icon-name="chevron-small-right-small"
                  icon-placement="end"
                  text-size="m"
                  negative
                >
                  <slot name="link-content">Find out more</slot>
                </sbb-link>
              </span>
             <slot name="image">
               <sbb-image image-src="https://cdn.img.sbb.ch/content/dam/internet/sharedimages/personen/frau-im-ferien.jpg?crop=focalpoint&fp-x=0.5053125&fp-y=0.6458333" image-alt="SBB CFF FFS Employee"></sbb-image>
             </slot>
            </a>
          </mock:shadow-root>
          Break out and explore castles and palaces.
        </sbb-teaser-hero>
      `);
  });

  it('should render without link', async () => {
    const { root } = await newSpecPage({
      components: [SbbTeaserHero],
      html: '<sbb-teaser-hero accessibility-label="label" accessibility-describedby="describedby" accessibility-labelledby="labelledby" href="https://www.sbb.ch" rel="external" target="_blank" id-value="id1" link-content="Find out more" image-src="https://cdn.img.sbb.ch/content/dam/internet/sharedimages/personen/frau-im-ferien.jpg?crop=focalpoint&fp-x=0.5053125&fp-y=0.6458333" image-alt="SBB CFF FFS Employee">Break out and explore castles and palaces.</sbb-teaser-hero>',
    });

    expect(root).toEqualHtml(`
      <sbb-teaser-hero accessibility-label="label" accessibility-describedby="describedby" accessibility-labelledby="labelledby" href="https://www.sbb.ch" rel="external" target="_blank" id-value="id1" link-content="Find out more" image-src="https://cdn.img.sbb.ch/content/dam/internet/sharedimages/personen/frau-im-ferien.jpg?crop=focalpoint&fp-x=0.5053125&fp-y=0.6458333" image-alt="SBB CFF FFS Employee">
          <mock:shadow-root>
            <a
              aria-describedby="describedby"
              aria-label="label. Link target opens in new window."
              aria-labelledby="labelledby"
              class="teaser-hero"
              dir="ltr"
              id="id1"
              href="https://www.sbb.ch"
              rel="external"
              target="_blank"
            >
              <span class="teaser-hero__panel">
                <span class="teaser-hero__panel-text">
                  <slot></slot>
                </span>
                <sbb-link
                  class="teaser-hero__panel-link"
                  icon-name="chevron-small-right-small"
                  icon-placement="end"
                  text-size="m"
                  negative
                >
                  <slot name="link-content">Find out more</slot>
                </sbb-link>
              </span>
             <slot name="image">
               <sbb-image image-src="https://cdn.img.sbb.ch/content/dam/internet/sharedimages/personen/frau-im-ferien.jpg?crop=focalpoint&fp-x=0.5053125&fp-y=0.6458333" image-alt="SBB CFF FFS Employee"></sbb-image>
             </slot>
            </a>
          </mock:shadow-root>
          Break out and explore castles and palaces.
        </sbb-teaser-hero>
      `);
  });

  it('should render with slots', async () => {
    const { root } = await newSpecPage({
      components: [SbbTeaserHero],
      html: '<sbb-teaser-hero accessibility-label="label" accessibility-describedby="describedby" accessibility-labelledby="labelledby" href="https://www.sbb.ch" rel="external" target="_blank" id-value="id1" link-content="Find out more" image-src="https://cdn.img.sbb.ch/content/dam/internet/sharedimages/personen/frau-im-ferien.jpg?crop=focalpoint&fp-x=0.5053125&fp-y=0.6458333" image-alt="SBB CFF FFS Employee">Break out and explore castles and palaces.</sbb-teaser-hero>',
    });

    expect(root).toEqualHtml(`
      <sbb-teaser-hero accessibility-label="label" accessibility-describedby="describedby" accessibility-labelledby="labelledby" href="https://www.sbb.ch" rel="external" target="_blank" id-value="id1" link-content="Find out more" image-src="https://cdn.img.sbb.ch/content/dam/internet/sharedimages/personen/frau-im-ferien.jpg?crop=focalpoint&fp-x=0.5053125&fp-y=0.6458333" image-alt="SBB CFF FFS Employee">
          <mock:shadow-root>
            <a
              aria-describedby="describedby"
              aria-label="label. Link target opens in new window."
              aria-labelledby="labelledby"
              class="teaser-hero"
              dir="ltr"
              id="id1"
              href="https://www.sbb.ch"
              rel="external"
              target="_blank"
            >
              <span class="teaser-hero__panel">
                <span class="teaser-hero__panel-text">
                  <slot></slot>
                </span>
                <sbb-link
                  class="teaser-hero__panel-link"
                  icon-name="chevron-small-right-small"
                  icon-placement="end"
                  text-size="m"
                  negative
                >
                  <slot name="link-content">Find out more</slot>
                </sbb-link>
              </span>
             <slot name="image">
               <sbb-image image-src="https://cdn.img.sbb.ch/content/dam/internet/sharedimages/personen/frau-im-ferien.jpg?crop=focalpoint&fp-x=0.5053125&fp-y=0.6458333" image-alt="SBB CFF FFS Employee"></sbb-image>
             </slot>
            </a>
          </mock:shadow-root>
          Break out and explore castles and palaces.
        </sbb-teaser-hero>
      `);
  });
});
