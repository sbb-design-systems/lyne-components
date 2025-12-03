import { html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { describeViewports, visualDiffDefault } from '../core/testing/private.ts';

import './map-container.component.ts';
import '../card.ts';
import '../header.ts';
import '../logo.ts';
import '../title.ts';

describe(`sbb-map-container`, () => {
  const template = (stickyOffset = false): TemplateResult => html`
    <sbb-header expanded>
      <sbb-header-button icon-name="hamburger-menu-small" expand-from="small">
        Menu
      </sbb-header-button>
      <div class="sbb-header-spacer"></div>
      <sbb-logo protective-room="none" class="sbb-header-logo"></sbb-logo>
    </sbb-header>
    <sbb-map-container
      style=${stickyOffset
        ? `--sbb-map-container-mobile-sticky-block-start: var(--sbb-header-height);`
        : nothing}
    >
      <!-- Content slot -->
      <div style="padding: var(--sbb-spacing-fixed-4x)">
        <sbb-title level="4">Operations & Disruptions</sbb-title>
        ${[...Array(5).keys()].map(
          (value) => html`
            <sbb-card color="milk" style="margin-block-end: var(--sbb-spacing-fixed-4x);">
              <p>Situation ${value}</p>
            </sbb-card>
          `,
        )}
      </div>

      <div slot="map" style="height: 100%">
        <div
          style=${styleMap({
            'background-color': 'grey',
            height: '100%',
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
          })}
        >
          map
        </div>
      </div>
    </sbb-map-container>
  `;

  beforeEach(() => {
    // Reset page scrolling
    window.scrollTo(0, 0);
  });

  describeViewports({ viewports: ['zero', 'large'], viewportHeight: 500 }, () => {
    for (const darkMode of [false, true]) {
      it(
        `darkMode=${darkMode}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template(), { padding: '0', minHeight: '500px', darkMode });
        }),
      );
    }
  });

  describeViewports({ viewports: ['zero'], viewportHeight: 500 }, () => {
    it(
      'scrolled without sticky offset',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template(), { padding: '0' });
        setup.withPostSetupAction(() => {
          window.scrollTo(0, 100);
        });
      }),
    );

    it(
      'scrolled with sticky offset',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template(true), { padding: '0' });
        setup.withPostSetupAction(() => {
          window.scrollTo(0, 100);
        });
      }),
    );
  });
});
