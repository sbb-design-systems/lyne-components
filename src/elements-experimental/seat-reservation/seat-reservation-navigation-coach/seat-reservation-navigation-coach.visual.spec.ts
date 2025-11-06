import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
  visualRegressionFixture,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import './seat-reservation-navigation-coach.component.js';
import { html } from 'lit';

describe('sbb-seat-reservation-navigation-coach', () => {
  let root: HTMLElement;

  const propertyIds = ['BISTRO', 'WIFI', 'PRAM'];

  const cases = {
    selected: [false, true],
    disabled: [false, true],
    darkMode: [false, true],
    forcedColors: [false, true],
  };

  // Standard visual diff states to be tested;
  // own states array because the visual-regression-snapshot.ts constant "visualDiffStandardStates"
  // includes more than we need
  const visualDiffStandardStates = [visualDiffDefault, visualDiffFocus, visualDiffHover] as const;

  // large only viewport because we don't use any other breakpoint media queries
  describeViewports({ viewports: ['large'] }, () => {
    describeEach(cases, ({ selected, disabled, darkMode, forcedColors }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-seat-reservation-navigation-coach
              coach-id="CI"
              ?selected=${selected}
              ?disable=${disabled}
              travel-class=["FIRST"]
              .propertyIds=${propertyIds}
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
    });
  });
});
