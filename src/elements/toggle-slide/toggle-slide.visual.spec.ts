import { html, nothing } from 'lit';
import { ref } from 'lit/directives/ref.js';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
} from '../core/testing/private.ts';

import type { SbbToggleSlideElement } from './toggle-slide.component.ts';

import '../toggle-slide.ts';

describe(`sbb-toggle-slide`, () => {
  const sizeCases = {
    size: [null, 's', 'm', 'l'] satisfies SbbToggleSlideElement['size'][],
    checked: [false, true],
  };

  const cases = {
    checked: [false, true],
    states: [
      { disabled: false, readonly: false },
      { disabled: true, readonly: false },
      { disabled: false, readonly: true },
    ],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    describeEach(sizeCases, ({ size, checked }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-toggle-slide size=${size || nothing} ?checked=${checked}>
              <sbb-toggle-slide-unchecked-label>
                Pull right to start
              </sbb-toggle-slide-unchecked-label>
              <sbb-toggle-slide-checked-label>Pull left to stop</sbb-toggle-slide-checked-label>
            </sbb-toggle-slide>
          `);
        }),
      );
    });
  });

  describeViewports({ viewports: ['large'] }, () => {
    describeEach(
      cases,
      ({ states: { disabled, readonly }, checked, emulateMedia: { forcedColors, darkMode } }) => {
        for (const state of visualDiffStandardStates) {
          it(
            state.name,
            state.with(async (setup) => {
              await setup.withFixture(
                html`
                  <sbb-toggle-slide ?disabled=${disabled} ?readonly=${readonly} ?checked=${checked}>
                    <sbb-toggle-slide-unchecked-label>
                      Pull right to start
                    </sbb-toggle-slide-unchecked-label>
                    <sbb-toggle-slide-checked-label>
                      Pull left to stop
                    </sbb-toggle-slide-checked-label>
                  </sbb-toggle-slide>
                `,
                { forcedColors, darkMode },
              );

              // As the button is not at the center of the toggle slide, we need to forward the button when active or hover is tested.
              if (state.name === 'active' || state.name === 'hover') {
                setup.withStateElement(
                  setup.snapshotElement
                    .querySelector<SbbToggleSlideElement>('sbb-toggle-slide')!
                    .shadowRoot!.querySelector<HTMLElement>('sbb-button-static')!,
                );
              }
            }),
          );
        }
      },
    );

    it(
      'long label unchecked',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-toggle-slide>
            <sbb-toggle-slide-unchecked-label>
              Custom label with long text that needs ellipsis
            </sbb-toggle-slide-unchecked-label>
          </sbb-toggle-slide>`,
        );
      }),
    );

    it(
      'long label checked',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-toggle-slide checked>
            <sbb-toggle-slide-checked-label>
              Custom label with long text that needs ellipsis
            </sbb-toggle-slide-checked-label>
          </sbb-toggle-slide>`,
        );
      }),
    );

    it(
      'sliding progress',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-toggle-slide style="--sbb-toggle-slide-fraction: 0.5">
            <sbb-toggle-slide-unchecked-label>
              Custom label with long text that needs ellipsis
            </sbb-toggle-slide-unchecked-label>
          </sbb-toggle-slide>`,
        );
      }),
    );

    it(
      'validating',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-toggle-slide
            checked
            ${ref((el?: Element) => {
              if (!el) {
                return;
              }
              (el as SbbToggleSlideElement)['_state'] = 'validating';
            })}
          >
            <sbb-toggle-slide-unchecked-label>
              Custom label with long text that needs ellipsis
            </sbb-toggle-slide-unchecked-label>
          </sbb-toggle-slide>`,
        );
      }),
    );

    it(
      'custom width',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-toggle-slide style="width: 500px">
            <sbb-toggle-slide-unchecked-label>
              Custom label with long text that doesn't need ellipsis
            </sbb-toggle-slide-unchecked-label>
          </sbb-toggle-slide>`,
        );
      }),
    );

    it(
      'stays in boundaries',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<div style="width: 200px;">
            <sbb-toggle-slide>
              <sbb-toggle-slide-unchecked-label> Custom label </sbb-toggle-slide-unchecked-label>
            </sbb-toggle-slide>
          </div>`,
        );
      }),
    );
  });
});
