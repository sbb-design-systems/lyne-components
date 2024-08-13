import { html, nothing, type TemplateResult } from 'lit';

import { describeViewports, describeEach, visualDiffDefault } from '../../core/testing/private.js';
import { waitForImageReady } from '../../core/testing/wait-for-image-ready.js';

import './teaser-product-static.js';
import '../../action-group.js';
import '../../button/button.js';
import '../../button/secondary-button.js';
import '../../image.js';
import '../../title.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

const content = (): TemplateResult => html`
  <div>
    <sbb-title level="3" style="margin-block-start: 0;">Benefit from up to 70% discount</sbb-title>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit amet felis
    viverra lacinia.
    <sbb-action-group style="margin-block-start: var(--sbb-spacing-responsive-xxs);">
      <sbb-button>Label</sbb-button>
      <sbb-secondary-button>Label</sbb-secondary-button>
    </sbb-action-group>
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
  slottedImg?: boolean,
): TemplateResult => html`
  <sbb-teaser-product-static
    ?negative=${negative}
    image-alignment=${imageAlignment || nothing}
    style="height: 600px"
  >
    ${slottedImg
      ? html`<img slot="image" src=${imageUrl} alt="" />`
      : html`<sbb-image slot="image" image-src=${imageUrl}></sbb-image>`}
    ${content()} ${showFooter ? footer() : nothing}
  </sbb-teaser-product-static>
`;

describe('sbb-teaser-product-static', () => {
  describeViewports({ viewports: ['zero', 'medium', 'large'], viewportHeight: 800 }, () => {
    const cases = {
      negative: [true, false],
      imageAlignment: ['after', 'before'],
      slottedImg: [false, true],
    };

    describeEach(cases, ({ negative, imageAlignment, slottedImg }) => {
      it(
        'default',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template(negative, imageAlignment, true, slottedImg), {
            minHeight: '800px',
          });
          await waitForImageReady(
            setup.snapshotElement.querySelector(slottedImg ? 'img' : 'sbb-image')!,
          );
        }),
      );

      it(
        'no footer',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template(negative, imageAlignment, false, slottedImg), {
            minHeight: '800px',
          });
          await waitForImageReady(
            setup.snapshotElement.querySelector(slottedImg ? 'img' : 'sbb-image')!,
          );
        }),
      );
    });
  });
});
