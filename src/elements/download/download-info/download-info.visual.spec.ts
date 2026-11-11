import { html, nothing } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../../core/testing/private.ts';

import '../../download.ts';

describe(`sbb-download-info`, () => {
  // Toggle the presence of each property to visually test how the resulting
  // metadata string is concatenated (separators between the present items).
  const cases = {
    type: [true, false],
    size: [true, false],
    changed: [true, false],
    nonAccessible: [true, false],
  };

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    describeEach(cases, ({ type, size, changed, nonAccessible }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-download-info
              type=${type ? 'PDF' : nothing}
              size=${size ? '1234567' : nothing}
              changed=${changed ? '2026-12-24' : nothing}
              ?non-accessible=${nonAccessible}
            ></sbb-download-info>
          `);
        }),
      );
    });

    it(
      'size=freeform',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-download-info
            type="PDF"
            size="≈ 1.2 MB"
            changed="2026-12-24"
            non-accessible
          ></sbb-download-info>
        `);
      }),
    );
  });
});
