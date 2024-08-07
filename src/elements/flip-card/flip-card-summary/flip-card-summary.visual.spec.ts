import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';
import { waitForImageReady } from '../../core/testing/wait-for-image-ready.js';

import './flip-card-summary.js';
import '../../flip-card.js';
import '../../title.js';
import '../../image.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe(`sbb-flip-card-summary`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
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
                'background-color': 'var(--sbb-color-cloud-alpha-80)',
              })}
            >
              <sbb-flip-card-summary slot="summary" image-alignment=${imageAlignment}>
                <sbb-title level="4">Summary</sbb-title>
                <sbb-image
                  slot="image"
                  image-src=${imageUrl}
                  border-radius="none"
                  aspect-ratio="free"
                ></sbb-image>
              </sbb-flip-card-summary>
            </div>
          `);
          await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
        }),
      );
    }
  });
});
