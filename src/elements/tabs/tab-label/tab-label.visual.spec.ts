import { html } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
} from '../../core/testing/private.js';

import '../tab-group.js';
import '../tab-label.js';
import '../tab.js';

describe(`sbb-tab-label`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const state of visualDiffStandardStates) {
      it(
        state.name,
        state.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-tab-label amount="16" icon-name="app-icon-small">Tab title</sbb-tab-label>`,
          );
        }),
      );
    }

    it(
      'disabled',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html` <sbb-tab-label amount="16" icon-name="app-icon-small" disabled
            >Tab title</sbb-tab-label
          >`,
        );
      }),
    );
  });
});
