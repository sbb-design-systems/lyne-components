import { LyneTeaser } from './lyne-teaser';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-teaser', () => {
  describe('lyne-teaser is stacked', () => {
    it('renders', async () => {
      const {
        root
      } = await newSpecPage({
        components: [LyneTeaser],
        html: '<lyne-teaser href-value="https://github.com/lyne-design-system/lyne-components" is-stacked accessibility-label="Lyne teaser" />'
      });

      expect(root)
        .toEqualHtml(`
        <lyne-teaser accessibility-label="Lyne teaser" href-value="https://github.com/lyne-design-system/lyne-components" is-stacked>
          <mock:shadow-root>
           <a aria-label="Lyne teaser" class="teaser  teaser--is-stacked teaser--primary" href="https://github.com/lyne-design-system/lyne-components">
            <div class="teaser__content">
              <div class="teaser__inner">
                <div class="teaser__text"></div>
              </div>
            </div>
            </a>
          </mock:shadow-root>
        </lyne-teaser>
        `);
    });
  });
  describe('lyne-teaser is not stacked', () => {
    it('renders', async () => {
      const {
        root
      } = await newSpecPage({
        components: [LyneTeaser],
        html: '<lyne-teaser href-value="https://github.com/lyne-design-system/lyne-components" accessibility-label="Lyne teaser" />'
      });

      expect(root)
        .toEqualHtml(`
        <lyne-teaser accessibility-label="Lyne teaser" href-value="https://github.com/lyne-design-system/lyne-components">
          <mock:shadow-root>
           <a aria-label="Lyne teaser" class="teaser teaser--primary" href="https://github.com/lyne-design-system/lyne-components">
            <div class="teaser__content">
              <div class="teaser__inner">
                <div class="teaser__text"></div>
              </div>
            </div>
            </a>
          </mock:shadow-root>
        </lyne-teaser>
        `);
    });
  });
});
