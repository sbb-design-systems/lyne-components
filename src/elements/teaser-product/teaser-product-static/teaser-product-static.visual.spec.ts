import { html, nothing, type TemplateResult } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.js';
import { waitForImageReady } from '../../core/testing/wait-for-image-ready.js';

import './teaser-product-static.js';
import '../../action-group.js';
import '../../button/button.js';
import '../../button/secondary-button.js';
import '../../image.js';
import '../../title.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

const content = (): TemplateResult => html`
  <sbb-title level="3" class="sbb-teaser-product--spacing">
    Benefit from up to 70% discount
  </sbb-title>
  <p class="sbb-teaser-product--spacing">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit amet felis
    viverra lacinia.
  </p>
  <sbb-action-group class="sbb-teaser-product--spacing">
    <sbb-button>Label</sbb-button>
    <sbb-secondary-button>Label</sbb-secondary-button>
  </sbb-action-group>
`;

const footer = (): TemplateResult => html`
  <p slot="footnote" class="sbb-teaser-product--spacing">
    Footnote Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit
    amet felis viverra lacinia.
  </p>
`;

const template = (
  negative?: boolean,
  imageAlignment?: string,
  showFooter?: boolean,
  slottedImg?: boolean,
): TemplateResult => html`
  <sbb-teaser-product-static ?negative=${negative} image-alignment=${imageAlignment || nothing}>
    ${slottedImg
      ? html`<img slot="image" src=${imageUrl} alt="" />`
      : html`<sbb-image slot="image" image-src=${imageUrl}></sbb-image>`}
    ${content()} ${showFooter ? footer() : nothing}
  </sbb-teaser-product-static>
`;

describe('sbb-teaser-product-static', () => {
  describeViewports({ viewports: ['zero', 'medium', 'large'], viewportHeight: 800 }, () => {
    for (const slottedImg of [false, true]) {
      describe(`slottedImg=${slottedImg}`, () => {
        for (const negative of [false, true]) {
          describe(`negative=${negative}`, () => {
            for (const visualState of [visualDiffDefault, visualDiffFocus]) {
              it(
                visualState.name,
                visualState.with(async (setup) => {
                  await setup.withFixture(template(negative, 'after', true, slottedImg), {
                    minHeight: '800px',
                    backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
                  });
                  await waitForImageReady(
                    setup.snapshotElement.querySelector(slottedImg ? 'img' : 'sbb-image')!,
                  );
                }),
              );
            }
          });
        }

        it(
          `imageAlignment=before`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(template(false, 'before', true, slottedImg), {
              minHeight: '800px',
            });
            await waitForImageReady(
              setup.snapshotElement.querySelector(slottedImg ? 'img' : 'sbb-image')!,
            );
          }),
        );
      });
    }

    it(
      'no footer',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template(false, 'after', false), {
          minHeight: '800px',
        });
        await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
      }),
    );

    for (const visualState of [visualDiffDefault, visualDiffFocus, visualDiffHover]) {
      it(
        `${visualState.name} forcedColors=true`,
        visualState.with(async (setup) => {
          await setup.withFixture(template(), { minHeight: '800px', forcedColors: true });
          await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
        }),
      );
    }
  });
});
