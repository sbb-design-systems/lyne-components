import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import '../../seat-reservation.ts';

describe('sbb-seat-reservation-navigation-services', () => {
  const propertyIds = ['BISTRO', 'WIFI', 'PRAM'];

  const cases = {
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  describeViewports({ viewports: ['large'] }, () => {
    describeEach(cases, ({ emulateMedia: { forcedColors, darkMode } }) => {
      for (const state of [visualDiffDefault]) {
        it(
          `state=${state.name}`,
          state.with(async () => {
            await visualRegressionFixture(
              html`
                <sbb-seat-reservation-navigation-services
                  .propertyIds=${propertyIds}
                ></sbb-seat-reservation-navigation-services>
              `,
              {
                darkMode,
                forcedColors,
              },
            );
          }),
        );
      }
    });
  });
});
