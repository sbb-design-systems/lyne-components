import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.js';

import './status.js';

describe(`sbb-status`, () => {
  const cases = {
    type: [
      'info',
      'success',
      'warning',
      'error',
      'pending',
      'incomplete',
      'not-started',
      'in-progress',
    ],
    titleContent: [undefined, 'Title'],
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    let root: HTMLElement;

    describeEach(cases, ({ type, titleContent }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-status type=${type} title-content=${titleContent || nothing}>
            Status text.
          </sbb-status>
        `);
      });

      it(
        '',
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    for (const titleContent of [undefined, 'Title']) {
      describe(`title=${titleContent}`, () => {
        it(
          'custom icon',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-status
                icon-name="pie-small"
                title-content=${titleContent || nothing}
                type="success"
              >
                Status text.
              </sbb-status>
            `);
          }),
        );

        it(
          'custom slotted icon',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-status title-content=${titleContent || nothing} type="success">
                <sbb-icon slot="icon" name="pie-small"></sbb-icon>
                Status text.
              </sbb-status>
            `);
          }),
        );

        it(
          'long content',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-status
                title-content=${titleContent
                  ? 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor'
                  : nothing || nothing}
                type="success"
              >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.
              </sbb-status>
            `);
          }),
        );
      });
    }
  });
});
