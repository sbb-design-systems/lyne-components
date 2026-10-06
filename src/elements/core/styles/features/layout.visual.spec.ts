import type { TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { html } from 'lit/static-html.js';

import { describeViewports, visualDiffDefault } from '../../testing/private.ts';

import style from './layout.private.scss?inline';

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

  const orientationItems = html`
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  `;

  describeViewports({ viewports: ['zero', 'small'] }, () => {
    it(
      'orientation vertical',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          withStyles(html`<div class="sbb-orientation-vertical">${orientationItems}</div>`),
          wrapperStyles,
        );
      }),
    );

    it(
      'orientation horizontal-from-small',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          withStyles(
            html`<div class="sbb-orientation-horizontal-from-small">${orientationItems}</div>`,
          ),
          wrapperStyles,
        );
      }),
    );
  });

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    it(
      'orientation horizontal-from-large',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          withStyles(
            html`<div class="sbb-orientation-horizontal-from-large">${orientationItems}</div>`,
          ),
          wrapperStyles,
        );
      }),
    );
  });

  describeViewports({ viewports: ['zero', 'ultra'] }, () => {
    it(
      'orientation horizontal-from-ultra',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          withStyles(
            html`<div class="sbb-orientation-horizontal-from-ultra">${orientationItems}</div>`,
          ),
          wrapperStyles,
        );
      }),
    );
  });
});
