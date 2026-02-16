import { html } from 'lit/static-html.js';

import { describeViewports, visualDiffDefault } from '../core/testing/private.ts';
import { waitForImageReady } from '../core/testing.ts';

import './message.component.ts';
import '../chip-label.ts';
import '../image.ts';
import '../button/secondary-button.ts';
import '../title.ts';

const imageUrl = import.meta.resolve('../core/testing/assets/placeholder-image.png');

const imgTestCases = [
  {
    title: 'with sbb-image',
    imgSelector: 'sbb-image',
    imgTemplate: () => html`<sbb-image slot="image" image-src=${imageUrl}></sbb-image>`,
  },
  {
    title: 'with img tag',
    imgSelector: 'img',
    imgTemplate: () => html`<img slot="image" src=${imageUrl} alt="" />`,
  },
  {
    title: 'with figure_sbb-image',
    imgSelector: 'sbb-image',
    imgTemplate: () =>
      html`<figure class="sbb-figure" slot="image">
        <sbb-image image-src=${imageUrl}></sbb-image>
        <sbb-chip-label class="sbb-figure-overlap-start-end">AI generated</sbb-chip-label>
      </figure>`,
  },
  {
    title: 'with figure_img',
    imgSelector: 'img',
    imgTemplate: () =>
      html`<figure class="sbb-figure" slot="image">
        <img slot="image" src=${imageUrl} alt="" />
        <sbb-chip-label class="sbb-figure-overlap-start-end">AI generated</sbb-chip-label>
      </figure>`,
  },
];

describe(`sbb-message`, () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const testCase of imgTestCases) {
      it(
        `default ${testCase.title}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-message>
              ${testCase.imgTemplate()}
              <sbb-title level="3" slot="title">Unfortunately, an error has occurred.</sbb-title>
              <p slot="subtitle">Please reload the page or try your search again later.</p>
              <p slot="legend">Error code: 0001</p>
              <sbb-secondary-button
                slot="action"
                icon-name="arrows-circle-small"
                size="m"
              ></sbb-secondary-button>
            </sbb-message>
          `);

          setup.withPostSetupAction(
            async () =>
              await waitForImageReady(setup.snapshotElement.querySelector(testCase.imgSelector)!),
          );
        }),
      );

      it(
        `small image ${testCase.title}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <style>
              [slot='image'] {
                width: 200px;
              }
            </style>
            <sbb-message>
              ${testCase.imgTemplate()}
              <sbb-title level="3" slot="title">Unfortunately, an error has occurred.</sbb-title>
              <p slot="subtitle">Please reload the page or try your search again later.</p>
              <p slot="legend">Error code: 0001</p>
              <sbb-secondary-button
                slot="action"
                icon-name="arrows-circle-small"
                size="m"
              ></sbb-secondary-button>
            </sbb-message>
          `);

          setup.withPostSetupAction(
            async () =>
              await waitForImageReady(setup.snapshotElement.querySelector(testCase.imgSelector)!),
          );
        }),
      );
    }

    it(
      'no image',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-message>
            <sbb-title level="3" slot="title">Unfortunately, an error has occurred.</sbb-title>
            <p slot="subtitle">Please reload the page or try your search again later.</p>
            <p slot="legend">Error code: 0001</p>
            <sbb-secondary-button
              slot="action"
              icon-name="arrows-circle-small"
              size="m"
            ></sbb-secondary-button>
          </sbb-message>
        `);
      }),
    );

    it(
      'no error code',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-message>
            <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
            <sbb-title level="3" slot="title">Unfortunately, an error has occurred.</sbb-title>
            <p slot="subtitle">Please reload the page or try your search again later.</p>
            <sbb-secondary-button
              slot="action"
              icon-name="arrows-circle-small"
              size="m"
            ></sbb-secondary-button>
          </sbb-message>
        `);

        setup.withPostSetupAction(
          async () => await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!),
        );
      }),
    );

    it(
      'no action',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-message>
            <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
            <sbb-title level="3" slot="title">Unfortunately, an error has occurred.</sbb-title>
            <p slot="subtitle">Please reload the page or try your search again later.</p>
            <p slot="legend">Error code: 0001</p>
          </sbb-message>
        `);

        setup.withPostSetupAction(
          async () => await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!),
        );
      }),
    );

    it(
      'darkMode=true',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-message>
              <sbb-title level="3" slot="title">Unfortunately, an error has occurred.</sbb-title>
              <p slot="subtitle">Please reload the page or try your search again later.</p>
              <p slot="legend">Error code: 0001</p>
              <sbb-secondary-button
                slot="action"
                icon-name="arrows-circle-small"
                size="m"
              ></sbb-secondary-button>
            </sbb-message>
          `,
          { darkMode: true },
        );
      }),
    );
  });
});
