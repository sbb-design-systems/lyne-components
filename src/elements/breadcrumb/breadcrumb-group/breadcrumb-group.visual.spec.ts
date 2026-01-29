import { html } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.ts';

import type { SbbBreadcrumbGroupElement } from './breadcrumb-group.component.ts';

import '../breadcrumb.ts';
import './breadcrumb-group.component.ts';

describe('sbb-breadcrumb-group', () => {
  const variants = [
    { name: 'long', numberOfBreadcrumbs: 3 },
    { name: 'collapsed', numberOfBreadcrumbs: 25 },
    { name: 'manually-expanded', numberOfBreadcrumbs: 25 },
  ];

  describeViewports({ viewports: ['ultra'] }, () => {
    for (const { forcedColors, darkMode } of [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ]) {
      describe(`forcedColors=${forcedColors} darkMode=${darkMode}`, () => {
        for (const variant of variants) {
          describe(variant.name, () => {
            for (const state of [visualDiffDefault, visualDiffFocus]) {
              it(
                state.name,
                state.with(async (setup) => {
                  await setup.withFixture(
                    html`
                      <sbb-breadcrumb-group aria-label="You are here:">
                        <sbb-breadcrumb href="/" icon-name="house-small"></sbb-breadcrumb>
                        ${new Array(variant.numberOfBreadcrumbs - 1)
                          .fill(undefined)
                          .map(
                            (_, i) =>
                              html`<sbb-breadcrumb href="https://www.sbb.ch" target="_blank">
                                Breadcrumb ${i + 1}
                              </sbb-breadcrumb>`,
                          )}
                      </sbb-breadcrumb-group>
                    `,
                    {
                      forcedColors,
                      darkMode,
                    },
                  );

                  if (variant.name === 'manually-expanded') {
                    setup.withPostSetupAction(() => {
                      const ellipsisButton = setup.snapshotElement
                        .querySelector<SbbBreadcrumbGroupElement>('sbb-breadcrumb-group')!
                        .shadowRoot!.getElementById('sbb-breadcrumb-ellipsis')!;
                      ellipsisButton.click();
                    });
                  }
                }),
              );
            }
          });
        }
      });
    }
  });
});
