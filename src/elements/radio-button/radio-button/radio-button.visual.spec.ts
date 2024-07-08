import { html, nothing } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import '../radio-button.js';

const cases = {
  size: ['m', 's'],
  checked: [true, false],
  disabled: [false, true],
  bold: [false, true],
};

const longLabel =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

describe(`sbb-radio-button`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ size, checked, disabled, bold }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-radio-button ?checked=${checked} ?disabled=${disabled} size=${size}>
              <span class=${bold ? 'sbb-text--bold' : nothing}>Value</span>
            </sbb-radio-button>
          `);
        }),
      );
    });

    it(
      'long label',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-radio-button checked> ${longLabel} </sbb-radio-button>
        `);
      }),
    );

    // Focus state is tested in the radio-button-group
  });
});
