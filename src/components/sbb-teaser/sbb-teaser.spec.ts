import { SbbTeaser } from './sbb-teaser';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-teaser', () => {
  describe('sbb-teaser is stacked', () => {
    it('renders', async () => {
      const { root } = await newSpecPage({
        components: [SbbTeaser],
        html: '<sbb-teaser href-value="https://github.com/lyne-design-system/lyne-components" is-stacked accessibility-label="Sbb teaser" />',
      });

      expect(root).toEqualHtml(`
        <sbb-teaser accessibility-label="Sbb teaser" href-value="https://github.com/lyne-design-system/lyne-components" is-stacked>
          <mock:shadow-root>
           <a aria-label="Sbb teaser" class="teaser  teaser--is-stacked teaser--primary" href="https://github.com/lyne-design-system/lyne-components">
            <span class="teaser__content">
              <span class="teaser__inner">
                <span class='teaser__image-wrapper'><slot name='image'/></span>
                <span class='teaser__text'>
                  <span class='teaser__lead'><slot name='headline'/></span>
                  <span class='teaser__description'><slot name='description'/></span>
                </span>
              </span>
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
        html: '<sbb-teaser href-value="https://github.com/lyne-design-system/lyne-components" accessibility-label="Sbb teaser" />',
      });

      expect(root).toEqualHtml(`
        <sbb-teaser accessibility-label="Sbb teaser" href-value="https://github.com/lyne-design-system/lyne-components">
          <mock:shadow-root>
           <a aria-label="Sbb teaser" class="teaser teaser--primary" href="https://github.com/lyne-design-system/lyne-components">
            <span class="teaser__content">
              <span class="teaser__inner">
                <span class='teaser__image-wrapper'><slot name='image'/></span>
                <span class='teaser__text'>
                  <span class='teaser__lead'><slot name='headline'/></span>
                  <span class='teaser__description'><slot name='description'/></span>
                </span>
              </span>
            </span>
            </a>
          </mock:shadow-root>
        </sbb-teaser>
        `);
    });
  });
});
