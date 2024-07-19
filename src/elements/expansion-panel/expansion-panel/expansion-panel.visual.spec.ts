import { html, nothing } from 'lit';

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

  const titleLevelCases = ['1', '4'];

  const iconCases = [
    { name: 'none', icon: undefined, slotted: false },
    { name: 'prop', icon: 'arrow-right-small', slotted: false },
    { name: 'slotted', icon: 'arrow-right-small', slotted: true },
  ];

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
            <sbb-expansion-panel-content>
              Content,
              <!--TODO remove ','-->
            </sbb-expansion-panel-content>
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
    for (const titleLevel of titleLevelCases) {
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

    // Icon cases
    for (const state of iconCases) {
      it(
        `icon=${state.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-expansion-panel>
              <sbb-expansion-panel-header .iconName=${!state.slotted ? state.icon : undefined}>
                ${state.slotted ? html`<sbb-icon name=${state.icon!}></sbb-icon>` : nothing} Label,
                <!--TODO remove ','-->
              </sbb-expansion-panel-header>
              <sbb-expansion-panel-content> Content </sbb-expansion-panel-content>
            </sbb-expansion-panel>
          `);
        }),
      );
    }
  });
});
