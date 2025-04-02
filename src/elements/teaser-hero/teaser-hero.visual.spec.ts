import { html } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../core/testing/private.js';
import { waitForImageReady } from '../core/testing.js';
import type { SbbImageElement } from '../image.js';

import './teaser-hero.js';
import '../image.js';
import '../chip-label.js';

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
  describeViewports({ viewports: ['zero', 'micro', 'small', 'medium', 'wide'] }, () => {
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

            await waitForImageReady(setup.snapshotElement.querySelector(testCase.imgSelector)!);
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

          await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
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

          await waitForImageReady(setup.snapshotElement.querySelector(testCase.imgSelector)!);
        }),
      );
    }

    it(
      `allows logo img`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-teaser-hero href="#" link-content="Find out more" style="width: 1200px">
            Break out and explore castles and palaces.
            <figure class="sbb-figure" slot="image">
              <sbb-image image-src=${imageUrl}></sbb-image>
              <sbb-chip-label class="sbb-figure-overlap-start-start" style="z-index: 1">
                Chip label
              </sbb-chip-label>
              <img
                class="sbb-figure-overlap-logo sbb-figure-overlap-end-end"
                alt=""
                width="50"
                height="30"
                src="
data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2250%22%20height%3D%2230%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2050%2030%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%20%20%20%20%20%20%20%20%20%20%23holder%20text%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20fill%3A%20black%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-family%3A%20sans-serif%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-size%3A%2020px%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-weight%3A%20400%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%3C%2Fstyle%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3Cg%20id%3D%22holder%22%3E%0A%20%20%20%20%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22white%22%3E%3C%2Frect%3E%0A%20%20%20%20%20%20%20%20%3Cg%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctext%20text-anchor%3D%22middle%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20dy%3D%22.3em%22%3Eimg%3C%2Ftext%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fsvg%3E
"
              />
            </figure>
          </sbb-teaser-hero>
        `);

        await Promise.all(
          Array.from(
            setup.snapshotElement.querySelectorAll<SbbImageElement | HTMLImageElement>(
              'img,sbb-image',
            ),
          ).map((el) => waitForImageReady(el)),
        );
      }),
    );
  });
});
