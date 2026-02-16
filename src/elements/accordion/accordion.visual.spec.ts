import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.ts';

import './accordion.component.ts';
import '../expansion-panel.ts';

describe(`sbb-accordion`, () => {
  let root: HTMLElement;

  const cases = {
    borderless: [false, true],
    expanded: [false, true],
  };

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    // Main test cases
    describeEach(cases, ({ borderless, expanded }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-accordion>
              <sbb-expansion-panel ?borderless=${borderless}>
                <sbb-expansion-panel-header>Header 1</sbb-expansion-panel-header>
                <sbb-expansion-panel-content>Content 1</sbb-expansion-panel-content>
              </sbb-expansion-panel>
              <sbb-expansion-panel ?borderless=${borderless} ?expanded=${expanded}>
                <sbb-expansion-panel-header>Header 2</sbb-expansion-panel-header>
                <sbb-expansion-panel-content>Content 2</sbb-expansion-panel-content>
              </sbb-expansion-panel>
              <sbb-expansion-panel ?borderless=${borderless}>
                <sbb-expansion-panel-header>Header 3</sbb-expansion-panel-header>
                <sbb-expansion-panel-content>Content 3</sbb-expansion-panel-content>
              </sbb-expansion-panel>
            </sbb-accordion>
          `,
          {
            backgroundColor: borderless ? 'var(--sbb-background-color-4)' : undefined,
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

    it(
      'forcedColors=true',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-accordion>
              <sbb-expansion-panel>
                <sbb-expansion-panel-header>Header 1</sbb-expansion-panel-header>
                <sbb-expansion-panel-content>Content 1</sbb-expansion-panel-content>
              </sbb-expansion-panel>
              <sbb-expansion-panel expanded>
                <sbb-expansion-panel-header>Header 2</sbb-expansion-panel-header>
                <sbb-expansion-panel-content>Content 2</sbb-expansion-panel-content>
              </sbb-expansion-panel>
              <sbb-expansion-panel>
                <sbb-expansion-panel-header>Header 3</sbb-expansion-panel-header>
                <sbb-expansion-panel-content>Content 3</sbb-expansion-panel-content>
              </sbb-expansion-panel>
            </sbb-accordion>
          `,
          { forcedColors: true },
        );
      }),
    );
  });
});
