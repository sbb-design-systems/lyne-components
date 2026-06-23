import { html, type TemplateResult } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../core/testing/private.ts';

import type { SbbDownloadElement } from './download.component.ts';

import '../../download.ts';

describe(`sbb-download`, () => {
  let root: HTMLElement;

  const cases = {
    color: ['white', 'milk'] satisfies SbbDownloadElement['color'][],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  const infoTemplate = (): TemplateResult => html`
    <sbb-download-info
      type="PDF"
      size="1234567"
      changed="2026-12-24"
      non-accessible
    ></sbb-download-info>
  `;

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    describeEach(cases, ({ color, emulateMedia: { forcedColors, darkMode } }) => {
      beforeEach(async () => {
        root = await visualRegressionFixture(
          html`
            <sbb-download href="files/annual-report.pdf" color=${color}>
              ${infoTemplate()}
            </sbb-download>
          `,
          { forcedColors, darkMode },
        );
      });

      for (const state of visualDiffStandardStates) {
        it(
          state.name,
          state.with((setup) => {
            setup.withSnapshotElement(root);
          }),
        );
      }
    });

    describe('with custom content and info', () => {
      beforeEach(async () => {
        root = await visualRegressionFixture(html`
          <sbb-download href="files/annual-report.pdf" label="Annual report">
            <span>Custom description for the downloadable document.</span>
            ${infoTemplate()}
          </sbb-download>
        `);
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    describe('without slotted content', () => {
      beforeEach(async () => {
        root = await visualRegressionFixture(html`
          <sbb-download href="files/annual-report.pdf" label="Annual report"></sbb-download>
        `);
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    it(
      'with ellipsis',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <div style="max-width: 300px;">
            <sbb-download
              href="files/annual-report.pdf"
              label="This download label name is so long that it needs ellipsis to fit and to be pretty sure we get an ellipsis we even add more text"
            >
              ${infoTemplate()}
            </sbb-download>
          </div>
        `);
      }),
    );
  });
});
