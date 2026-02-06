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

  const cases = {
    rotated: [-90, 0, 45, 90],
    textRotated: [-90, 0, 45, 90],
    placeState: ['FREE', 'ALLOCATED', 'RESTRICTED', 'SELECTED'],
    placeType: ['SEAT', 'BICYCLE'],
    darkMode: [false, true],
    forcedColors: [false, true],
  };

  // large only viewport because we don't use any other breakpoint media queries
  describeViewports({ viewports: ['large'] }, () => {
    describeEach(
      cases,
      ({ rotated, textRotated, placeState, placeType, darkMode, forcedColors }) => {
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
              --sbb-seat-reservation-place-control-height: 32;
              --sbb-seat-reservation-place-control-rotation: ${rotated};
              --sbb-seat-reservation-place-control-text-rotation: ${textRotated};"
              ></sbb-seat-reservation-place-control>
            `,
            {
              darkMode,
              forcedColors,
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
