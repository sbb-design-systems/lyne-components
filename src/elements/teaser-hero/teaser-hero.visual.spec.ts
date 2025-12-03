import { html } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../core/testing/private.ts';
import { waitForImageReady } from '../core/testing.ts';
import type { SbbImageElement } from '../image.ts';

import './teaser-hero.component.ts';
import '../image.ts';
import '../chip-label.ts';

const imageUrl = import.meta.resolve('../core/testing/assets/placeholder-image.png');

const imgTestCases = [
  {
    title: 'with sbb-image',
    imgSelector: 'sbb-image',
    imgTemplate: () => html`<sbb-image slot="image" image-src=${imageUrl}></sbb-image>`,
  },
  {
    title: 'with img tag',
    imgSelector: 'img',
    imgTemplate: () => html`<img slot="image" src=${imageUrl} alt="" />`,
  },
  {
    title: 'with figure_sbb-image',
    imgSelector: 'sbb-image',
    imgTemplate: () =>
      html`<figure class="sbb-figure" slot="image">
        <sbb-image image-src=${imageUrl}></sbb-image>
        <sbb-chip-label class="sbb-figure-overlap-start-end">AI generated</sbb-chip-label>
      </figure>`,
  },
  {
    title: 'with figure_img',
    imgSelector: 'img',
    imgTemplate: () =>
      html`<figure class="sbb-figure" slot="image">
        <img slot="image" src=${imageUrl} alt="" />
        <sbb-chip-label class="sbb-figure-overlap-start-end">AI generated</sbb-chip-label>
      </figure>`,
  },
];

describe(`sbb-teaser-hero`, () => {
  describeViewports({ viewports: ['zero', 'small', 'large', 'ultra'] }, () => {
    for (const state of [visualDiffDefault, visualDiffHover, visualDiffFocus]) {
      for (const testCase of imgTestCases) {
        it(
          `${testCase.title} ${state.name}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-teaser-hero href="#" link-content="Find out more">
                Break out and explore castles and palaces. ${testCase.imgTemplate()}
              </sbb-teaser-hero>
            `);

            setup.withPostSetupAction(async () => {
              await waitForImageReady(setup.snapshotElement.querySelector(testCase.imgSelector)!);
            });
          }),
        );
      }

      it(
        `without content ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-teaser-hero href="#">
              <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
            </sbb-teaser-hero>
          `);

          setup.withPostSetupAction(
            async () => await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!),
          );
        }),
      );
    }
  });

  describeViewports({ viewports: ['large'] }, () => {
    for (const testCase of imgTestCases) {
      it(
        `custom width ${testCase.title}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-teaser-hero href="#" link-content="Find out more" style="width: 700px">
              Break out and explore castles and palaces. ${testCase.imgTemplate()}
            </sbb-teaser-hero>
          `);

          setup.withPostSetupAction(
            async () =>
              await waitForImageReady(setup.snapshotElement.querySelector(testCase.imgSelector)!),
          );
        }),
      );
    }

    it(
      `allows logo img`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-teaser-hero href="#" link-content="Find out more">
            Break out and explore castles and palaces.
            <figure class="sbb-figure" slot="image">
              <sbb-image image-src=${imageUrl}></sbb-image>
              <sbb-chip-label class="sbb-figure-overlap-start-start">Chip label</sbb-chip-label>
              <img
                class="sbb-figure-overlap-image sbb-figure-overlap-end-end"
                alt=""
                width="50"
                height="30"
                style="border: 1px solid black"
                src=${imageUrl}
              />
            </figure>
          </sbb-teaser-hero>
        `);

        setup.withPostSetupAction(async () => {
          await Promise.all(
            Array.from(
              setup.snapshotElement.querySelectorAll<SbbImageElement | HTMLImageElement>(
                'img,sbb-image',
              ),
            ).map((el) => waitForImageReady(el)),
          );
        });
      }),
    );

    for (const { forcedColors, darkMode } of [
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ]) {
      describe(`forcedColors=${forcedColors} darkMode=${darkMode}`, () => {
        for (const state of [visualDiffDefault, visualDiffHover, visualDiffFocus]) {
          const testCase = imgTestCases[1];

          it(
            state.name,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                html`
                  <sbb-teaser-hero href="#" link-content="Find out more">
                    Break out and explore castles and palaces. ${testCase.imgTemplate()}
                  </sbb-teaser-hero>
                `,
                { forcedColors, darkMode },
              );

              setup.withPostSetupAction(async () => {
                await waitForImageReady(setup.snapshotElement.querySelector(testCase.imgSelector)!);
              });
            }),
          );
        }
      });
    }
  });
});
