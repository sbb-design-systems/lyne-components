import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.js';

import '../title.js';
import './status.component.js';

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
    title: [true, false],
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    let root: HTMLElement;

    describeEach(cases, ({ type, title }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-status type=${type}>
            ${title ? html`<sbb-title level="3">Title</sbb-title>` : nothing}
            <p>Status text.</p>
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

    for (const title of cases.title) {
      describe(`title=${title}`, () => {
        it(
          'custom icon',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-status icon-name="face-smiling-small" type="success">
                ${title ? html`<sbb-title level="3">Title</sbb-title>` : nothing}
                <p>Status text.</p>
              </sbb-status>
            `);
          }),
        );

        it(
          'custom slotted icon',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-status type="success">
                ${title ? html`<sbb-title level="3">Title</sbb-title>` : nothing}
                <sbb-icon slot="icon" name="face-smiling-small"></sbb-icon>
                <p>Status text.</p>
              </sbb-status>
            `);
          }),
        );

        it(
          'long content',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-status type="success">
                ${title
                  ? html`
                      <sbb-title level="3">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                        eirmod tempor
                      </sbb-title>
                    `
                  : nothing}
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                  vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                  no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
              </sbb-status>
            `);
          }),
        );
      });
    }
  });
});
