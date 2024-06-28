import { type TemplateResult, html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import '../toggle-option.js';
import './toggle.js';

describe(`sbb-toggle`, () => {
  let root: HTMLElement;

  const options = (label: boolean, iconName: string = ''): TemplateResult =>
    html`<sbb-toggle-option value="Value 1" icon-name=${iconName}>
        ${label ? `Bern` : nothing}
      </sbb-toggle-option>
      <sbb-toggle-option value="Value 2" icon-name=${iconName && 'arrows-right-left-small'}>
        ${label ? `Zürich` : nothing}
      </sbb-toggle-option>`;

  const sizeCases = { size: ['s', 'm'] };

  const cases = {
    ...sizeCases,
    even: [false, true],
  };

  const iconCases = {
    ...sizeCases,
    label: [true, false],
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ size, even }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-toggle ?even=${even} size=${size as 's' | 'm'}> ${options(true)} </sbb-toggle>
        `);
      });

      for (const state of [visualDiffDefault, visualDiffFocus]) {
        it(
          state.name,
          state.with((setup) => {
            setup.withSnapshotElement(root);
          }),
        );
      }
    });

    for (const size of ['s', 'm']) {
      it(
        `disabled size ${size}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-toggle disabled size=${size as 's' | 'm'}> ${options(true)} </sbb-toggle>
          `);
        }),
      );
    }

    describeEach(iconCases, ({ size, label }) => {
      it(
        `icon ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-toggle size=${size as 's' | 'm'}> ${options(label, 'app-icon-small')} </sbb-toggle>
          `);
        }),
      );
    });

    it(
      'slotted icon',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-toggle>
            <sbb-toggle-option value="Value 1">
              Bern
              <sbb-icon slot="icon" name="app-icon-small"></sbb-icon>
            </sbb-toggle-option>
            <sbb-toggle-option value="Value 2">
              Zürich
              <sbb-icon slot="icon" name="arrows-right-left-small"></sbb-icon>
            </sbb-toggle-option>
          </sbb-toggle>
        `);
      }),
    );

    it(
      'dynamic width',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html` <sbb-toggle>
            <sbb-toggle-option value="Value 1" icon-name="app-icon-small">
              Zürich
            </sbb-toggle-option>
            <sbb-toggle-option value="Value 2" icon-name="arrows-right-left-small">
              Schwarzenbach SG, Schloss Schwarzenbach, Wilerstrasse
            </sbb-toggle-option>
          </sbb-toggle>`,
        );
      }),
    );
  });
});
