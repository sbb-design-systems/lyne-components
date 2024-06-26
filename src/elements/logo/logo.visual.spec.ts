import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.js';

import './logo.js';

describe(`sbb-logo`, () => {
  let root: HTMLElement;

  const cases = {
    negative: [false, true],
    protectiveRoom: ['none', 'minimal', 'ideal'],
  };

  describeViewports({ viewports: ['medium'] }, () => {
    // Main test cases
    describeEach(cases, ({ negative, protectiveRoom }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html` <sbb-logo ?negative=${negative} protective-room=${protectiveRoom}></sbb-logo> `,
          { backgroundColor: negative ? 'var(--sbb-color-charcoal)' : undefined, padding: '0' },
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
