import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import './seat-reservation-place-control.component.ts';
import { html } from 'lit';

describe('sbb-seat-reservation-place-control', () => {
  let root: HTMLElement;

  const rotationCases = {
    rotated: [0, 90, 180, 270],
    textRotated: [0, 90, 180, 270],
  };

  const noRotationCases = {
    placeState: ['FREE', 'ALLOCATED', 'RESTRICTED', 'SELECTED'],
    placeType: ['SEAT', 'BICYCLE'],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  // large only viewport because we don't use any other breakpoint media queries
  describeViewports({ viewports: ['large'] }, () => {
    describeEach(rotationCases, ({ rotated, textRotated }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-seat-reservation-place-control
            type="SEAT"
            state="FREE"
            text="12A"
            style="
              --sbb-seat-reservation-place-control-text-scale-value: 32;
              --sbb-seat-reservation-place-control-width: 32;
              --sbb-seat-reservation-place-control-height: 32;
              --sbb-seat-reservation-place-control-rotation: ${rotated};
              --sbb-seat-reservation-place-control-text-rotation: ${textRotated};"
          ></sbb-seat-reservation-place-control>
        `);
      });

      for (const state of [visualDiffDefault]) {
        it(
          `${state.name}`,
          state.with((setup) => {
            setup.withSnapshotElement(root);
            setup.withStateElement(root.querySelector('.seat-reservation-place-control')!);
          }),
        );
      }
    });

    describeEach(
      noRotationCases,
      ({ placeState, placeType, emulateMedia: { forcedColors, darkMode } }) => {
        beforeEach(async function () {
          root = await visualRegressionFixture(
            html`
              <sbb-seat-reservation-place-control
                type="${placeType}"
                state="${placeState}"
                text="12A"
                style="
              --sbb-seat-reservation-place-control-text-scale-value: 32;
              --sbb-seat-reservation-place-control-width: 32;
              --sbb-seat-reservation-place-control-height: 32;"
              ></sbb-seat-reservation-place-control>
            `,
            {
              forcedColors,
              darkMode,
            },
          );
        });

        for (const state of [visualDiffDefault]) {
          it(
            `${state.name}`,
            state.with((setup) => {
              setup.withSnapshotElement(root);
              setup.withStateElement(root.querySelector('.seat-reservation-place-control')!);
            }),
          );
        }
      },
    );
  });
});
