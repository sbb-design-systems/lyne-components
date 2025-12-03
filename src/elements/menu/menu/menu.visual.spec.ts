import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { SbbButtonElement } from '../../button/button.ts';
import { describeViewports, tabKey, visualDiffDefault } from '../../core/testing/private.ts';

import '../../button/button.ts';
import '../../divider.ts';
import '../../link.ts';
import '../menu-link.ts';
import '../menu-button.ts';
import './menu.component.ts';
import type { SbbMenuElement } from './menu.component.ts';

describe(`sbb-menu`, () => {
  const userNameStyle = {
    fontWeight: 'bold',
    fontSize: 'var(--sbb-text-font-size-xs)',
    marginTop: 'var(--sbb-spacing-fixed-1x)',
  };

  const userInfoStyle = {
    color: 'light-dark(var(--sbb-color-graphite), var(--sbb-color-granite))',
    fontSize: 'var(--sbb-text-font-size-xxs)',
  };

  describeViewports({ viewports: ['zero', 'large'], viewportHeight: 400 }, () => {
    it(
      visualDiffDefault.name,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-button id="menu-trigger-1" size="m">Menu trigger</sbb-button>
            <sbb-menu trigger="menu-trigger-1">
              <sbb-menu-link icon-name="link-small" href="https://www.sbb.ch/en">
                View
              </sbb-menu-link>
              <sbb-menu-button icon-name="pen-small" disabled>Edit</sbb-menu-button>
              <sbb-menu-button icon-name="swisspass-small" sbb-badge="123">
                Details
              </sbb-menu-button>
              <sbb-divider></sbb-divider>
              <sbb-menu-button icon-name="cross-small">Cancel</sbb-menu-button>
            </sbb-menu>
          `,
          { minHeight: '400px' },
        );
        setup.withPostSetupAction(async () => {
          const button = setup.snapshotElement.querySelector<SbbButtonElement>('#menu-trigger-1')!;
          button.click();

          // Test focus outline
          await sendKeys({ press: tabKey });
        });
      }),
    );

    it(
      'list with scroll',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-button id="menu-trigger-2" size="m">Menu trigger</sbb-button>
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
            <sbb-button id="menu-trigger-3" size="m">Menu trigger</sbb-button>
            <sbb-menu trigger="menu-trigger-3">
              <div style=${styleMap(userNameStyle)}>Christina Müller</div>
              <span style=${styleMap(userInfoStyle)}>UIS9057</span>
              <sbb-block-link href="https://www.sbb.ch/en" size="xs"> Profile </sbb-block-link>
              <sbb-divider></sbb-divider>
              <sbb-menu-button icon-name="swisspass-small">
                Very long label that exceeds the maximum width of the menu
              </sbb-menu-button>
              <sbb-menu-link icon-name="link-small" href="https://www.sbb.ch/en">
                View
              </sbb-menu-link>
              <sbb-menu-button icon-name="tickets-class-small" disabled>Tickets</sbb-menu-button>
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

    it(
      'nested default',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-button id="menu-trigger-1" size="m">Menu trigger</sbb-button>
            <sbb-menu trigger="menu-trigger-1">
              <sbb-menu-button icon-name="link-small">First level menu</sbb-menu-button>
              <sbb-menu-button icon-name="pen-small">First level menu</sbb-menu-button>
              <sbb-menu-button icon-name="swisspass-small" id="menu-trigger-2">
                First level menu
              </sbb-menu-button>
              <sbb-menu-button icon-name="cross-small">First level menu</sbb-menu-button>
            </sbb-menu>
            <sbb-menu trigger="menu-trigger-2">
              <sbb-menu-button icon-name="link-small">Second level menu</sbb-menu-button>
              <sbb-menu-button icon-name="pen-small">Second level menu</sbb-menu-button>
              <sbb-menu-button icon-name="swisspass-small">Second level menu</sbb-menu-button>
              <sbb-menu-button icon-name="cross-small">Second level menu</sbb-menu-button>
            </sbb-menu>
          `,
          { minHeight: '400px' },
        );

        setup.withPostSetupAction(() => {
          let button = setup.snapshotElement.querySelector<SbbButtonElement>('#menu-trigger-1')!;
          const menu = setup.snapshotElement.querySelector<SbbMenuElement>('sbb-menu')!;

          button.click();

          button = menu.querySelector('#menu-trigger-2')!;
          button.click();
        });
      }),
    );
  });

  describeViewports({ viewports: ['large'], viewportHeight: 500 }, () => {
    it(
      'nested wrap left',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <div style="display: flex;">
              <sbb-button id="menu-trigger-1" size="m" style="margin-inline-start: auto;"
                >Menu trigger</sbb-button
              >
              <sbb-menu trigger="menu-trigger-1">
                <sbb-menu-button icon-name="link-small">First level menu</sbb-menu-button>
                <sbb-menu-button icon-name="pen-small">First level menu</sbb-menu-button>
                <sbb-menu-button icon-name="swisspass-small" id="menu-trigger-2">
                  First level menu
                </sbb-menu-button>
                <sbb-menu-button icon-name="cross-small">First level menu</sbb-menu-button>
              </sbb-menu>
              <sbb-menu trigger="menu-trigger-2">
                <sbb-menu-button icon-name="link-small">Second level menu</sbb-menu-button>
                <sbb-menu-button icon-name="pen-small">Second level menu</sbb-menu-button>
                <sbb-menu-button icon-name="swisspass-small">Second level menu</sbb-menu-button>
                <sbb-menu-button icon-name="cross-small">Second level menu</sbb-menu-button>
              </sbb-menu>
            </div>
          `,
          { minHeight: '500px' },
        );

        setup.withPostSetupAction(() => {
          let button = setup.snapshotElement.querySelector<SbbButtonElement>('#menu-trigger-1')!;
          const menu = setup.snapshotElement.querySelector<SbbMenuElement>('sbb-menu')!;

          button.click();

          button = menu.querySelector('#menu-trigger-2')!;
          button.click();
        });
      }),
    );

    it(
      'darkMode=true',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-button id="menu-trigger-1" size="m">Menu trigger</sbb-button>
            <sbb-menu trigger="menu-trigger-1">
              <sbb-menu-link icon-name="link-small" href="https://www.sbb.ch/en">
                View
              </sbb-menu-link>
              <sbb-menu-button icon-name="pen-small" disabled>Edit</sbb-menu-button>
              <sbb-menu-button icon-name="swisspass-small" sbb-badge="123">
                Details
              </sbb-menu-button>
              <sbb-divider></sbb-divider>
              <sbb-menu-button icon-name="cross-small">Cancel</sbb-menu-button>
            </sbb-menu>
          `,
          { minHeight: '400px', darkMode: true },
        );
        setup.withPostSetupAction(async () => {
          const button = setup.snapshotElement.querySelector<SbbButtonElement>('#menu-trigger-1')!;
          button.click();

          // Test focus outline
          await sendKeys({ press: tabKey });
        });
      }),
    );
  });

  describeViewports({ viewports: ['large'], viewportHeight: 300 }, () => {
    it(
      'nested short page',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-button id="menu-trigger-1" size="m">Menu trigger</sbb-button>
            <sbb-menu trigger="menu-trigger-1">
              <sbb-menu-button icon-name="link-small">First level menu</sbb-menu-button>
              <sbb-menu-button icon-name="pen-small">First level menu</sbb-menu-button>
              <sbb-menu-button icon-name="swisspass-small" id="menu-trigger-2">
                First level menu
              </sbb-menu-button>
              <sbb-menu-button icon-name="cross-small">First level menu</sbb-menu-button>
            </sbb-menu>
            <sbb-menu trigger="menu-trigger-2">
              <sbb-menu-button icon-name="link-small">Second level menu</sbb-menu-button>
              <sbb-menu-button icon-name="pen-small">Second level menu</sbb-menu-button>
              <sbb-menu-button icon-name="swisspass-small">Second level menu</sbb-menu-button>
              <sbb-menu-button icon-name="cross-small">Second level menu</sbb-menu-button>
            </sbb-menu>
          `,
          { minHeight: '300px' },
        );

        setup.withPostSetupAction(() => {
          let button = setup.snapshotElement.querySelector<SbbButtonElement>('#menu-trigger-1')!;
          const menu = setup.snapshotElement.querySelector<SbbMenuElement>('sbb-menu')!;

          button.click();

          button = menu.querySelector('#menu-trigger-2')!;
          button.click();
        });
      }),
    );
  });
});
