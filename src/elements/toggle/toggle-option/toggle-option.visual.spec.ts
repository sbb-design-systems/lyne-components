import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import './toggle-option.js';

describe(`sbb-toggle-option`, () => {
  let root: HTMLElement;

  const cases = {
    label: [true, false],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describe('default', () => {
      it(
        `label only ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-toggle-option value="Value 1"> Option </sbb-toggle-option>
          `);
        }),
      );
    });

    describeEach(cases, ({ label }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-toggle-option value="Value 1" icon-name="app-icon-small">
            ${label ? `Option` : nothing}
          </sbb-toggle-option>
        `);
      });

      it(
        `icon ${visualDiffDefault.name}`,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    describeEach(cases, ({ label }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-toggle-option value="Value 1">
            ${label ? `Option` : nothing}
            <sbb-icon name="app-icon-small" slot="icon"></sbb-icon>
          </sbb-toggle-option>
        `);
      });

      it(
        `slotted icon ${visualDiffDefault.name}`,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });
  });
});
