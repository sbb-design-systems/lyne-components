import { html, nothing, type TemplateResult } from 'lit';

import { describeViewports, describeEach, visualDiffDefault } from '../core/testing/private.js';

import './teaser-product.js';
import '../button/button.js';
import '../image.js';
import '../title.js';

const imageUrl = import.meta.resolve('../core/testing/assets/placeholder-image.png');

const content = (): TemplateResult => html`
  <div>
    <sbb-title level="3" style="margin-block-start: 0;">Benefit from up to 70% discount</sbb-title>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit amet felis
    viverra lacinia.
    <div style="margin-block-start: var(--sbb-spacing-responsive-xxs);">
      <sbb-button>Label</sbb-button>
    </div>
  </div>
`;

const footer = (): TemplateResult => html`
  <span slot="footnote">
    Footnote Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit
    amet felis viverra lacinia.
  </span>
`;

const template = (
  negative?: boolean,
  imageAlignment?: string,
  showFooter?: boolean,
): TemplateResult => html`
  <sbb-teaser-product
    ?negative=${negative}
    image-alignment=${imageAlignment || nothing}
    style="height: 600px"
  >
    <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
    ${content()} ${showFooter ? footer() : nothing}
  </sbb-teaser-product>
`;

describe('sbb-teaser-product', () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
    const cases = {
      negative: [true, false],
      imageAlignment: ['after', 'before'],
    };

    describeEach(cases, ({ negative, imageAlignment }) => {
      it(
        'default',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`${template(negative, imageAlignment, true)}`);
        }),
      );

      it(
        'no footer',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`${template(negative, imageAlignment)}`);
        }),
      );
    });
  });
});
