import { html } from 'lit/static-html.js';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../../elements/core/testing/private.ts';

import style from './scrollbar-internal.scss?lit&inline';

describe(`scrollbar`, () => {
  let root: HTMLElement;

  const cases = {
    thickness: ['thin', 'thick'],
    negative: [false, true],
    trackVisible: [true, false],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  describeViewports({ viewports: ['small'] }, () => {
    describeEach(
      cases,
      ({ thickness, negative, trackVisible, emulateMedia: { darkMode, forcedColors } }) => {
        beforeEach(async function () {
          let scrollbarClass = 'sbb-scrollbar';
          if (thickness === 'thick') {
            scrollbarClass += '-thick';
          }
          if (negative) {
            scrollbarClass += '-negative';
          }
          if (trackVisible) {
            scrollbarClass += '-track-visible';
          }

          root = await visualRegressionFixture(
            html`
              <style>
                ${style}
              </style>
              <div class=${`overflow-container ${scrollbarClass}`}>
                <div class="inner-box">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                  vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                  no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                  amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                  labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                  est Lorem ipsum dolor sit amet.
                </div>
              </div>
            `,
            {
              backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
              color: negative ? 'var(--sbb-color-1-negative)' : undefined,
              darkMode,
              forcedColors,
            },
          );
        });

        it(
          visualDiffDefault.name,
          visualDiffDefault.with((setup) => {
            setup.withSnapshotElement(root);
          }),
        );
      },
    );
  });
});
