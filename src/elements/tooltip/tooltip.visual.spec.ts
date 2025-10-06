import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './tooltip.component.js';
import '../button/button.js';

describe('sbb-tooltip', () => {
  const positions = [
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

  describeViewports({ viewports: ['medium'], viewportHeight: 250 }, () => {
    for (const position of positions) {
      it(
        `position=${position} ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <div style="padding-block: 5rem; padding-inline: 10rem">
              <sbb-button icon-name="pen-small" id="trigger">Button</sbb-button>
              <sbb-tooltip
                trigger="trigger"
                style="--sbb-overlay-controller-position-area: ${position}"
                >I am a tooltip with a message</sbb-tooltip
              >
            </div>
          `);
          setup.withPostSetupAction(async () => {
            document.querySelector('sbb-tooltip')!.open();
          });
        }),
      );
    }
  });
});
