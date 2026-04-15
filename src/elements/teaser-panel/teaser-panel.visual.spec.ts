import { html } from 'lit';

import { describeViewports, visualDiffDefault, visualDiffHover } from '../core/testing/private.ts';

import '../teaser-panel.ts';

const imageUrl = import.meta.resolve('../core/testing/assets/placeholder-image.png');

describe(`sbb-teaser-panel`, () => {
  describeViewports(() => {
    for (const state of [visualDiffDefault, visualDiffHover]) {
      it(
        state.name,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <div
              style="height: 550px; position: relative; background-image: url('${imageUrl}'); background-size: contain;"
            >
              <sbb-teaser-panel> Break out and explore castles and palaces. </sbb-teaser-panel>
            </div>
          `);
        }),
      );
    }
  });
});
