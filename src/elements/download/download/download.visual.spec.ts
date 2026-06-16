import { html, type TemplateResult } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.ts';

import type { SbbDownloadElement } from './download.component.ts';

import '../../download.ts';

describe(`sbb-download`, () => {
  let root: HTMLElement;

  const cases = {
    color: ['white', 'milk'] satisfies SbbDownloadElement['color'][],
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
    describeEach(cases, ({ color }) => {
      beforeEach(async () => {
        root = await visualRegressionFixture(html`
          <sbb-download href="files/annual-report.pdf" color=${color}>
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
  });
});
