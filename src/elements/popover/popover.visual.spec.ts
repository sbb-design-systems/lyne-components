import { html, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { describeViewports, visualDiffDefault } from '../core/testing/private.ts';

import './popover.component.ts';
import '../button/mini-button.ts';
import '../link/block-link.ts';
import '../title.ts';

describe(`sbb-popover`, () => {
  const positionCases = [
    { name: 'top-left', alignItems: 'baseline', justifyContent: 'start' },
    { name: 'top-center', alignItems: 'baseline', justifyContent: 'center' },
    { name: 'top-right', alignItems: 'baseline', justifyContent: 'end' },
    { name: 'bottom-left', alignItems: 'end', justifyContent: 'start' },
    { name: 'bottom-center', alignItems: 'end', justifyContent: 'center' },
    { name: 'bottom-right', alignItems: 'end', justifyContent: 'end' },
  ];

  const popover = (hideCloseButton?: boolean): TemplateResult => html`
    <sbb-mini-button icon-name="circle-information-small" id="popover-trigger"></sbb-mini-button>

    <sbb-popover trigger="popover-trigger" ?hide-close-button=${hideCloseButton}>
      <sbb-title level="2" visual-level="6" style="margin-block-start: 0">Title.</sbb-title>
      <p style="margin: 0" class="sbb-text-s">
        Some content.
        <sbb-block-link
          size="s"
          icon-name="chevron-small-right-small"
          icon-placement="end"
          sbb-popover-close
        >
          Learn More
        </sbb-block-link>
      </p>
    </sbb-popover>
  `;

  describeViewports({ viewports: ['zero', 'large'], viewportHeight: 400 }, () => {
    for (const position of positionCases) {
      it(
        `position=${position.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <div
                style=${styleMap({
                  height: '400px',
                  padding: '3rem',
                  display: 'flex',
                  alignItems: position.alignItems,
                  justifyContent: position.justifyContent,
                })}
              >
                ${popover()}
              </div>
            `,
            { padding: '0' },
          );
          setup.withPostSetupAction(() =>
            setup.snapshotElement.querySelector('sbb-mini-button')!.click(),
          );
        }),
      );
    }

    it(
      `hide-close-button`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(popover(true), {
          minHeight: '400px',
          padding: '3rem',
        });
        setup.withPostSetupAction(() =>
          setup.snapshotElement.querySelector('sbb-mini-button')!.click(),
        );
      }),
    );

    it(
      `darkMode=true`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(popover(), {
          minHeight: '400px',
          padding: '3rem',
          darkMode: true,
        });
        setup.withPostSetupAction(() =>
          setup.snapshotElement.querySelector('sbb-mini-button')!.click(),
        );
      }),
    );

    it(
      `forcedColors=true`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(popover(), {
          minHeight: '400px',
          padding: '3rem',
          forcedColors: true,
        });
        setup.withPostSetupAction(() =>
          setup.snapshotElement.querySelector('sbb-mini-button')!.click(),
        );
      }),
    );

    it(
      'small content',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-mini-button
              icon-name="circle-information-small"
              id="popover-trigger"
            ></sbb-mini-button>
            <sbb-popover trigger="popover-trigger">Test</sbb-popover>
          `,
          {
            minHeight: '400px',
            padding: '3rem',
          },
        );
        setup.withPostSetupAction(() =>
          setup.snapshotElement.querySelector('sbb-mini-button')!.click(),
        );
      }),
    );
  });

  describeViewports({ viewports: ['zero'], viewportHeight: 150 }, () => {
    it(
      `scrollable content`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(popover(), {
          minHeight: '150px',
          padding: '3rem',
        });
        setup.withPostSetupAction(() =>
          setup.snapshotElement.querySelector('sbb-mini-button')!.click(),
        );
      }),
    );
  });
});
