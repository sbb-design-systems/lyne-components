import type { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import { describeViewports, visualDiffDefault } from '../../../elements/core/testing/private.ts';

describe(`list`, () => {
  const listContent = (): TemplateResult => html`
    <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</li>
    <li>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
      <p>Other paragraph.</p>
    </li>
    <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</li>
  `;

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const textSize of ['xs', 's', 'm', 'l', 'xl']) {
      describe(`textSize=${textSize}`, () => {
        it(
          'unordered list',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <ul class=${`sbb-list sbb-text-${textSize}`}>
                ${listContent()}
                <li>
                  Nested list
                  <ul>
                    ${listContent()}
                  </ul>
                </li>
              </ul>
            `);
          }),
        );

        it(
          'ordered list',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <ol class=${`sbb-list sbb-text-${textSize}`}>
                ${listContent()}
                <li>
                  Nested list
                  <ol>
                    ${listContent()}
                  </ol>
                </li>
              </ol>
            `);
          }),
        );

        it(
          'step list',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <ol class=${`sbb-step-list sbb-text-${textSize}`}>
                ${listContent()}
                <li>
                  Nested list
                  <ol class="sbb-list">
                    ${listContent()}
                  </ol>
                </li>
              </ol>
            `);
          }),
        );

        it(
          'icon list',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <ol class=${`sbb-icon-list sbb-text-${textSize}`}>
                ${listContent()}
                <li>
                  Nested list
                  <ol class="sbb-list">
                    ${listContent()}
                  </ol>
                </li>
              </ol>
            `);
          }),
        );

        it(
          'custom icon list',
          visualDiffDefault.with(async (setup) => {
            const url = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="%23000" fill-rule="evenodd" d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12m10 .707-3.646 3.646-.708-.707L11.293 12 7.646 8.353l.708-.707L12 11.293l3.646-3.647.708.707L12.707 12l3.647 3.646-.708.707z" clip-rule="evenodd"></path></svg>')`;
            await setup.withFixture(html`
              <ol
                class=${`sbb-icon-list sbb-text-${textSize}`}
                style=${`--sbb-icon-list-marker-icon-color: var(--sbb-color-primary); --sbb-icon-list-marker-icon: ${url}`}
              >
                ${listContent()}
                <li>
                  Nested list
                  <ol class="sbb-list">
                    ${listContent()}
                  </ol>
                </li>
              </ol>
            `);
          }),
        );

        it(
          'icon list custom color',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <ol
                class=${`sbb-icon-list sbb-text-${textSize}`}
                style="color: var(--sbb-color-green);"
              >
                ${listContent()}
                <li>
                  Nested list
                  <ol class="sbb-list">
                    ${listContent()}
                  </ol>
                </li>
              </ol>
            `);
          }),
        );
      });
    }

    it(
      'description list',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<dl class="sbb-list">
            <dt>Label:</dt>
            <dd>Description of the label.</dd>

            <dt>Longer Label:</dt>
            <dd>Description of the label which is longer than the other one.</dd>

            <dt>A very very very long label:</dt>
            <dd>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
              accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet.
            </dd>
          </dl>`,
        );
      }),
    );
  });

  describeViewports({ viewports: ['large'] }, () => {
    for (const { forcedColors, darkMode } of [
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ]) {
      describe(`forcedColors=${forcedColors} darkMode=${darkMode}`, () => {
        it(
          'step list',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`
                <ol class=${`sbb-step-list sbb-text-m`}>
                  ${listContent()}
                  <li>
                    Nested list
                    <ol class="sbb-list">
                      ${listContent()}
                    </ol>
                  </li>
                </ol>
              `,
              { forcedColors, darkMode },
            );
          }),
        );

        it(
          'icon list',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`
                <ol class=${`sbb-icon-list sbb-text-m`}>
                  ${listContent()}
                  <li>
                    Nested list
                    <ol class="sbb-list">
                      ${listContent()}
                    </ol>
                  </li>
                </ol>
              `,
              { forcedColors, darkMode },
            );
          }),
        );

        it(
          'description list',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`<dl class="sbb-list">
                <dt>Label:</dt>
                <dd>Description of the label.</dd>

                <dt>Longer Label:</dt>
                <dd>Description of the label which is longer than the other one.</dd>

                <dt>A very very very long label:</dt>
                <dd>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                  vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                  no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </dd>
              </dl>`,
              { forcedColors, darkMode },
            );
          }),
        );
      });
    }
  });
});
