import { html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../core/testing/private.js';
import { waitForImageReady } from '../core/testing.js';

import './teaser.js';

const imageUrl = import.meta.resolve('../core/testing/assets/placeholder-image.png');

describe(`sbb-teaser`, () => {
  const loremIpsum: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in tincidunt
    quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut, hendrerit risus. Vestibulum rutrum elit et
    lacus sollicitudin, quis malesuada lorem vehicula. Suspendisse at augue quis tellus vulputate tempor. Vivamus urna
    velit, varius nec est ac, mollis efficitur lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat
    metus. Donec pharetra odio at turpis bibendum, vel commodo dui vulputate. Aenean congue nec nisl vel bibendum.
    Praesent sit amet lorem augue. Suspendisse ornare a justo sagittis fermentum.`;
  const longChip: string =
    'This is a chip which has a very long content and should receive ellipsis.';

  const visualStates = {
    hasChip: [false, true],
    withLongContent: [false, true],
  };

  const screenCombinations = [
    { viewport: 'micro' as const, alignments: ['below'] },
    { viewport: 'medium' as const, alignments: ['after-centered', 'after', 'below'] },
  ];

  for (const screenCombination of screenCombinations) {
    describeViewports({ viewports: [screenCombination.viewport] }, () => {
      for (const alignment of screenCombination.alignments) {
        describe(`alignment=${alignment}`, () => {
          for (const visualDiffStandardState of [
            visualDiffDefault,
            visualDiffFocus,
            visualDiffHover,
          ]) {
            it(
              `state=${visualDiffStandardState.name}`,
              visualDiffStandardState.with(async (setup) => {
                await setup.withFixture(
                  html`
                    <sbb-teaser title-content="This is a title" href="#" alignment=${alignment}>
                      <img slot="image" src=${imageUrl} />
                      This is a paragraph
                    </sbb-teaser>
                  `,
                  { maxWidth: '760px' },
                );
                await waitForImageReady(setup.snapshotElement.querySelector('img')!);
              }),
            );
          }

          describeEach(visualStates, ({ hasChip, withLongContent }) => {
            it(
              '',
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(
                  html`
                    <sbb-teaser
                      title-content="This is a title"
                      href="#"
                      alignment=${alignment}
                      chip-content=${hasChip ? 'This is a chip.' : nothing}
                    >
                      <img slot="image" src=${imageUrl} />
                      ${withLongContent ? loremIpsum : 'This is a paragraph'}
                    </sbb-teaser>
                  `,
                  { maxWidth: '760px' },
                );
                await waitForImageReady(setup.snapshotElement.querySelector('img')!);
              }),
            );
          });

          it(
            `longChip=true`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                html`
                  <sbb-teaser
                    style="width: 400px;"
                    title-content="This is a title"
                    href="#"
                    alignment=${alignment}
                    chip-content=${longChip}
                  >
                    <img slot="image" src=${imageUrl} />
                    This is a paragraph
                  </sbb-teaser>
                `,
                { maxWidth: '760px' },
              );
              await waitForImageReady(setup.snapshotElement.querySelector('img')!);
            }),
          );

          it(
            `list=true`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(html`
                <ul style="list-style: none; padding: 0;">
                  ${repeat(
                    new Array(5),
                    (_, i) => html`
                      <li style="margin-block: 1rem;">
                        <sbb-teaser
                          title-content="This is title n.${i + 1}"
                          href="#"
                          alignment=${alignment}
                        >
                          <img slot="image" src=${imageUrl} />
                          This is the paragraph n.${i + 1}
                        </sbb-teaser>
                      </li>
                    `,
                  )}
                </ul>
              `);
              await waitForImageReady(setup.snapshotElement.querySelector('img')!);
            }),
          );
        });
      }
    });
  }
});
