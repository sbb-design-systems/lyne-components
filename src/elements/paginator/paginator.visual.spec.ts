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
  describeViewports({ viewports: ['small', 'medium'] }, () => {
    for (const negative of [false, true]) {
      const wrapperStyle = {
        backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
        focusOutlineDark: negative,
      };

      for (const state of [visualDiffDefault, visualDiffFocus]) {
        it(
          `${state.name} negative=${negative}`,
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

      for (const state of [visualDiffActive, visualDiffHover]) {
        for (const selected of [false, true]) {
          it(
            `${state.name} negative=${negative} selected=${selected}`,
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
      }

      for (const pageIndex of [0, 2, 5, 7, 9]) {
        it(
          `pageIndex=${pageIndex} negative=${negative}`,
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

      it(
        `pageSizeOptions negative=${negative}`,
        visualDiffDefault.with(async (setup) => {
          const pageSizeOptions = [10, 20, 50];
          await setup.withFixture(
            html` <sbb-paginator
              length="50"
              page-size="4"
              .pageSizeOptions="${pageSizeOptions}"
              ?negative=${negative || nothing}
            ></sbb-paginator>`,
            wrapperStyle,
          );
        }),
      );

      it(
        `size=s negative=${negative}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html` <sbb-paginator
              length="50"
              page-size="4"
              size="s"
              ?negative=${negative || nothing}
            ></sbb-paginator>`,
            wrapperStyle,
          );
        }),
      );
    }
  });
});
