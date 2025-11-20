import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.ts';

import './action-group.component.ts';
import '../button/button.ts';
import '../button/secondary-button.ts';
import '../link/block-link.ts';

describe(`sbb-action-group`, () => {
  let root: HTMLElement;

  const horizontalCases = [
    { name: '300', elements: 3, alignGroup: 'start' },
    { name: '111', elements: 3, alignGroup: 'start', alignSecond: 'center' },
    { name: '201', elements: 3, alignGroup: 'start', alignThird: 'end' },
    { name: '102', elements: 3, alignGroup: 'end', alignFirst: 'start' },
    { name: '200', elements: 2, alignGroup: 'start' },
    { name: '101', elements: 2, alignGroup: 'start', alignSecond: 'end' },
  ];

  const verticalCases = {
    elements: [3, 2],
    alignGroup: ['start', 'center', 'end'],
  };

  describeViewports({ viewports: ['small', 'ultra'] }, () => {
    describe('horizontal', () => {
      for (const state of horizontalCases) {
        it(
          state.name,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-action-group orientation="horizontal" align-group="${state.alignGroup}">
                <sbb-secondary-button align-self=${state.alignFirst || nothing}
                  >Button 1</sbb-secondary-button
                >
                <sbb-button align-self=${state.alignSecond || nothing}>Button 2</sbb-button>
                ${state.elements === 3
                  ? html` <sbb-block-link
                      align-self=${state.alignThird || nothing}
                      icon-name="chevron-small-left-small"
                      href="https://github.com/sbb-design-systems/lyne-components"
                    >
                      Link
                    </sbb-block-link>`
                  : nothing}
              </sbb-action-group>
            `);
          }),
        );
      }
    });

    describeEach(verticalCases, ({ elements, alignGroup }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-action-group
            orientation="vertical"
            horizontal-from="unset"
            align-group="${alignGroup}"
          >
            <sbb-secondary-button>Button 1</sbb-secondary-button>
            <sbb-button>Button 2</sbb-button>
            ${elements === 3
              ? html` <sbb-block-link
                  icon-name="chevron-small-left-small"
                  href="https://github.com/sbb-design-systems/lyne-components"
                >
                  Link
                </sbb-block-link>`
              : nothing}
          </sbb-action-group>
        `);
      });

      it(
        `vertical ${visualDiffDefault.name}`,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    describe('orientation=vertical-full-width', () => {
      for (const alignSelfThird of ['start', 'center', 'end']) {
        it(
          `align-third=${alignSelfThird}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-action-group
                orientation="vertical"
                horizontal-from="unset"
                align-group="stretch"
              >
                <sbb-secondary-button>Button 1</sbb-secondary-button>
                <sbb-button>Button 2</sbb-button>
                <sbb-block-link
                  icon-name="chevron-small-left-small"
                  href="https://github.com/sbb-design-systems/lyne-components"
                  align-self=${alignSelfThird}
                >
                  Link
                </sbb-block-link>
              </sbb-action-group>
            `);
          }),
        );
      }
    });

    describe('size=s', () => {
      for (const orientation of ['horizontal', 'vertical']) {
        it(
          `orientation=${orientation}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-action-group
                orientation=${orientation}
                horizontal-from="unset"
                button-size="s"
                link-size="s"
              >
                <sbb-secondary-button>Button 1</sbb-secondary-button>
                <sbb-button>Button 2</sbb-button>
                <sbb-block-link
                  icon-name="chevron-small-left-small"
                  href="https://github.com/sbb-design-systems/lyne-components"
                >
                  Link
                </sbb-block-link>
              </sbb-action-group>
            `);
          }),
        );
      }
    });

    it(
      `orientation=vertical-horizontal-from=large`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-action-group orientation="vertical" horizontal-from="large">
            <sbb-secondary-button>Button 1</sbb-secondary-button>
            <sbb-button>Button 2</sbb-button>
            <sbb-block-link
              icon-name="chevron-small-left-small"
              href="https://github.com/sbb-design-systems/lyne-components"
            >
              Link
            </sbb-block-link>
          </sbb-action-group>
        `);
      }),
    );
  });
});
