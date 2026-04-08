import { html } from 'lit';

import { describeViewports, visualDiffDefault, visualDiffHover } from '../core/testing/private.ts';

import '../teaser-panel.ts';

describe(`sbb-teaser-panel`, () => {
  describeViewports(() => {
    for (const state of [visualDiffDefault, visualDiffHover]) {
      it(
        state.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <div style="height: 550px; position: relative; background-color: cyan">
              <sbb-teaser-panel> Break out and explore castles and palaces. </sbb-teaser-panel>
            </div>
          `);
        }),
      );
    }
  });
});
