import { html } from 'lit';

import {
  describeViewports,
  loadAssetAsBase64,
  visualDiffStandardStates,
} from '../../core/testing/private.ts';
import { waitForImageReady } from '../../core/testing.ts';

import '../../button.ts';
import '../../chip-label.ts';
import '../../image.ts';
import '../../teaser.ts';
import '../../title.ts';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');
const imageBase64 = await loadAssetAsBase64(imageUrl);

describe(`sbb-teaser-static`, () => {
  describeViewports({ viewports: ['large'] }, () => {
    for (const state of visualDiffStandardStates) {
      // We test the states to ensure that the component is rendered without hover, or active effects
      it(
        state.name,
        state.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-teaser-static alignment="below">
                <img src=${imageBase64} slot="image" alt="" />
                <sbb-chip-label>AI chip</sbb-chip-label>
                <sbb-title level="2">This is a title</sbb-title>
                This is a paragraph
                <sbb-secondary-button-link href="#">See more</sbb-secondary-button-link>
              </sbb-teaser-static>
            `,
            { maxWidth: '760px' },
          );
          setup.withPostSetupAction(
            async () => await waitForImageReady(setup.snapshotElement.querySelector('img')!),
          );
        }),
      );
    }
  });
});
