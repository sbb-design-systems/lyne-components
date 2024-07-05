import { html, nothing, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import '../tag.js';
import './tag-group.js';

describe(`sbb-tag-group`, () => {
  const longLabel = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in tincidunt quis, mattis eu quam.`;
  const template = (size: string, hasLongLabel = false): TemplateResult => html`
    <sbb-tag-group size="${size}">
      ${hasLongLabel
        ? html`<sbb-tag checked amount="123" icon-name="pie-small">Label ${longLabel}</sbb-tag>`
        : nothing}
      ${repeat(
        new Array(5),
        (_, i) => html`
          <sbb-tag ?checked="${!hasLongLabel && i === 0}" amount="123" icon-name="pie-small">
            Label ${i}
          </sbb-tag>
        `,
      )}
    </sbb-tag-group>
  `;

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const size of ['s', 'm']) {
      it(
        `size=${size} ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template(size));
        }),
      );

      it(
        `size=${size} label=ellipsis`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template(size, true));
        }),
      );
    }
  });
});
