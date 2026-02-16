import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import {
  describeEach,
  describeViewports,
  visualRegressionFixture,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.ts';
import { waitForCondition } from '../../core/testing/wait-for-condition.ts';

import './table-wrapper.component.ts';

describe(`sbb-table-wrapper`, () => {
  let root: HTMLElement;

  const cases = {
    negative: [false, true],
    scrollbar: [false, true],
  };

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    describeEach(cases, ({ negative, scrollbar }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-table-wrapper ?negative=${negative}>
              <table
                class=${classMap({
                  'sbb-table': true,
                  'sbb-table--negative': negative,
                })}
                style=${scrollbar ? 'width: 120%' : nothing}
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
              </table>
            </sbb-table-wrapper>
            <p class="sbb-table-caption">Table caption</p>
          `,
          {
            backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
          },
        );
        if (scrollbar) {
          const element = root.querySelector('sbb-table-wrapper')!;
          await waitForCondition(
            () => !element.classList.contains('sbb-table-wrapper-offset-none'),
          );
        }
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    it(
      'focusable',
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-table-wrapper focusable>
            <table class="sbb-table">
              <tr>
                <td>Content</td>
                <td>Content</td>
              </tr>
              <tr>
                <td>Content</td>
                <td>Content</td>
              </tr>
            </table>
          </sbb-table-wrapper>`,
        );
      }),
    );
  });
});
