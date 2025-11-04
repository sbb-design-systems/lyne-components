import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import './seat-reservation-navigation-coach.component.js';
import { html } from 'lit';

describe('sbb-seat-reservation-navigation-coach', () => {
  const cases = {
    selected: [false, true],
    focused: [false, true],
    disable: [false, true],
  };

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const state of visualDiffStandardStates) {
      it(
        `${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-seat-reservation-navigation-coach
              coach-id="CI85"
            ></sbb-seat-reservation-navigation-coach>`,
          );
        }),
      );
    }
    describeEach(cases, ({ selected, focused, disable }) => {
      it(
        `test selected=${selected} focused=${focused} disable=${disable}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-seat-reservation-navigation-coach
              coach-id="CI85"
              ?selected=${selected}
              ?disable=${disable}
              ?focused=${focused}
            ></sbb-seat-reservation-navigation-coach>
          `);
        }),
      );
    });
  });
});
