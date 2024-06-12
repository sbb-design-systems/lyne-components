import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.js';

import './action-group.js';
import '../button/button.js';
import '../button/secondary-button.js';
import '../link/block-link.js';

describe(`sbb-action-group`, () => {
  let root: HTMLElement;

  const horizontalCases = {
    orientation: ['horizontal'],
    states: [
      { elements: 3, alignGroup: 'start' },
      { elements: 3, alignGroup: 'start', alignSecond: 'center' },
      { elements: 3, alignGroup: 'start', alignThird: 'end' },
      { elements: 3, alignGroup: 'end', alignFirst: 'start' },
      { elements: 2, alignGroup: 'start' },
      { elements: 2, alignGroup: 'start', alignSecond: 'end' },
    ],
  };

  const verticalCases = {
    orientation: ['vertical'],
    elements: [3, 2],
    alignGroup: ['start', 'center', 'end'],
  };

  describeViewports({ viewports: ['small', 'wide'] }, () => {
    describeEach(horizontalCases, ({ orientation, states }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-action-group orientation=${orientation} align-group="${states.alignGroup}">
            <sbb-secondary-button align-self=${states.alignFirst || nothing}
              >Button 1</sbb-secondary-button
            >
            <sbb-button align-self=${states.alignSecond || nothing}>Button 2</sbb-button>
            ${states.elements === 3
              ? html` <sbb-block-link
                  align-self=${states.alignThird || nothing}
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
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    describeEach(verticalCases, ({ orientation, elements, alignGroup }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-action-group
            orientation=${orientation}
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
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    describe('vertical full-width', () => {
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
      `horizontal-from=medium`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-action-group orientation="vertical" horizontal-from="medium">
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
