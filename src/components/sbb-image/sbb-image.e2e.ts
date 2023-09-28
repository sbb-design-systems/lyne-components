import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbImage } from './sbb-image';
import images from '../../global/images';

describe('sbb-image', () => {
  let element: SbbImage;

  it('renders', async () => {
    const url = images[0];
    element = await fixture(html`<sbb-image image-src="${url}"></sbb-image>`);

    assert.instanceOf(element, SbbImage);
    await element.updateComplete;
    // Wait five seconds in hope the image will successfully be loaded
    // TODO: Find more reliable solution
    await new Promise((res) => setTimeout(res, 2000));
    await element.updateComplete;

    expect(element).dom.to.be.equal(`
      <sbb-image image-src="${url}"></sbb-image>
    `);

    expect(element).shadowDom.to.be.equal(`
      <figure class="image__figure image__figure--loaded image__figure--ratio-16-9">
        <div class="image__wrapper">
          <img alt="" class="image__blur-hash" decoding="auto" height="562" loading="eager" src="${url}?blur=100&amp;w=100&amp;h=56" width="1000">
          <picture>
            <source media="(min-width: 64rem)" sizes="1200px" srcset="${url}?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=1200&amp;h=675&amp;q=45 1200w, ${url}?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=2400&amp;h=1350&amp;q=20 2400w">
            <source media="(min-width: 37.5rem)" sizes="976px" srcset="${url}?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=976&amp;h=549&amp;q=45 976w, ${url}?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=1952&amp;h=1098&amp;q=20 1952w">
            <source media="(max-width: 37.4375rem)" sizes="320px" srcset="${url}?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=320&amp;h=180&amp;q=45 320w, ${url}?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=640&amp;h=360&amp;q=20 640w">
            <img alt="" class="image__img" decoding="auto" height="562" importance="high" loading="eager" src="${url}" width="1000">
          </picture>
        </div>
      </figure>
    `);
  });
});
