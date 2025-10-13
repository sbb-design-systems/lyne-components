import { aTimeout } from '@open-wc/testing';
import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';
import { waitForImageReady } from '../../core/testing.js';

import './carousel.component.js';
import '../carousel-list/carousel-list.component.js';
import '../carousel-item/carousel-item.component.js';
import '../../paginator/compact-paginator/compact-paginator.component.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe('sbb-carousel', () => {
  describeViewports(() => {
    it(
      'default',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-carousel>
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
            <sbb-compact-paginator></sbb-compact-paginator>
          </sbb-carousel>
        `);

        setup.withPostSetupAction(async () => {
          await Promise.all(
            Array.from(setup.snapshotElement.querySelectorAll<HTMLImageElement>('img')).map((el) =>
              waitForImageReady(el),
            ),
          );
          setup.snapshotElement
            .querySelectorAll('sbb-carousel-item')[0]!
            .scrollIntoView({ behavior: 'instant' });
          await aTimeout(10);
        });
      }),
    );
  });

  describeViewports({ viewports: ['large'] }, () => {
    it(
      'darkMode',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-carousel>
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
              <sbb-compact-paginator></sbb-compact-paginator>
            </sbb-carousel>
          `,
          { darkMode: true },
        );

        setup.withPostSetupAction(async () => {
          await Promise.all(
            Array.from(setup.snapshotElement.querySelectorAll<HTMLImageElement>('img')).map((el) =>
              waitForImageReady(el),
            ),
          );
          setup.snapshotElement
            .querySelectorAll('sbb-carousel-item')[0]!
            .scrollIntoView({ behavior: 'instant' });
          await aTimeout(10);
        });
      }),
    );
  });
});
