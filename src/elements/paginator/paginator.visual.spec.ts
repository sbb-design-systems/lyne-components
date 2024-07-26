import { html } from 'lit';

import { describeViewports, visualDiffDefault, visualDiffFocus } from '../core/testing/private.js';

import './paginator.js';

describe('sbb-paginator', () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const state of [visualDiffDefault, visualDiffFocus]) {
      it(
        `${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`<sbb-paginator length="50" page-size="4"></sbb-paginator>`);
        }),
      );
    }

    for (const pageIndex of [0, 2, 5, 7, 9]) {
      it(
        `pageIndex=${pageIndex}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-paginator length="100" page-index=${pageIndex}></sbb-paginator>
          `);
        }),
      );
    }

    it(
      `pageSizeOptions`,
      visualDiffDefault.with(async (setup) => {
        const pageSizeOptions = [10, 20, 50];
        await setup.withFixture(
          html`<sbb-paginator
            length="50"
            page-size="4"
            page-size-options=${pageSizeOptions}
          ></sbb-paginator>`,
        );
      }),
    );
  });
});
