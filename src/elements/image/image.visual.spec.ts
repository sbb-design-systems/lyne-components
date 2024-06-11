import { html } from 'lit/static-html.js';

import sampleImages from '../core/images.js';
import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.js';
import { waitForImageReady } from '../core/testing.js';

import './image.js';

const imageUrl = import.meta.resolve('../core/testing/assets/lucerne.png');

describe(`sbb-image`, () => {
  const aspectRatioCases = {
    aspectRatio: [
      'free',
      '1-1',
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
    ],
  };

  const additionalBorderRadiusCases = {
    borderRadius: ['none', 'round'],
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(aspectRatioCases, ({ aspectRatio }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-image image-src=${imageUrl} aspect-ratio=${aspectRatio}></sbb-image>`,
          );

          await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
        }),
      );
    });

    describeEach(additionalBorderRadiusCases, ({ borderRadius }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-image
              image-src=${imageUrl}
              border-radius=${borderRadius}
              aspect-ratio="1-1"
            ></sbb-image>`,
          );

          await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
        }),
      );
    });

    it(
      'with caption',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-image
            image-src=${imageUrl}
            alt="Station of Lucerne from outside"
            caption=${`A long text which takes several lines and contains a link <a href="https://www.sbb.ch/abos-billette/abonnemente/gleis-7-freie-fahrt-ab-19-uhr.html#jahrg_nger_halbtax">Gleis 7</a>. After the link there is more text.`}
          ></sbb-image>`,
        );

        await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
      }),
    );

    it(
      'with transparent image from img cdn',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`<sbb-image image-src=${sampleImages[9]}></sbb-image>`);

        await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
      }),
    );
  });
});
