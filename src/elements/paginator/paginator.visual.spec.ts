import { html, nothing } from 'lit';

import {
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../core/testing/private.js';

import './paginator.js';

describe('sbb-paginator', () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const negative of [false, true]) {
      describe(`negative=${negative}`, () => {
        const wrapperStyle = {
          backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
          focusOutlineDark: negative,
        };

        for (const state of [visualDiffFocus, visualDiffHover, visualDiffActive] as const) {
          describe(`state=${state.name}`, () => {
            for (const selected of [false, true]) {
              it(
                `selected=${selected}`,
                state.with(async (setup) => {
                  await setup.withFixture(
                    html`<sbb-paginator
                      ?negative=${negative || nothing}
                      length="50"
                      page-size="10"
                      pager-position="end"
                    ></sbb-paginator>`,
                    wrapperStyle,
                  );
                  setup.withStateElement(
                    setup.snapshotElement
                      .querySelector('sbb-paginator')!
                      .shadowRoot!.querySelector(`button[data-index="${selected ? 0 : 1}"]`)!,
                  );
                }),
              );
            }
          });
        }

        for (const pageIndex of [0, 2, 5, 7, 9]) {
          it(
            `pageIndex=${pageIndex}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                html` <sbb-paginator
                  length="100"
                  page-index="${pageIndex}"
                  ?negative=${negative || nothing}
                ></sbb-paginator>`,
                wrapperStyle,
              );
            }),
          );
        }

        for (const pagerPosition of ['start', 'end']) {
          describe(`pagerPosition=${pagerPosition}`, () => {
            for (const size of ['s', 'm']) {
              it(
                `size=${size}`,
                visualDiffDefault.with(async (setup) => {
                  const pageSizeOptions = [10, 20, 50];
                  await setup.withFixture(
                    html` <sbb-paginator
                      length="50"
                      page-size="4"
                      size=${size}
                      pager-position=${pagerPosition}
                      .pageSizeOptions="${pageSizeOptions}"
                      ?negative=${negative || nothing}
                    ></sbb-paginator>`,
                    wrapperStyle,
                  );
                }),
              );
            }
          });
        }
      });
    }
  });
});
