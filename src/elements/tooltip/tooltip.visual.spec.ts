import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../core/testing/private.ts';
import { waitForLitRender } from '../core/testing.ts';

import './tooltip.component.ts';
import '../button/button.ts';

const physicalSupportedPositions = [
  'top',
  'bottom',
  'left',
  'right',
  'top span-left',
  'top span-right',
  'bottom span-left',
  'bottom span-right',
  'left span-top',
  'left span-bottom',
  'right span-top',
  'right span-bottom',
];

// Note: if you add new logical supported positions, update also the 'rtlPositionMapping'
const logicalSupportedPositions = [
  'block-start',
  'block-end',
  'inline-start',
  'inline-end',
  'block-start span-inline-start',
  'block-start span-inline-end',
  'block-end span-inline-start',
  'block-end span-inline-end',
  'inline-start span-block-start',
  'inline-start span-block-end',
  'inline-end span-block-start',
  'inline-end span-block-end',
];

describe('sbb-tooltip', () => {
  const positions = [...physicalSupportedPositions, ...logicalSupportedPositions];

  describeViewports({ viewports: ['large'], viewportHeight: 250 }, () => {
    afterEach(async () => {
      document.documentElement.removeAttribute('dir');
    });

    for (const position of positions) {
      it(
        `position=${position} ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <div style="padding-block: 5rem; padding-inline: 10rem">
              <sbb-button icon-name="pen-small" id="trigger">Button</sbb-button>
              <sbb-tooltip trigger="trigger" style="--sbb-overlay-position-area: ${position}">
                I am a tooltip with a message
              </sbb-tooltip>
            </div>
          `);
          setup.withPostSetupAction(async () => {
            document.querySelector('sbb-tooltip')!.open();
            await waitForLitRender(setup.snapshotElement);
          });
        }),
      );
    }

    for (const position of logicalSupportedPositions) {
      it(
        `position=${position} rtl`,
        visualDiffDefault.with(async (setup) => {
          document.documentElement.dir = 'rtl';
          await setup.withFixture(html`
            <div style="padding-block: 5rem; padding-inline: 10rem">
              <sbb-button icon-name="pen-small" id="trigger">Button</sbb-button>
              <sbb-tooltip trigger="trigger" style="--sbb-overlay-position-area: ${position}">
                I am a tooltip with a message
              </sbb-tooltip>
            </div>
          `);
          setup.withPostSetupAction(async () => {
            document.querySelector('sbb-tooltip')!.open();
          });
        }),
      );
    }

    it(
      `darkMode=true`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <div style="padding-block: 5rem; padding-inline: 10rem">
              <sbb-button icon-name="pen-small" id="trigger">Button</sbb-button>
              <sbb-tooltip trigger="trigger">I am a tooltip with a message</sbb-tooltip>
            </div>
          `,
          { darkMode: true },
        );
        setup.withPostSetupAction(async () => {
          document.querySelector('sbb-tooltip')!.open();
          await waitForLitRender(setup.snapshotElement);
        });
      }),
    );
  });
});
