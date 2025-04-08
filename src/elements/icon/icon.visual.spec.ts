import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './icon.component.js';

describe(`sbb-icon`, () => {
  describeViewports({ viewports: ['small'] }, () => {
    for (const size of ['small', 'medium', 'large']) {
      it(
        `icon=circle-information size=${size} ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`<sbb-icon name="circle-information-${size}"></sbb-icon>`);
        }),
      );
    }

    it(
      `color=red ${visualDiffDefault.name}`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-icon style="color: red;" name="circle-information-small"></sbb-icon>`,
        );
      }),
    );
  });
});
