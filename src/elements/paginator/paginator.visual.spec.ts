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

        for (const state of [visualDiffDefault, visualDiffFocus]) {
          it(
            `state=${state.name}`,
            state.with(async (setup) => {
              await setup.withFixture(
                html` <sbb-paginator
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
                  .shadowRoot!.querySelector(`.sbb-paginator__page--number-item[data-index="0"]`)!,
              );
            }),
          );
        }

        for (const selected of [false, true]) {
          describe(`selected=${selected}`, () => {
            for (const state of [visualDiffActive, visualDiffHover]) {
              it(
                `state=${state.name}`,
                state.with(async (setup) => {
                  await setup.withFixture(
                    html` <sbb-paginator
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
                      .shadowRoot!.querySelector(
                        `.sbb-paginator__page--number-item[data-index="${selected ? 0 : 2}"]`,
                      )!,
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

        for (const size of ['s', 'm']) {
          it(
            `size=${size} pageSizeOptions`,
            visualDiffDefault.with(async (setup) => {
              const pageSizeOptions = [10, 20, 50];
              await setup.withFixture(
                html` <sbb-paginator
                  length="50"
                  page-size="4"
                  size=${size}
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
});
