import { html, nothing } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './toast.component.js';
import '../button.js';
import '../link.js';

describe(`sbb-toast`, () => {
  const cases = {
    icon: [false, true],
    readonly: [false, true],
    action: ['button', 'link'],
    content: ['short', 'long'],
  };

  const positionCases = [
    'top-start',
    'top-center',
    'top-end',
    'bottom-start',
    'bottom-center',
    'bottom-end',
  ];

  describeViewports({ viewports: ['zero', 'medium'], viewportHeight: 300 }, () => {
    describeEach(cases, ({ icon, action, readonly, content }) => {
      it(
        '',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-toast icon-name=${icon ? 'circle-tick-small' : nothing} ?readonly=${readonly}>
                ${content === 'short'
                  ? html`Lorem ipsum dolor`
                  : html`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                    tempor incididunt.`}
                ${action === 'button'
                  ? html`<sbb-transparent-button
                      slot="action"
                      icon-name="clock-small"
                      sbb-toast-close
                    ></sbb-transparent-button>`
                  : nothing}
                ${action === 'link'
                  ? html`<sbb-link slot="action" sbb-toast-close href="#">Link action</sbb-link>`
                  : nothing}
              </sbb-toast>
            `,
            { minHeight: '300px', padding: '0' },
          );
          setup.withPostSetupAction(() => setup.snapshotElement.querySelector('sbb-toast')!.open());
        }),
      );
    });

    for (const position of positionCases) {
      it(
        `position=${position}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-toast icon-name="circle-tick-small" position=${position}>
                Lorem ipsum dolor
              </sbb-toast>
            `,
            { minHeight: '300px', padding: '0' },
          );
          setup.withPostSetupAction(() => setup.snapshotElement.querySelector('sbb-toast')!.open());
        }),
      );
    }
  });
});
