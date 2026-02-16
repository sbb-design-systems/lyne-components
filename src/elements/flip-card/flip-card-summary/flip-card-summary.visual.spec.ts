import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import {
  describeViewports,
  loadAssetAsBase64,
  visualDiffDefault,
} from '../../core/testing/private.ts';
import { waitForImageReady } from '../../core/testing/wait-for-image-ready.ts';

import './flip-card-summary.component.ts';
import '../../flip-card.ts';
import '../../title.ts';
import '../../image.ts';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');
const imageBase64 = await loadAssetAsBase64(imageUrl);

const images = [
  {
    selector: 'sbb-image',
    image: html`<sbb-image slot="image" image-src=${imageUrl}></sbb-image>`,
  },
  {
    selector: 'img',
    image: html`<img
      slot="image"
      src=${imageBase64}
      alt=''
    ></img>`,
  },
];

describe(`sbb-flip-card-summary`, () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const image of images) {
      describe(`image=${image.selector}`, () => {
        for (const imageAlignment of ['after', 'below']) {
          it(
            `image-alignment=${imageAlignment}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(html`
                <div
                  style=${styleMap({
                    position: 'relative',
                    display: 'flex',
                    'flex-flow': 'column wrap',
                    gap: 'var(--sbb-spacing-responsive-xs)',
                    'min-height': '17.5rem',
                    'background-color': 'var(--sbb-background-color-4)',
                  })}
                >
                  <sbb-flip-card-summary image-alignment=${imageAlignment}>
                    ${image.image}
                    <sbb-title level="4">Summary</sbb-title>
                  </sbb-flip-card-summary>
                </div>
              `);

              setup.withPostSetupAction(
                async () =>
                  await waitForImageReady(setup.snapshotElement.querySelector(image.selector)!),
              );
            }),
          );
        }
      });
    }
  });
});
