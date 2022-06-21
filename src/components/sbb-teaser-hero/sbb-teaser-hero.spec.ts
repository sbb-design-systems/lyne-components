import { SbbTeaserHero } from './sbb-teaser-hero';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-teaser-hero', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTeaserHero],
      html: '<sbb-teaser-hero accessibility-title="sbb teaser" link="https://www.sbb.ch" new-window-info-text="Link öffnet in neuem Fenster." open-in-new-window="true"></sbb-teaser-hero>'
    });

    expect(root)
      .toEqualHtml(`
      <sbb-teaser-hero accessibility-title="sbb teaser" link="https://www.sbb.ch" new-window-info-text="Link öffnet in neuem Fenster." open-in-new-window="true">
          <mock:shadow-root>
            <a class="teaser-hero" aria-label="sbb teaser" href="https://www.sbb.ch" rel="external noopener nofollow" target="_blank">
              <sbb-title level='1' visually-hidden='true' text='sbb teaser'></sbb-title>
              <div class="teaser-hero__panel">
                <slot name="panel"></slot>
              </div>
              <slot name="image"></slot>
              <span class="teaser-hero__link-info-text">
                Link öffnet in neuem Fenster.
              </span>
            </a>
          </mock:shadow-root>
        </sbb-teaser-hero>
      `);
  });
});
