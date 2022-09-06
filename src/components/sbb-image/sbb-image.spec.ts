import images from '../../global/images';
import { SbbImage } from './sbb-image';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-image', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbImage],
      html: `<sbb-image image-src="${images[0]}"></sbb-image>`,
    });

    expect(root).toEqualHtml(`
        <sbb-image image-src="${images[0]}">
          <mock:shadow-root>
            <figure class="image__figure image__figure--ratio-16-9">
              <div class="image__wrapper">
                <img alt="" class="image__blur-hash" decoding="auto" height="562" loading="eager" src="${images[0]}?blur=100&amp;w=100&amp;h=56" width="1000">
                <picture>
                  <source media="(min-width: 64rem)" sizes="1200px" srcset="${images[0]}?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=1200&amp;h=675&amp;q=45 1200w, ${images[0]}?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=2400&amp;h=1350&amp;q=20 2400w">
                  <source media="(min-width: 37.5rem)" sizes="976px" srcset="${images[0]}?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=976&amp;h=549&amp;q=45 976w, ${images[0]}?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=1952&amp;h=1098&amp;q=20 1952w">
                  <source media="(max-width: 37.4375rem)" sizes="320px" srcset="${images[0]}?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=320&amp;h=180&amp;q=45 320w, ${images[0]}?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=640&amp;h=360&amp;q=20 640w">
                  <img class="image__img" decoding="auto" height="562" importance="high" loading="eager" src="${images[0]}" width="1000">
                </picture>
              </div>
            </figure>
          </mock:shadow-root>
        </sbb-image>
      `);
  });
});
