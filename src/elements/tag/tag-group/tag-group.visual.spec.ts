import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.ts';

import '../tag.ts';
import './tag-group.component.ts';

describe(`sbb-tag-group`, () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const size of ['s', 'm']) {
      it(
        `size=${size}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-tag-group size=${size}>
              <sbb-tag checked amount="123" icon-name="face-smiling-small">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit,
                ultricies in tincidunt quis, mattis eu quam.
              </sbb-tag>
              ${repeat(
                new Array(5),
                (_, i) =>
                  html`<sbb-tag ?checked="${i === 0}" amount="123" icon-name="face-smiling-small">
                    Label ${i}
                  </sbb-tag>`,
              )}
            </sbb-tag-group>
          `);
        }),
      );
    }

    it(
      `disabled=true`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-tag-group disabled>
            <sbb-tag checked amount="123" icon-name="face-smiling-small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies
              in tincidunt quis, mattis eu quam.
            </sbb-tag>
            ${repeat(
              new Array(5),
              (_, i) =>
                html`<sbb-tag ?checked="${i === 0}" amount="123" icon-name="face-smiling-small">
                  Label ${i}
                </sbb-tag>`,
            )}
          </sbb-tag-group>
        `);
      }),
    );
  });
});
