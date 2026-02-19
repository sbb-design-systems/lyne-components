import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffHover,
  visualRegressionFixture,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import './seat-reservation-navigation-coach.component.ts';

describe('sbb-seat-reservation-navigation-coach', () => {
  let root: HTMLElement;

  const propertyIds = ['BISTRO', 'WIFI', 'PRAM'];

  const cases = {
    selected: [false, true],
    focused: [false, true],
    hovered: [false, true],
    disabled: [false, true],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  // Standard visual diff states to be tested;
  // own states array because the visual-regression-snapshot.ts constant "visualDiffStandardStates"
  // includes more than we need
  const visualDiffStandardStates = [visualDiffDefault, visualDiffHover] as const;

  const coachItemDetails = {
    id: '85',
    travelClass: 'FIRST',
    propertyIds: propertyIds,
    freePlaces: {seats: 0, bycicles: 0 },
    driverAreaElements: {driverArea: undefined, driverAreaNoVerticalWall: undefined }
  };

  // large only viewport because we don't use any other breakpoint media queries
  describeViewports({ viewports: ['large'] }, () => {
    describeEach(
      cases,
      ({ selected, focused, hovered, disabled, emulateMedia: { forcedColors, darkMode } }) => {
        beforeEach(async function () {
          root = await visualRegressionFixture(
            html`
            <sbb-seat-reservation-navigation-coach
              ?selected=${selected}
              ?focused=${focused}
              ?hovered=${hovered}
              ?disable=${disabled}
              .coachItemDetails="${coachItemDetails}"
            ></sbb-seat-reservation-navigation-coach>
          `,
            {
              darkMode,
              forcedColors,
            },
          );
        });

        for (const state of visualDiffStandardStates) {
          it(
            `${state.name}`,
            state.with((setup) => {
              setup.withSnapshotElement(root);
              setup.withStateElement(root.querySelector('.sbb-sr-navigation__ctrl-button')!);
            }),
          );
        }
      },
    );
  });
});
