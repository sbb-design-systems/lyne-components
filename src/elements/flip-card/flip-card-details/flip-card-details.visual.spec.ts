import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import './flip-card-details.js';
import '../../link.js';

describe(`sbb-flip-card-details`, () => {
  describeViewports({ viewports: ['medium'] }, () => {
    it(
      visualDiffDefault.name,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-flip-card-details style="--sbb-flip-card-details-opacity: 1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare
              condimentum. Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis in
              nibh. Duis dapibus vitae tortor ullamcorper maximus. In convallis consectetur felis.
              <sbb-link href="https://www.sbb.ch" negative>Link</sbb-link>
            </sbb-flip-card-details>
          `,
          {
            backgroundColor: 'var(--sbb-color-midnight)',
          },
        );
      }),
    );
  });
});
