import { html } from 'lit/static-html.js';

import sampleImages from '../core/images.js';
import { describeViewports, visualDiffDefault } from '../core/testing/private.js';
import { waitForImageReady } from '../core/testing.js';

import './image.js';

const imageUrl = import.meta.resolve('../core/testing/assets/placeholder-image.png');

const aspectRatios = [
  '1-1',
  '1-2',
  '2-1',
  '2-3',
  '3-2',
  '3-4',
  '4-3',
  '4-5',
  '5-4',
  '9-16',
  '16-9',
];

describe(`sbb-image`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const aspectRatio of aspectRatios) {
      it(
        `aspect-ratio=${aspectRatio}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-image image-src=${imageUrl} class="sbb-image-${aspectRatio}"></sbb-image>`,
          );

          setup.withPostSetupAction(
            async () => await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!),
          );
        }),
      );
    }

    it(
      `aspect-ratio=free`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-image
            image-src=${imageUrl}
            class="sbb-image-free"
            style="--sbb-image-aspect-ratio: 10 / 1;"
          ></sbb-image>`,
        );

        setup.withPostSetupAction(
          async () => await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!),
        );
      }),
    );

    for (const borderRadius of ['none', 'round', 'default']) {
      it(
        `border-radius=${borderRadius}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-image
              image-src=${imageUrl}
              class="sbb-image-1-1 sbb-image-border-radius-${borderRadius}"
            ></sbb-image>`,
          );

          setup.withPostSetupAction(
            async () => await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!),
          );
        }),
      );
    }

    it(
      'with caption',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<figure class="sbb-figure">
            <sbb-image image-src=${imageUrl} alt="Station of Lucerne from outside"></sbb-image>
            <figcaption>
              A long text which takes several lines and contains a link
              <a
                href="https://www.sbb.ch/abos-billette/abonnemente/gleis-7-freie-fahrt-ab-19-uhr.html#jahrg_nger_halbtax"
                >Gleis 7</a
              >. After the link there is more text.
            </figcaption>
          </figure>`,
        );

        setup.withPostSetupAction(
          async () => await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!),
        );
      }),
    );

    it(
      'transparent image from img cdn',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`<sbb-image image-src=${sampleImages[8]}></sbb-image>`);

        setup.withPostSetupAction(
          async () => await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!),
        );
      }),
    );

    it(
      'cropped',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-image image-src=${imageUrl} style="width: 200px; height: 200px"></sbb-image>`,
        );

        setup.withPostSetupAction(
          async () => await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!),
        );
      }),
    );

    it(
      'cropped with caption',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<figure class="sbb-figure">
            <sbb-image image-src=${imageUrl} style="width: 200px; height: 300px"></sbb-image>
            <figcaption>I am a caption below</figcaption>
          </figure>`,
        );

        setup.withPostSetupAction(
          async () => await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!),
        );
      }),
    );

    it(
      'cropped with object-position',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-image
            image-src=${imageUrl}
            style="width: 200px; height: 300px; --sbb-image-object-position: 0 0"
          ></sbb-image>`,
        );

        setup.withPostSetupAction(
          async () => await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!),
        );
      }),
    );

    it(
      'cropped with object-fit',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-image
            image-src=${imageUrl}
            style="width: 200px; height: 300px; --sbb-image-object-fit: contain"
          ></sbb-image>`,
        );

        setup.withPostSetupAction(
          async () => await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!),
        );
      }),
    );

    it(
      'skipLqip=true',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-image skip-lqip image-src=${imageUrl} class="sbb-image-1-1"></sbb-image>`,
        );

        setup.withPostSetupAction(
          async () => await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!),
        );
      }),
    );
  });
});
