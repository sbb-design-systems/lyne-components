import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import {
  describeEach,
  describeViewports,
  visualRegressionFixture,
  visualDiffDefault,
} from '../../../elements/core/testing/private.js';

describe(`sbb-table-wrapper`, () => {
  let root: HTMLElement;

  const cases = {
    size: ['m', 's'],
    negative: [false, true],
    striped: [false, true],
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ size, negative, striped }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <table
              class=${classMap({
                'sbb-table': true,
                'sbb-table--negative': negative,
                'sbb-table-s': size === 's',
                'sbb-table--unstriped': !striped,
              })}
            >
              <thead>
                <tr>
                  <th>Person</th>
                  <th>Most interest in</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Chris</td>
                  <td>HTML tables</td>
                  <td>22</td>
                </tr>
                <tr>
                  <td>Dennis</td>
                  <td>Web accessibility</td>
                  <td>45</td>
                </tr>
              </tbody>
              <caption>
                Table caption
              </caption>
            </table>
          `,
          {
            backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
            focusOutlineDark: negative,
          },
        );
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });
  });
});
