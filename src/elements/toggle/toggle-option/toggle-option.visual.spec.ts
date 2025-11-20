import { html, nothing } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.ts';

import './toggle-option.component.ts';

describe(`sbb-toggle-option`, () => {
  describeViewports({ viewports: ['zero'] }, () => {
    it(
      `label only`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-toggle-option value="Value 1"> Option </sbb-toggle-option>
        `);
      }),
    );

    for (const label of [true, false]) {
      it(
        `icon with${label ? '' : 'out'} label`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-toggle-option value="Value 1" icon-name="app-icon-small">
              ${label ? `Option` : nothing}
            </sbb-toggle-option>
          `);
        }),
      );
    }

    for (const label of [true, false]) {
      it(
        `slotted icon with${label ? '' : 'out'} label`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-toggle-option value="Value 1">
              ${label ? `Option` : nothing}
              <sbb-icon name="app-icon-small" slot="icon"></sbb-icon>
            </sbb-toggle-option>
          `);
        }),
      );
    }
  });
});
