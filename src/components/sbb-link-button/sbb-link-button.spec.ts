import lyneIcons from 'lyne-icons/dist/icons.json';
import { SbbLinkButton } from './sbb-link-button';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-link', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbLinkButton],
      html: `<sbb-link-button href-value="https://github.com/lyne-design-system/lyne-components" icon-placement="right" icon="chevron-small-right-small" text="Travelcards &amp; tickets" variant="primary"><span slot="icon">${lyneIcons.icons['chevron-small-right-small']}</span></sbb-link>`
    });

    expect(root)
      .toEqualHtml(`
        <sbb-link-button
            href-value="https://github.com/lyne-design-system/lyne-components"
            icon-placement="right"
            icon="chevron-small-right-small"
            text="Travelcards &amp; tickets"
            variant="primary"
        >
          <mock:shadow-root>
            <a
                aria-label="Travelcards &amp; tickets. Link target opens in new window."
                class="link-button link-button--icon-placement-right link-button--primary"
                dir="ltr"
                href="https://github.com/lyne-design-system/lyne-components"
                target="_blank"
                rel="external noopener nofollow"
            >
                <span class="link-button__icon">
                    <slot name="icon"></slot>
                </span>
                <span class="link-button__text">Travelcards & tickets</span>
            </a>
          </mock:shadow-root>
          <span slot="icon">
            <svg height="24" viewBox="0,0,24,24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="m10.6776,7.74045,3.949,3.90395.3597.3557-.3597.3555-3.95,3.904-.70297-.7112L13.5639,12,9.97459,8.4516l.70301-.71115z">
                </path>
            </svg>
          </span>
        </sbb-link-button>
      `);
  });

});

