import { LyneTeaser } from './lyne-teaser';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-teaser', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTeaser],
      html: '<lyne-teaser href-value="https://github.com/lyne-design-system/lyne-components" img-src="https://via.placeholder.com/400x300" img-alt="400x300 image" is-stacked accessibility-label="Lyne teaser" />'
    });

    expect(root)
      .toEqualHtml(`
      <lyne-teaser accessibility-label="Lyne teaser" href-value="https://github.com/lyne-design-system/lyne-components" img-src="https://via.placeholder.com/400x300" img-alt="400x300 image" is-stacked>
        <mock:shadow-root>
         <a aria-label="Lyne teaser" class="teaser teaser--is-stacked teaser--primary" href="https://github.com/lyne-design-system/lyne-components">
           <div class="teaser__content">
             <div class="teaser__inner">
              <div class="teaser__wrapper">
                <img alt="400x300 image" class="teaser__image" src="https://via.placeholder.com/400x300">
              </div>
               <div class="teaser__text">
                 <lyne-title class="teaser__lead" level="5"></lyne-title>
                 <p class="teaser__description"></p>
               </div>
             </div>
            </div>
          </a>
        </mock:shadow-root>
      </lyne-teaser>
      `);
  });

});
