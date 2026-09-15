import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.ts';

import '../../pearl-chain.ts';

describe(`sbb-pearl-chain`, () => {
  let root: HTMLElement;

  const cases = {
    type: [
      'stop',
      'skip',
      'commercial',
      'stop-duty',
      'stop-on-demand',
      'boarding',
      'alighting',
      'boarding-on-demand',
      'alighting-on-demand',
      'start',
      'end',
    ],
    now: ['before', 'in-progress', 'after'],
    orientation: ['horizontal', 'vertical'],
    state: ['', 'disrupted', 'irrelevant', 'walk', 'unsure', 'disrupted+irrelevant'],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  describeViewports({ viewports: ['small'] }, () => {
    describeEach(
      cases,
      ({ type, now, orientation, state, emulateMedia: { forcedColors, darkMode } }) => {
        beforeEach(async function () {
          const currentTime =
            now === 'before'
              ? '2026-09-14T08:00:00'
              : now === 'in-progress'
                ? '2026-09-14T12:00:00'
                : '2026-09-14T15:00:00';
          root = await visualRegressionFixture(
            html`
              <sbb-pearl-chain now=${currentTime}>
                <div
                  style="display: flex; flex-direction: ${orientation === 'horizontal' ? 'row' : 'column'}; align-items: center; width: 400px; height: 400px;"
                >
                  <sbb-pearl-chain-node
                    type="start"
                    departure="2026-09-14T09:00:00"
                  ></sbb-pearl-chain-node>
                  <span style="flex: 1;"></span>
                  <sbb-pearl-chain-node
                    type=${type}
                    ?disrupted=${state.includes('disrupted')}
                    ?irrelevant=${state.includes('irrelevant')}
                    ?walk=${state.includes('walk')}
                    ?unsure=${state.includes('unsure')}
                    arrival="2026-09-14T11:00:00"
                    departure="2026-09-14T11:10:00"
                  ></sbb-pearl-chain-node>
                  <span style="flex: 1;"></span>
                  <sbb-pearl-chain-node
                    type="end"
                    arrival="2026-09-14T14:00:00"
                  ></sbb-pearl-chain-node>
                </div>
              </sbb-pearl-chain>
            `,
            {
              forcedColors,
              darkMode,
            },
          );
        });

        it(
          '',
          visualDiffDefault.with((setup) => {
            setup.withSnapshotElement(root);
          }),
        );
      },
    );
  });
});
