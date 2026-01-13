import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.ts';

import './expansion-panel.component.ts';
import '../expansion-panel-header.ts';
import '../expansion-panel-content.ts';
import '../../icon.ts';

describe(`sbb-expansion-panel`, () => {
  const cases = {
    borderless: [false, true],
    disabled: [false, true],
    expanded: [false, true],
    color: ['white', 'milk'],
    size: [null, 's', 'l'],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  const titleLevelCases = ['1', '4'];

  const iconCases = [
    { name: 'none', icon: undefined, slotted: false, disabled: false },
    { name: 'none-disabled', icon: undefined, slotted: false, disabled: true },
    { name: 'prop', icon: 'arrow-right-small', slotted: false, disabled: false },
    { name: 'slotted', icon: 'arrow-right-small', slotted: true, disabled: false },
  ];

  describeViewports({ viewports: ['zero', 'large'] }, () => {
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
              <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
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
            <sbb-expansion-panel ?disabled=${state.disabled}>
              <sbb-expansion-panel-header .iconName=${!state.slotted ? state.icon : undefined}>
                ${state.slotted ? html`<sbb-icon name=${state.icon!}></sbb-icon>` : nothing} Label
              </sbb-expansion-panel-header>
              <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
            </sbb-expansion-panel>
          `);
        }),
      );
    }
  });

  describeViewports({ viewports: ['zero'] }, () => {
    // Main test cases
    describeEach(
      cases,
      ({
        borderless,
        disabled,
        expanded,
        size,
        color,
        emulateMedia: { forcedColors, darkMode },
      }) => {
        for (const state of [visualDiffDefault, visualDiffFocus, visualDiffHover]) {
          it(
            state.name,
            state.with((setup) => {
              setup.withFixture(
                html`
                  <sbb-expansion-panel
                    ?borderless=${borderless}
                    ?disabled=${disabled}
                    ?expanded=${expanded}
                    size=${size ?? nothing}
                    color=${color}
                  >
                    <sbb-expansion-panel-header icon-name="arrow-right-small">
                      Header
                    </sbb-expansion-panel-header>
                    <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
                  </sbb-expansion-panel>
                `,
                { forcedColors, darkMode },
              );
            }),
          );

          it(
            `nested ${setup.name}`,
            state.with((setup) => {
              setup.withFixture(
                html`
                  <sbb-expansion-panel
                    ?borderless=${borderless}
                    ?disabled=${disabled}
                    ?expanded=${expanded}
                    size=${size ?? nothing}
                    color=${color}
                  >
                    <sbb-expansion-panel-header icon-name="arrow-right-small">
                      Header
                    </sbb-expansion-panel-header>
                    <sbb-expansion-panel-content>
                      Content
                      <sbb-expansion-panel>
                        <sbb-expansion-panel-header>Nested header</sbb-expansion-panel-header>
                        <sbb-expansion-panel-content>Nested content</sbb-expansion-panel-content>
                      </sbb-expansion-panel>
                    </sbb-expansion-panel-content>
                  </sbb-expansion-panel>
                `,
                { forcedColors, darkMode },
              );
            }),
          );
        }
      },
    );
  });
});
