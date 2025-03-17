import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.js';

import './divider.component.js';

describe(`sbb-divider`, () => {
  let root: HTMLElement;

  const cases = {
    orientation: ['horizontal', 'vertical'],
    negative: [false, true],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ negative, orientation }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <div style=${orientation === 'vertical' ? 'height: 340px' : nothing}>
              <sbb-divider ?negative=${negative} orientation=${orientation}></sbb-divider>
            </div>
          `,
          { backgroundColor: negative ? 'var(--sbb-color-charcoal)' : undefined },
        );
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
