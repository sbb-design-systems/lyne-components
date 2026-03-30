import type { TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { html } from 'lit/static-html.js';

import style from '../../../storybook/styles/layout/layout.scss?lit&inline';
import { describeViewports, visualDiffDefault } from '../testing/private.ts';

describe(`layout`, () => {
  const wrapperStyles = { padding: '0' };

  const withStyles = (template: TemplateResult): TemplateResult => html`
    <style>
      ${style}
    </style>
    ${template}
  `;

  const gridContent = (): TemplateResult => html`${repeat(new Array(16), () => html`<div></div>`)}`;

  describeViewports(() => {
    it(
      'page spacing',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          withStyles(
            html`<section class="sbb-page-spacing visualized-page-spacing">
              <div><span>Content</span></div>
            </section>`,
          ),
          wrapperStyles,
        );
      }),
    );

    it(
      'page spacing expanded',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          withStyles(
            html`<section class="sbb-page-spacing-expanded visualized-page-spacing">
              <div><span>Content</span></div>
            </section>`,
          ),
          wrapperStyles,
        );
      }),
    );

    it(
      'grid',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          withStyles(html`<div class="sbb-grid visualized-grid">${gridContent()}</div>`),
          wrapperStyles,
        );
      }),
    );

    it(
      'grid expanded',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          withStyles(html`<div class="sbb-grid-expanded visualized-grid">${gridContent()}</div>`),
          wrapperStyles,
        );
      }),
    );
  });
});
