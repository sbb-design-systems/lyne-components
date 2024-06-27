import { html, nothing } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import './train-wagon.js';

describe(`sbb-train-wagon`, () => {
  const occupancyCases = ['high', 'medium', 'low', 'none', undefined];
  const typeCases = ['locomotive', 'closed', 'wagon'];
  const wagonClassCases = [1, 2];
  const labelCases = [undefined, '38'];

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const occupancy of occupancyCases) {
      it(
        `occupancy=${occupancy}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-train-wagon occupancy=${occupancy || nothing}></sbb-train-wagon>
          `);
        }),
      );
    }

    for (const type of typeCases) {
      it(
        `type=${type}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`<sbb-train-wagon type=${type}></sbb-train-wagon>`);
        }),
      );
    }

    for (const wagonClass of wagonClassCases) {
      it(
        `class=${wagonClass}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-train-wagon wagon-class=${wagonClass}></sbb-train-wagon>`,
          );
        }),
      );
    }

    for (const label of labelCases) {
      it(
        `label=${label}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-train-wagon label=${label || nothing}></sbb-train-wagon>`,
          );
        }),
      );
    }

    it(
      `one icon`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-train-wagon wagon-class="2" label="38">
            <sbb-icon name="sa-bz"></sbb-icon>
          </sbb-train-wagon>
        `);
      }),
    );

    it(
      `multiple icons`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-train-wagon wagon-class="2" label="38">
            <sbb-icon name="sa-rs"></sbb-icon>
            <sbb-icon name="sa-nf"></sbb-icon>
            <sbb-icon name="sa-bz"></sbb-icon>
          </sbb-train-wagon>
        `);
      }),
    );
  });
});
