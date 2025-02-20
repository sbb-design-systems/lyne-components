import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { SbbButtonElement } from '../../button/button.js';
import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import '../../button/button.js';
import '../../divider.js';
import '../../link.js';
import '../menu-link.js';
import '../menu-button.js';
import './menu.js';

describe(`sbb-menu`, () => {
  const userNameStyle = {
    fontWeight: 'bold',
    fontSize: 'var(--sbb-font-size-text-xs)',
    marginTop: 'var(--sbb-spacing-fixed-1x)',
  };

  const userInfoStyle = {
    color: 'var(--sbb-color-graphite)',
    fontSize: 'var(--sbb-font-size-text-xxs)',
  };

  describeViewports({ viewports: ['zero', 'medium'], viewportHeight: 400 }, () => {
    it(
      visualDiffDefault.name,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-button id="menu-trigger-1" size="m"> Menu trigger</sbb-button>
            <sbb-menu trigger="menu-trigger-1">
              <sbb-menu-link icon-name="link-small" href="https://www.sbb.ch/en">
                View
              </sbb-menu-link>
              <sbb-menu-button icon-name="pen-small" sbb-badge="16" disabled>
                Edit
              </sbb-menu-button>
              <sbb-menu-button icon-name="swisspass-small" sbb-badge="123">
                Details</sbb-menu-button
              >
              <sbb-divider></sbb-divider>
              <sbb-menu-button icon-name="cross-small">Cancel</sbb-menu-button>
            </sbb-menu>
          `,
          { minHeight: '400px' },
        );
        setup.withPostSetupAction(() => {
          const button = setup.snapshotElement.querySelector<SbbButtonElement>('#menu-trigger-1')!;
          button.click();
        });
      }),
    );

    it(
      'list with scroll',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-button id="menu-trigger-2" size="m"> Menu trigger</sbb-button>
            <sbb-menu trigger="menu-trigger-2">
              ${repeat(
                new Array(10),
                (_, index) => html`<sbb-menu-button>Element ${index}</sbb-menu-button>`,
              )}
            </sbb-menu>
          `,
          { minHeight: '400px' },
        );
        setup.withPostSetupAction(() => {
          const button = setup.snapshotElement.querySelector<SbbButtonElement>('#menu-trigger-2')!;
          button.click();
        });
      }),
    );

    it(
      'custom content with long label',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-button id="menu-trigger-3" size="m"> Menu trigger</sbb-button>
            <sbb-menu trigger="menu-trigger-3">
              <div style=${styleMap(userNameStyle)}>Christina Müller</div>
              <span style=${styleMap(userInfoStyle)}>UIS9057</span>
              <sbb-block-link href="https://www.sbb.ch/en" negative size="xs">
                Profile
              </sbb-block-link>
              <sbb-divider></sbb-divider>
              <sbb-menu-button icon-name="swisspass-small">
                Very long label that exceeds the maximum width of the menu
              </sbb-menu-button>
              <sbb-menu-link icon-name="link-small" href="https://www.sbb.ch/en">
                View
              </sbb-menu-link>
              <sbb-menu-button icon-name="tickets-class-small" disabled> Tickets </sbb-menu-button>
              <sbb-divider></sbb-divider>
              <sbb-menu-button icon-name="exit-small">Log Out</sbb-menu-button>
            </sbb-menu>
          `,
          { minHeight: '400px' },
        );

        setup.withPostSetupAction(() => {
          const button = setup.snapshotElement.querySelector<SbbButtonElement>('#menu-trigger-3')!;
          button.click();
        });
      }),
    );
  });
});
