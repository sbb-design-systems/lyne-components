import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './map-container.js';
import '../header.js';
import '../title.js';

describe(`sbb-map-container`, () => {
  describeViewports({ viewports: ['zero', 'medium'], viewportHeight: 500 }, () => {
    it(
      visualDiffDefault.name,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-header expanded>
              <sbb-header-button icon-name="hamburger-menu-small" expand-from="small">
                Menu
              </sbb-header-button>
            </sbb-header>
            <sbb-map-container>
              <!-- Content slot -->
              <div style="padding: var(--sbb-spacing-fixed-4x)">
                <sbb-title level="4">Operations & Disruptions</sbb-title>
                ${[...Array(5).keys()].map(
                  (value) => html`
                    <div
                      style=${styleMap({
                        'background-color': 'var(--sbb-color-milk)',
                        height: '116px',
                        display: 'flex',
                        'align-items': 'center',
                        'justify-content': 'center',
                        'border-radius': 'var(--sbb-border-radius-4x)',
                        'margin-block-end': 'var(--sbb-spacing-fixed-4x)',
                      })}
                    >
                      <p>Situation ${value}</p>
                    </div>
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
          `,
          { padding: '0' },
        );
      }),
    );
  });
});
