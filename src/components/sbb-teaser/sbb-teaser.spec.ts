import { SbbTeaser } from './sbb-teaser';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-teaser', () => {
  describe('sbb-teaser is stacked', () => {
    it('renders', async () => {
      const {
        root
      } = await newSpecPage({
        components: [SbbTeaser],
        html: '<sbb-teaser href-value="https://github.com/lyne-design-system/lyne-components" is-stacked accessibility-label="Sbb teaser" />'
      });

      expect(root)
        .toEqualHtml(`
        <sbb-teaser accessibility-label="Sbb teaser" href-value="https://github.com/lyne-design-system/lyne-components" is-stacked>
          <mock:shadow-root>
           <a aria-label="Sbb teaser" class="teaser  teaser--is-stacked teaser--primary" href="https://github.com/lyne-design-system/lyne-components">
            <div class="teaser__content">
              <div class="teaser__inner">
                <div class='teaser__wrapper'><slot name='image'/></div>
                <div class='teaser__text'>
                  <div class='teaser__lead'><slot name='headline'/></div>
                  <div class='teaser__description'><slot name='description'/></div>
                </div>
              </div>
            </div>
            </a>
          </mock:shadow-root>
        </sbb-teaser>
        `);
    });
  });
  describe('sbb-teaser is not stacked', () => {
    it('renders', async () => {
      const {
        root
      } = await newSpecPage({
        components: [SbbTeaser],
        html: '<sbb-teaser href-value="https://github.com/lyne-design-system/lyne-components" accessibility-label="Sbb teaser" />'
      });

      expect(root)
        .toEqualHtml(`
        <sbb-teaser accessibility-label="Sbb teaser" href-value="https://github.com/lyne-design-system/lyne-components">
          <mock:shadow-root>
           <a aria-label="Sbb teaser" class="teaser teaser--primary" href="https://github.com/lyne-design-system/lyne-components">
            <div class="teaser__content">
              <div class="teaser__inner">
                <div class='teaser__wrapper'><slot name='image'/></div>
                <div class='teaser__text'>
                  <div class='teaser__lead'><slot name='headline'/></div>
                  <div class='teaser__description'><slot name='description'/></div>
                </div>
              </div>
            </div>
            </a>
          </mock:shadow-root>
        </sbb-teaser>
        `);
    });
  });
});
