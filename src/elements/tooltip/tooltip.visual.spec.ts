import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './tooltip.component.js';
import '../button/mini-button.js';

describe('sbb-tooltip', () => {
  const alignments: { [x: string]: any } = {
    'below-centred': { 'inset-inline-start': 'calc(50% - 44px)' },
    'below-start': { 'inset-inline-start': '2rem' },
    'below-end': { 'inset-inline-end': '2rem' },
    'above-centred': { 'inset-inline-start': 'calc(50% - 44px)', 'inset-block-end': '2rem' },
    'above-start': { 'inset-block-end': '2rem' },
    'above-end': { 'inset-inline-end': '2rem', 'inset-block-end': '2rem' },
  };

  describeViewports({ viewports: ['medium'], viewportHeight: 200 }, () => {
    for (const alignment of Object.keys(alignments)) {
      it(
        `alignment=${alignment} ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <div style="position: relative; height: 200px">
              <sbb-mini-button
                icon-name="pen-small"
                style=${styleMap({
                  position: 'absolute',
                  ...alignments[alignment],
                })}
                sbb-tooltip="I'm a tooltip"
              ></sbb-mini-button>
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
