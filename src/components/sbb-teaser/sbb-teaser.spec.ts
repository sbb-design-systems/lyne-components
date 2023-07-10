import { SbbTeaser } from './sbb-teaser';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-teaser', () => {
  describe('sbb-teaser is stacked', () => {
    it('renders', async () => {
      const { root } = await newSpecPage({
        components: [SbbTeaser],
        html: '<sbb-teaser href="https://github.com/lyne-design-system/lyne-components" is-stacked aria-label="Sbb teaser"></sbb-teaser>',
      });

      expect(root).toEqualHtml(`
        <sbb-teaser aria-label="Sbb teaser" href="https://github.com/lyne-design-system/lyne-components" is-stacked role="link" tabindex="0" dir="ltr">
          <mock:shadow-root>
            <a class="sbb-teaser" href="https://github.com/lyne-design-system/lyne-components" role="gridcell" tabindex="-1">
              <span class="sbb-teaser__container">
                <span class='sbb-teaser__image-wrapper'><slot name='image'/></span>
                <span class='sbb-teaser__text'>
                  <sbb-title class="sbb-teaser__lead" level="5" visuallevel="5">
                    <slot name='title'/>
                  </sbb-title>
                <p class='sbb-teaser__description'><slot name='description'/></p>
              </span>
            </a>
          </mock:shadow-root>
        </sbb-teaser>
        `);
    });
  });
  describe('sbb-teaser is not stacked', () => {
    it('renders', async () => {
      const { root } = await newSpecPage({
        components: [SbbTeaser],
        html: '<sbb-teaser href="https://github.com/lyne-design-system/lyne-components" aria-label="Sbb teaser" />',
      });

      expect(root).toEqualHtml(`
        <sbb-teaser aria-label="Sbb teaser" href="https://github.com/lyne-design-system/lyne-components" role="link" tabindex="0" dir="ltr">
          <mock:shadow-root>
            <a class="sbb-teaser" href="https://github.com/lyne-design-system/lyne-components" role="gridcell" tabindex="-1">
              <span class="sbb-teaser__container">
                <span class='sbb-teaser__image-wrapper'><slot name='image'/></span>
                  <span class='sbb-teaser__text'>
                    <sbb-title class="sbb-teaser__lead" level="5" visuallevel="5">
                      <slot name='title'/>
                    </sbb-title>
                  <p class='sbb-teaser__description'><slot name='description'/></p>
                </span>
              </span>
            </a>
          </mock:shadow-root>
        </sbb-teaser>
        `);
    });
  });
});
