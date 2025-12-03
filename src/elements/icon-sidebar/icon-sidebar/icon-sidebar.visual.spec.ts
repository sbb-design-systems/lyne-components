import { html, nothing, type TemplateResult } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../../core/testing/private.ts';

import type { SbbIconSidebarElement } from './icon-sidebar.component.ts';

import '../../header.ts';
import '../../link/block-link.ts';
import '../../link-list.ts';
import '../../logo.ts';
import '../../icon-sidebar.ts';
import '../../sidebar.ts';

describe('sbb-icon-sidebar', () => {
  const header = html`<sbb-header expanded size="s" scroll-origin="content">
    <sbb-header-button icon-name="hamburger-menu-small">Menu</sbb-header-button>
    <div style="flex-grow: 1"></div>
    <a aria-label="Homepage" href="/" class="sbb-header-logo">
      <sbb-logo protective-room="none"></sbb-logo>
    </a>
  </sbb-header>`;

  const iconSidebar = (color: SbbIconSidebarElement['color']): TemplateResult =>
    html`<sbb-icon-sidebar color=${color}>
      <sbb-icon-sidebar-link
        accessibility-label="Go to the party"
        icon-name="glass-cocktail-small"
        href="#"
      ></sbb-icon-sidebar-link>
      <sbb-icon-sidebar-link
        accessibility-label="Be a unicorn"
        icon-name="unicorn-small"
        href="#"
        class="sbb-active"
        accessibility-current="page"
      ></sbb-icon-sidebar-link>
      <sbb-icon-sidebar-button
        aria-label="Be happy"
        icon-name="face-grinning-small"
      ></sbb-icon-sidebar-button>
    </sbb-icon-sidebar>`;

  const content = html`
    <p style="padding: var(--sbb-spacing-fixed-4x); margin: 0">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
      invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
      justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
      ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
      et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
      sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
      elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
      gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure
      dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat
      nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
      zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,
      consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
      aliquam erat volutpat.
    </p>
  `;

  describeViewports({ viewports: ['zero', 'large'], viewportHeight: 400 }, () => {
    const cases: { color: SbbIconSidebarElement['color'][]; position: ('start' | 'end')[] } = {
      color: ['white', 'milk'],
      position: ['start', 'end'],
    };

    describeEach(cases, ({ color, position }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`${header}<sbb-icon-sidebar-container>
                ${position === 'start' ? iconSidebar(color) : nothing}
                <sbb-icon-sidebar-content id="content">${content}</sbb-icon-sidebar-content>
                ${position === 'end' ? iconSidebar(color) : nothing}
              </sbb-icon-sidebar-container>`,
            {
              backgroundColor: color === 'white' ? 'var(--sbb-background-color-3)' : undefined,
              minHeight: '400px',
            },
          );

          // Scroll
          setup.withPostSetupAction(() => {
            const content = setup.snapshotElement.querySelector('sbb-icon-sidebar-content')!;
            content.scrollTo(0, content.scrollHeight);
          });
        }),
      );
    });

    it(
      'nested',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`${header}
            <sbb-icon-sidebar-container>
              ${iconSidebar('white')}
              <sbb-icon-sidebar-content>
                <sbb-sidebar-container>
                  <sbb-sidebar color="milk" opened>
                    <sbb-sidebar-title>Title</sbb-sidebar-title>
                    <sbb-sidebar-close-button></sbb-sidebar-close-button>
                    <sbb-link-list>
                      <sbb-block-link href="#">Link 1</sbb-block-link>
                      <sbb-block-link href="#" class="sbb-active">Link 2</sbb-block-link>
                    </sbb-link-list>
                  </sbb-sidebar>
                  <sbb-sidebar-content id="content">${content}</sbb-sidebar-content>
                </sbb-sidebar-container>
              </sbb-icon-sidebar-content>
            </sbb-icon-sidebar-container>`,
          { minHeight: '400px' },
        );
      }),
    );
  });

  describeViewports({ viewports: ['large'], viewportHeight: 400 }, () => {
    describeEach(
      {
        color: ['white', 'milk'] as SbbIconSidebarElement['color'][],
      },
      ({ color }) => {
        it(
          `darkMode=true`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`${header}<sbb-icon-sidebar-container>
                  ${iconSidebar(color)}
                  <sbb-icon-sidebar-content id="content">${content}</sbb-icon-sidebar-content>
                </sbb-icon-sidebar-container>`,
              {
                backgroundColor: color === 'white' ? 'var(--sbb-background-color-3)' : undefined,
                minHeight: '400px',
                darkMode: true,
              },
            );

            // Scroll
            setup.withPostSetupAction(() => {
              const content = setup.snapshotElement.querySelector('sbb-icon-sidebar-content')!;
              content.scrollTo(0, content.scrollHeight);
            });
          }),
        );
      },
    );
  });

  describeViewports({ viewports: ['zero', 'large'], viewportHeight: 200 }, () => {
    it(
      'scrolled icons',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`${header}<sbb-icon-sidebar-container>
              ${iconSidebar('milk')}
              <sbb-icon-sidebar-content id="content">${content}</sbb-icon-sidebar-content>
            </sbb-icon-sidebar-container>`,
          { minHeight: '200px' },
        );

        // Scroll
        setup.withPostSetupAction(() => {
          const iconSidebar = setup.snapshotElement.querySelector('sbb-icon-sidebar')!;
          iconSidebar.scrollTo(0, iconSidebar.scrollHeight);
        });
      }),
    );
  });
});
