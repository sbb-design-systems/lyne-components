import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.ts';

import './divider.component.ts';

describe(`sbb-divider`, () => {
  let root: HTMLElement;

  const cases = {
    orientation: ['horizontal', 'vertical'],
    negative: [false, true],
    darkMode: [false, true],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ negative, orientation, darkMode }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <div style=${orientation === 'vertical' ? 'height: 340px' : nothing}>
              <sbb-divider ?negative=${negative} orientation=${orientation}></sbb-divider>
            </div>
          `,
          {
            backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
            darkMode,
          },
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
