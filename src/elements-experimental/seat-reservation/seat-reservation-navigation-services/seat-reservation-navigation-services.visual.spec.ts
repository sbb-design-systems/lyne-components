import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import './seat-reservation-navigation-services.component.js';
import { html } from 'lit';

describe('sbb-seat-reservation-navigation-services', () => {
  const propertyIds = ['BISTRO', 'WIFI', 'PRAM'];

  const cases = {
    forcedColors: [false, true],
    darkMode: [false, true],
  };

  describeViewports({ viewports: ['large'] }, () => {
    describeEach(cases, ({ forcedColors, darkMode }) => {
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
