import { html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import {
  describeEach,
  describeViewports,
  loadAssetAsBase64,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../core/testing/private.ts';
import { waitForImageReady } from '../core/testing.ts';

import './teaser.component.ts';
import '../chip-label.ts';
import '../container.ts';
import '../image.ts';
import '../title.ts';

const imageUrl = import.meta.resolve('../core/testing/assets/placeholder-image.png');
const imageBase64 = await loadAssetAsBase64(imageUrl);

describe(`sbb-teaser`, () => {
  const loremIpsum: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in tincidunt
    quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut, hendrerit risus. Vestibulum rutrum elit et
    lacus sollicitudin, quis malesuada lorem vehicula. Suspendisse at augue quis tellus vulputate tempor. Vivamus urna
    velit, varius nec est ac, mollis efficitur lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat
    metus. Donec pharetra odio at turpis bibendum, vel commodo dui vulputate. Aenean congue nec nisl vel bibendum.
    Praesent sit amet lorem augue. Suspendisse ornare a justo sagittis fermentum.`;
  const longChip: string =
    'This is a chip which has a very long content and should receive ellipsis.';

  const imgCases = [
    {
      title: 'imageSlot=sbb-image',
      imgSelector: 'sbb-image',
      imgTemplate: () => html`<sbb-image slot="image" image-src=${imageUrl}></sbb-image>`,
    },
    {
      title: 'imageSlot=img',
      imgSelector: 'img',
      imgTemplate: () => html`<img src=${imageBase64} slot="image" alt="" />`,
    },
    {
      title: 'imageSlot=figure_and_sbb-image',
      imgSelector: 'sbb-image',
      imgTemplate: () =>
        html`<figure class="sbb-figure" slot="image">
          <sbb-image image-src=${imageUrl}></sbb-image>
          <sbb-chip-label class="sbb-figure-overlap-start-start">AI chip</sbb-chip-label>
        </figure>`,
    },
    {
      title: 'imageSlot=figure_and_img',
      imgSelector: 'img',
      imgTemplate: () =>
        html`<figure class="sbb-figure" slot="image">
          <img src=${imageBase64} alt="" />
          <sbb-chip-label class="sbb-figure-overlap-start-start">AI chip</sbb-chip-label>
        </figure>`,
    },
  ];

  const visualStates = {
    hasChip: [false, true],
    withLongContent: [false, true],
  };

  const screenCombinations = [
    { viewport: 'small' as const, alignments: ['below'] },
    { viewport: 'large' as const, alignments: ['after-centered', 'after', 'below'] },
  ];

  for (const screenCombination of screenCombinations) {
    describeViewports({ viewports: [screenCombination.viewport] }, () => {
      for (const alignment of screenCombination.alignments) {
        describe(`alignment=${alignment}`, () => {
          for (const imgCase of imgCases) {
            describe(imgCase.title, () => {
              for (const visualDiffStandardState of [
                visualDiffDefault,
                visualDiffFocus,
                visualDiffHover,
              ]) {
                it(
                  `state=${visualDiffStandardState.name}`,
                  visualDiffStandardState.with(async (setup) => {
                    await setup.withFixture(
                      html`
                        <sbb-teaser href="#" alignment=${alignment}>
                          ${imgCase.imgTemplate()}
                          <sbb-title level="2">This is a title</sbb-title>
                          This is a paragraph
                        </sbb-teaser>
                      `,
                      { maxWidth: '760px' },
                    );
                    setup.withPostSetupAction(
                      async () =>
                        await waitForImageReady(
                          setup.snapshotElement.querySelector(imgCase.imgSelector)!,
                        ),
                    );
                  }),
                );
              }
            });
          }

          describeEach(visualStates, ({ hasChip, withLongContent }) => {
            it(
              '',
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(
                  html`
                    <sbb-teaser href="#" alignment=${alignment}>
                      <figure slot="image" class="sbb-figure">
                        <img src=${imageBase64} />
                        ${hasChip
                          ? html`<sbb-chip-label class="sbb-figure-overlap-start-start">
                              AI chip
                            </sbb-chip-label>`
                          : nothing}
                      </figure>
                      ${hasChip ? html`<sbb-chip-label>This is a chip.</sbb-chip-label>` : nothing}
                      <sbb-title level="2">This is a title</sbb-title>
                      ${withLongContent ? loremIpsum : 'This is a paragraph'}
                    </sbb-teaser>
                  `,
                  { maxWidth: '760px' },
                );
                setup.withPostSetupAction(
                  async () => await waitForImageReady(setup.snapshotElement.querySelector('img')!),
                );
              }),
            );
          });
        });
      }

      it(
        'grid with img',
        visualDiffDefault.with(async (setup) => {
          const count = 2;
          await setup.withFixture(html`
            <sbb-container>
              <div style="display:grid; gap: 2rem; grid-template-columns: repeat(2, 1fr);">
                ${repeat(
                  new Array(count),
                  (_) => html`
                    <sbb-teaser
                      href="#"
                      alignment="below"
                      style="--sbb-teaser-align-items: stretch;"
                    >
                      <figure slot="image" class="sbb-figure" style="width: 100%">
                        <img alt="" src=${imageUrl} />
                        <sbb-chip-label class="sbb-figure-overlap-start-start">
                          AI chip
                        </sbb-chip-label>
                      </figure>
                      <sbb-title level="2">This is a title</sbb-title>
                      This is a paragraph
                    </sbb-teaser>
                  `,
                )}
              </div>
            </sbb-container>
          `);

          setup.withPostSetupAction(async () => {
            await Promise.all(
              Array.from(setup.snapshotElement.querySelectorAll('img')).map((el) =>
                waitForImageReady(el),
              ),
            );
          });
        }),
      );

      it(
        'forcedColors=true',
        visualDiffFocus.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-teaser href="#" alignment="below">
                <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
                <sbb-title level="2">This is a title</sbb-title>
                This is a paragraph
              </sbb-teaser>
            `,
            { forcedColors: true },
          );

          setup.withPostSetupAction(
            async () => await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!),
          );
        }),
      );

      it(
        'darkMode=true',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-teaser href="#" alignment="below">
                <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
                <sbb-title level="2">This is a title</sbb-title>
                This is a paragraph
              </sbb-teaser>
            `,
            { darkMode: true },
          );

          setup.withPostSetupAction(
            async () => await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!),
          );
        }),
      );

      it(
        `longChip`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-teaser
                style="width: ${screenCombination.viewport === 'small' ? '300px' : '400px'};"
                href="#"
                alignment="below"
              >
                <img src=${imageBase64} slot="image" alt="" />
                <sbb-chip-label>${longChip}</sbb-chip-label>
                <sbb-title level="2">This is a title</sbb-title>
                This is a paragraph
              </sbb-teaser>
            `,
            { maxWidth: '760px' },
          );
          setup.withPostSetupAction(
            async () => await waitForImageReady(setup.snapshotElement.querySelector('img')!),
          );
        }),
      );
    });
  }
});
