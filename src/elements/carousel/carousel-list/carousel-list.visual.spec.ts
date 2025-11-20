import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.ts';
import { waitForImageReady } from '../../core/testing.ts';

import '../carousel-item/carousel-item.component.ts';
import './carousel-list.component.ts';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe('sbb-carousel-list', () => {
  describeViewports(() => {
    it(
      `default`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-carousel-list>
            <sbb-carousel-item>
              <img src=${imageUrl} alt="SBB image" height="300" width="400" />
            </sbb-carousel-item>
            <sbb-carousel-item>
              <img src=${imageUrl} alt="SBB image" height="300" width="400" />
            </sbb-carousel-item>
            <sbb-carousel-item>
              <img src=${imageUrl} alt="SBB image" height="300" width="400" />
            </sbb-carousel-item>
          </sbb-carousel-list>
        `);

        setup.withPostSetupAction(async () => {
          await Promise.all(
            Array.from(setup.snapshotElement.querySelectorAll<HTMLImageElement>('img')).map((el) =>
              waitForImageReady(el),
            ),
          );
        });
      }),
    );
  });
});
