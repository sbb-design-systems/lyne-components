import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import './expansion-panel.js';
import '../expansion-panel-header.js';
import '../expansion-panel-content.js';
import '../../icon.js';

describe(`sbb-expansion-panel`, () => {
  let root: HTMLElement;

  const cases = {
    borderless: [false, true],
    disabled: [false, true],
    expanded: [false, true],
    color: ['white', 'milk'],
  };

  const sizeCases = {
    size: ['s', 'l'],
    expanded: [false, true],
  };

  const titleLevelCases = {
    titleLevel: ['1', '4'],
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    // Main test cases
    describeEach(cases, ({ borderless, disabled, expanded, color }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-expansion-panel
            ?borderless=${borderless}
            ?disabled=${disabled}
            ?expanded=${expanded}
            color=${color}
          >
            <sbb-expansion-panel-header icon-name="arrow-right-small">
              Header
            </sbb-expansion-panel-header>
            <sbb-expansion-panel-content> Content </sbb-expansion-panel-content>
          </sbb-expansion-panel>
        `);
      });

      for (const state of [visualDiffDefault, visualDiffFocus, visualDiffHover]) {
        it(
          state.name,
          state.with((setup) => {
            setup.withSnapshotElement(root);
          }),
        );
      }
    });

    // Size test cases
    describeEach(sizeCases, ({ expanded, size }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-expansion-panel ?expanded=${expanded} size=${size}>
            <sbb-expansion-panel-header icon-name="arrow-right-small">
              Header
            </sbb-expansion-panel-header>
            <sbb-expansion-panel-content> Content </sbb-expansion-panel-content>
          </sbb-expansion-panel>
        `);
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    // Title level test
    for (const titleLevel of titleLevelCases.titleLevel) {
      it(
        `title-level=${titleLevel}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-expansion-panel title-level=${titleLevel}>
              <sbb-expansion-panel-header icon-name="arrow-right-small">
                Header
              </sbb-expansion-panel-header>
              <sbb-expansion-panel-content> Content </sbb-expansion-panel-content>
            </sbb-expansion-panel>
          `);
        }),
      );
    }
  });
});
