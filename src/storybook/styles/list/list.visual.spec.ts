import type { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import { describeViewports, visualDiffDefault } from '../../../elements/core/testing/private.js';

describe(`list`, () => {
  const listContent = (): TemplateResult => html`
    <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</li>
    <li>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
      <p>Other paragraph.</p>
    </li>
    <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</li>
  `;

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
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
          'checkup list',
          visualDiffDefault.with((setup) => {
            setup.withFixture(html`
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
          visualDiffDefault.with((setup) => {
            setup.withFixture(html`
              <ol
                class=${`sbb-icon-list sbb-text-${textSize}`}
                style="--sbb-checkup-list-marker-icon-color: var(--sbb-color-red); --sbb-checkup-list-marker-icon: url('https://icons.app.sbb.ch/icons/circle-cross-medium.svg')"
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
          'checkup list custom color',
          visualDiffDefault.with((setup) => {
            setup.withFixture(html`
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
});
