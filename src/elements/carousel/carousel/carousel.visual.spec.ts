import { aTimeout } from '@open-wc/testing';
import { html } from 'lit';
import { choose } from 'lit/directives/choose.js';
import { repeat } from 'lit/directives/repeat.js';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.ts';
import { waitForImageReady } from '../../core/testing.ts';
import type { SbbImageElement } from '../../image.ts';

import '../../carousel.ts';
import '../../chip-label.ts';
import '../../image.ts';
import '../../paginator.ts';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe('sbb-carousel', () => {
  describeViewports(() => {
    for (const shadow of [false, true]) {
      describe(`shadow=${shadow}`, () => {
        for (const imgType of ['native', 'sbb-image', 'figure', 'link']) {
          it(
            imgType,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                html`
                  <sbb-carousel ?shadow=${shadow}>
                    <sbb-carousel-list>
                      ${repeat(
                        new Array(3),
                        () => html`
                          <sbb-carousel-item>
                            ${choose(imgType, [
                              [
                                'native',
                                () => html`
                                  <img src=${imageUrl} alt="SBB image" height="300" width="400" />
                                `,
                              ],
                              [
                                'sbb-image',
                                () => html`
                                  <sbb-image
                                    image-src=${imageUrl}
                                    alt="SBB image"
                                    style="width: 400px; height: 300px;"
                                  ></sbb-image>
                                `,
                              ],
                              [
                                'figure',
                                () => html`
                                  <figure class="sbb-figure" style="width: 400px; height: 300px;">
                                    <sbb-chip-label class="sbb-figure-overlap-start-start">
                                      Chip label
                                    </sbb-chip-label>
                                    <img src=${imageUrl} alt="SBB image" />
                                    <figcaption style="text-align: center;">
                                      Caption for picture
                                    </figcaption>
                                  </figure>
                                `,
                              ],
                              [
                                'link',
                                () => html`
                                  <a
                                    href="https://github.com/sbb-design-systems/lyne-components"
                                    target="_blank"
                                    aria-label="Navigate to lyne-angular repo"
                                  >
                                    <sbb-image
                                      image-src=${imageUrl}
                                      alt="SBB image"
                                      style="width: 400px; height: 300px;"
                                    ></sbb-image>
                                  </a>
                                `,
                              ],
                            ])}
                          </sbb-carousel-item>
                        `,
                      )}
                    </sbb-carousel-list>
                    <sbb-compact-paginator></sbb-compact-paginator>
                  </sbb-carousel>
                `,
                {
                  backgroundColor: shadow
                    ? 'var(--sbb-background-color-3)'
                    : 'var(--sbb-background-color-1)',
                },
              );

              setup.withPostSetupAction(async () => {
                await Promise.all(
                  Array.from(
                    setup.snapshotElement.querySelectorAll<HTMLImageElement | SbbImageElement>(
                      'img, sbb-image',
                    ),
                    (el) => waitForImageReady(el),
                  ),
                );
                setup.snapshotElement
                  .querySelectorAll('sbb-carousel-item')[0]!
                  .scrollIntoView({ behavior: 'instant' });
                await aTimeout(10);
              });
            }),
          );
        }
      });
    }
  });

  describeViewports({ viewports: ['large'] }, () => {
    it(
      'darkMode=true',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-carousel>
              <sbb-carousel-list>
                ${repeat(
                  new Array(3),
                  () => html`
                    <sbb-carousel-item>
                      <img src=${imageUrl} alt="SBB image" height="300" width="400" />
                    </sbb-carousel-item>
                  `,
                )}
              </sbb-carousel-list>
              <sbb-compact-paginator></sbb-compact-paginator>
            </sbb-carousel>
          `,
          { darkMode: true },
        );

        setup.withPostSetupAction(async () => {
          await Promise.all(
            Array.from(setup.snapshotElement.querySelectorAll<HTMLImageElement>('img'), (el) =>
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
