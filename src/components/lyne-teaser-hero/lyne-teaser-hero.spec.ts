import { LyneTeaserHero } from './lyne-teaser-hero';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-teaser-hero', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTeaserHero],
      html: '<lyne-teaser-hero></lyne-teaser-hero>'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-teaser-hero icon="true" label="Label" variant="secondary-negative">
          <mock:shadow-root>
            <button class="button button--large button--secondary-negative" type="button">
              <span class="button__icon">
                <slot></slot>
              </span>
              <span class="button__label">Label</span>
            </button>
          </mock:shadow-root>
          <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" d="m17.8436,12.1382-3.99-3.99196-.7072.70693,3.1366,3.13823H5v1h11.287l-3.1413,3.1555.7086.7056,3.99-4.008.3519-.3535-.3526-.3528z" fill-rule="evenodd"></path>
          </svg>
        </lyne-teaser-hero>
      `);
  });

});
