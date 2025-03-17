import { html, nothing } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './toast.component.js';
import '../button.js';
import '../link.js';

describe(`sbb-toast`, () => {
  const cases = {
    icon: [false, true],
    action: ['dismissible', 'button', 'link'],
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
    describeEach(cases, ({ icon, action }) => {
      it(
        '',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-toast
                icon-name=${icon ? 'circle-tick-small' : nothing}
                ?dismissible=${action === 'dismissible'}
              >
                Lorem ipsum dolor
                ${action === 'button'
                  ? html`<sbb-transparent-button
                      slot="action"
                      icon-name="clock-small"
                      sbb-toast-close
                    ></sbb-transparent-button>`
                  : nothing}
                ${action === 'link'
                  ? html`<sbb-link slot="action" sbb-toast-close href="#"> Link action </sbb-link>`
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
              <sbb-toast icon-name="circle-tick-small" dismissible position=${position}>
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
