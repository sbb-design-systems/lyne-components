import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import './seat-reservation-navigation-coach.js';

describe('sbb-seat-reservation-navigation-coach', () => {
  /**
   * Add the `viewports` param to test only specific viewport;
   * add the `viewportHeight` param to set a fixed height for the browser.
   */
  describeViewports(() => {
    // Create visual tests considering the implemented states (default, hover, active, focus)
    for (const state of visualDiffStandardStates) {
      it(
        `${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-seat-reservation-navigation-coach></sbb-seat-reservation-navigation-coach>`,
          );
        }),
      );
    }

    /**
     * Create visual tests combining the values of the provided object;
     * useful when testing combinations of disabled, negative, visual variants, etc.
     * eg.
     *  1. one=true two={ name: 'A', value: 1 }
     *  2. one=true two={ name: 'B', value: 2 }
     *  3. one=false two={ name: 'A', value: 1 }
     *  4. one=false two={ name: 'B', value: 2 }
     */
    const example = {
      one: [true, false],
      two: [
        { name: 'A', value: 1 },
        { name: 'B', value: 2 },
      ],
    };
    describeEach(example, ({ two }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-seat-reservation-navigation-coach>
              ${two.name}
            </sbb-seat-reservation-navigation-coach>
          `);
        }),
      );
    });
  });
});
