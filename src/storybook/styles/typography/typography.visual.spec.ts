import { html } from 'lit/static-html.js';

import '../../../elements/title.ts';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../../elements/core/testing/private.ts';

import style from './typo-internal.scss?lit&inline';

describe(`typography`, () => {
  const text: string = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
  labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
  Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
  consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
  At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
  Lorem ipsum dolor sit amet.`;

  describeViewports(() => {
    for (const [textSizeIndex, textSize] of ['xxs', 'xs', 's', 'm', 'l', 'xl'].entries()) {
      it(
        `textSize=${textSize}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-title level=${6 - textSizeIndex}>
              Title Level ${6 - textSizeIndex} / Text size ${textSize}
            </sbb-title>
            <p class=${`sbb-text-${textSize}`}>${text}</p>
          `);
        }),
      );
    }

    it(
      'text bold',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-title level="6"> Title Level 6 / Text size xxs </sbb-title>
          <p class=${`sbb-text-xxs sbb-text--bold`}>${text}</p>
        `);
      }),
    );

    it(
      'legend sub sup',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <p class="sbb-text-m">A sentence with a<sub>subscript</sub> character.</p>
          <span class="sbb-legend">
            <sup>1</sup>&nbsp;Legend text which is small and should be placed at the end.
          </span>
        `);
      }),
    );

    for (const negative of [false, true]) {
      describe(`link${negative ? ' negative' : ''}`, () => {
        let root: HTMLElement;

        beforeEach(async () => {
          root = await visualRegressionFixture(
            html`<style>
                ${style}
              </style>
              <p class="sbb-text-m">
                A text with a negative link inside<br />
                <!-- We need the link on a separate line so that the center for
                interactive tests can be determined correctly. -->
                <a href="#" class="sbb-link${negative ? '-negative' : ''}"> the text </a>.<br />
                It should adapt to the text but have an underline and hover colors.
              </p> `,
            {
              backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
              color: negative ? 'var(--sbb-color-1-negative)' : '',
            },
          );
        });

        for (const state of visualDiffStandardStates) {
          it(
            state.name,
            state.with((setup) => {
              setup.withSnapshotElement(root);
              setup.withStateElement(root.querySelector('a')!);
            }),
          );
        }
      });
    }
  });
});
