import { html } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
} from '../../core/testing/private.js';

import './mini-calendar-day.component.js';

describe('sbb-mini-calendar-day', () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const marker of ['', 'circle', 'target', 'slash', 'cross']) {
      describe(`marker=${marker === '' ? 'default' : marker}`, () => {
        for (const state of visualDiffStandardStates) {
          it(
            state.name,
            state.with(async (setup) => {
              await setup.withFixture(
                html`<sbb-mini-calendar-day
                  date="2025-01-01"
                  marker=${marker}
                ></sbb-mini-calendar-day>`,
              );
            }),
          );
        }
      });
    }

    for (const color of ['', 'charcoal', 'cloud', 'orange', 'red', 'sky']) {
      it(
        `color=${color === '' ? 'default' : color}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-mini-calendar-day date="2025-01-01" color=${color}></sbb-mini-calendar-day>`,
          );
        }),
      );
    }
  });
});
