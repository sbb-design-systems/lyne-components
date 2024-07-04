import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.js';

import '../status.js';

describe(`sbb-status`, () => {
  const cases = {
    type: ['info', 'success', 'warning', 'error'],
    titleContent: [undefined, 'Title'],
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    let root: HTMLElement;

    describeEach(cases, ({ type, titleContent }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-status type=${type} title-content=${titleContent || nothing}
            >Status text.</sbb-status
          >
        `);
      });

      it(
       '',
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    it(
      'custom icon',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-status icon-name="pie-small">Status text.</sbb-status>
        `);
      }),
    );

    it(
      'custom slotted icon',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-status><sbb-icon slot="icon" name="pie-small"></sbb-icon>Status text.</sbb-status>
        `);
      }),
    );
  });
});
