import {
  describeViewports,
  visualDiffStandardStates,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';
import './seat-reservation-navigation.js';

describe('sbb-seat-reservation-navigation', () => {
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
            html`<sbb-seat-reservation-navigation></sbb-seat-reservation-navigation>`,
          );
        }),
      );
    }
  });
});
