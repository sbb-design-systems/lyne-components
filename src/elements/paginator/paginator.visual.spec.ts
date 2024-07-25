import { html } from 'lit';

import {
  describeViewports,
  describeEach,
  visualDiffDefault,
  visualDiffFocus,
} from '../core/testing/private.js';

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

    const cases = {
      pageIndex: [0, 2, 5, 7, 9],
    };
    describeEach(cases, ({ pageIndex }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-paginator length="100" page-index=${pageIndex}></sbb-paginator>
          `);
        }),
      );
    });
  });
});
