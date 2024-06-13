import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import '../breadcrumb.js';
import './breadcrumb-group.js';

describe('sbb-breadcrumb-group', () => {
  let root: HTMLElement;

  const cases = {
    state: [{ numberOfBreadcrumbs: 3 }, { numberOfBreadcrumbs: 25 }],
  };

  describeViewports({ viewports: ['wide'] }, () => {
    describeEach(cases, ({ state }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-breadcrumb-group aria-label="You are here:">
            <sbb-breadcrumb href="/" icon-name="house-small"></sbb-breadcrumb>
            ${new Array(state.numberOfBreadcrumbs - 1)
              .fill(undefined)
              .map(
                (_, i) =>
                  html` <sbb-breadcrumb href="https://www.sbb.ch" target="_blank" download="false"
                    >Breadcrumb ${i + 1}</sbb-breadcrumb
                  >`,
              )}
          </sbb-breadcrumb-group>
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
