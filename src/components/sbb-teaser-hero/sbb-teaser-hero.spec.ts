import { SbbTeaserHero } from './sbb-teaser-hero';
import { newSpecPage } from '@stencil/core/testing';
import sampleImages from '../../global/images';

describe('sbb-teaser-hero', () => {
  it('should render all properties', async () => {
    const { root } = await newSpecPage({
      components: [SbbTeaserHero],
      html: `<sbb-teaser-hero accessibility-label="label" accessibility-describedby="describedby" accessibility-labelledby="labelledby" href="https://www.sbb.ch" rel="external" target="_blank" id-value="id1" link-content="Find out more" image-src="${sampleImages[1]}" image-alt="SBB CFF FFS Employee">Break out and explore castles and palaces.</sbb-teaser-hero>`,
    });

    expect(root).toEqualHtml(`
      <sbb-teaser-hero accessibility-label="label" accessibility-describedby="describedby" accessibility-labelledby="labelledby" href="https://www.sbb.ch" rel="external" target="_blank" id-value="id1" link-content="Find out more" image-src="${sampleImages[1]}" image-alt="SBB CFF FFS Employee">
          <mock:shadow-root>
            <a
              aria-describedby="describedby"
              aria-label="label. Link target opens in new window."
              aria-labelledby="labelledby"
              class="sbb-teaser-hero"
              dir="ltr"
              id="id1"
              href="https://www.sbb.ch"
              rel="external"
              target="_blank"
            >
              <span class="sbb-teaser-hero__panel">
                <span class="sbb-teaser-hero__panel-text">
                  <slot></slot>
                </span>
                <sbb-link
                  class="sbb-teaser-hero__panel-link"
                  icon-name="chevron-small-right-small"
                  icon-placement="end"
                  text-size="m"
                  negative
                >
                  <slot name="link-content">Find out more</slot>
                </sbb-link>
              </span>
             <slot name="image">
               <sbb-image image-src="${sampleImages[1]}" alt="SBB CFF FFS Employee"></sbb-image>
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
      html: `<sbb-teaser-hero accessibility-label="label" id-value="id1" link-content="Find out more" image-src="${sampleImages[1]}" image-alt="SBB CFF FFS Employee">Break out and explore castles and palaces.</sbb-teaser-hero>`,
    });

    expect(root).toEqualHtml(`
      <sbb-teaser-hero accessibility-label="label" id-value="id1" link-content="Find out more" image-src="${sampleImages[1]}" image-alt="SBB CFF FFS Employee">
          <mock:shadow-root>
            <span
              aria-label="label"
              class="sbb-teaser-hero"
              dir="ltr"
              id="id1"
            >
              <span class="sbb-teaser-hero__panel">
                <span class="sbb-teaser-hero__panel-text">
                  <slot></slot>
                </span>
              </span>
             <slot name="image">
               <sbb-image image-src="${sampleImages[1]}" alt="SBB CFF FFS Employee"></sbb-image>
             </slot>
            </span>
          </mock:shadow-root>
          Break out and explore castles and palaces.
        </sbb-teaser-hero>
      `);
  });

  it('should render with slots', async () => {
    const { root } = await newSpecPage({
      components: [SbbTeaserHero],
      html: `<sbb-teaser-hero accessibility-label="label" href="https://www.sbb.ch">Break out and explore castles and palaces.<span slot="link-content">Find out more</span><sbb-image slot="image" image-src="${sampleImages[1]}" alt="SBB CFF FFS Employee"></sbb-image></sbb-teaser-hero>`,
    });

    expect(root).toEqualHtml(`
      <sbb-teaser-hero accessibility-label="label" href="https://www.sbb.ch">
          <mock:shadow-root>
            <a
              aria-label="label"
              class="sbb-teaser-hero"
              dir="ltr"
              href="https://www.sbb.ch"
            >
              <span class="sbb-teaser-hero__panel">
                <span class="sbb-teaser-hero__panel-text">
                  <slot></slot>
                </span>
                <sbb-link
                  class="sbb-teaser-hero__panel-link"
                  icon-name="chevron-small-right-small"
                  icon-placement="end"
                  text-size="m"
                  negative
                >
                  <slot name="link-content"></slot>
                </sbb-link>
              </span>
             <slot name="image"></slot>
            </a>
          </mock:shadow-root>
          Break out and explore castles and palaces.
          <span slot="link-content">Find out more</span>
          <sbb-image slot="image" image-src="${sampleImages[1]}" alt="SBB CFF FFS Employee"></sbb-image>
        </sbb-teaser-hero>
      `);
  });
});
