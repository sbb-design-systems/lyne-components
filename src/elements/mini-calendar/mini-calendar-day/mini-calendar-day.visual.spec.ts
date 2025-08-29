import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import './mini-calendar-day.component.js';

describe('sbb-mini-calendar-day', () => {
  const states = {
    marker: ['', 'circle', 'target', 'slash', 'cross'],
    color: ['', 'charcoal', 'cloud', 'orange', 'red', 'sky'],
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(states, ({ marker, color }) => {
      let root: HTMLElement;

      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`<sbb-mini-calendar-day
            date="2025-01-01"
            marker=${marker}
            color=${color}
          ></sbb-mini-calendar-day>`,
        );
      });

      for (const state of visualDiffStandardStates) {
        it(
          state.name,
          state.with((setup) => {
            setup.withSnapshotElement(root);
          }),
        );
      }
    });
  });
});
