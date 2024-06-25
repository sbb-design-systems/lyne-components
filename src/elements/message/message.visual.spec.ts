import { html } from 'lit/static-html.js';

import { describeViewports, visualDiffDefault } from '../core/testing/private.js';
import { waitForImageReady } from '../core/testing.js';

import './message.js';
import '../image.js';
import '../button/secondary-button.js';

const imageUrl = import.meta.resolve('../core/testing/assets/lucerne.png');

describe(`sbb-message`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    it(
      'default',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-message title-content="Unfortunately, an error has occurred.">
            <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
            <p slot="subtitle">Please reload the page or try your search again later.</p>
            <p slot="legend">Error code: 0001</p>
            <sbb-secondary-button
              slot="action"
              icon-name="arrows-circle-small"
              size="m"
            ></sbb-secondary-button>
          </sbb-message>
        `);

        await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
      }),
    );

    it(
      'no image',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-message title-content="Unfortunately, an error has occurred.">
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
          <sbb-message title-content="Unfortunately, an error has occurred.">
            <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
            <p slot="subtitle">Please reload the page or try your search again later.</p>
            <sbb-secondary-button
              slot="action"
              icon-name="arrows-circle-small"
              size="m"
            ></sbb-secondary-button>
          </sbb-message>
        `);

        await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
      }),
    );

    it(
      'no action',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-message title-content="Unfortunately, an error has occurred.">
            <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
            <p slot="subtitle">Please reload the page or try your search again later.</p>
            <p slot="legend">Error code: 0001</p>
          </sbb-message>
        `);

        await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
      }),
    );

    it(
      'slotted title',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-message>
            <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
            <p slot="title">Slotted title</p>
            <p slot="subtitle">Please reload the page or try your search again later.</p>
            <p slot="legend">Error code: 0001</p>
            <sbb-secondary-button
              slot="action"
              icon-name="arrows-circle-small"
              size="m"
            ></sbb-secondary-button>
          </sbb-message>
        `);

        await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
      }),
    );
  });
});
