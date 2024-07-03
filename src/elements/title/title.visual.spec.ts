import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../core/testing/private.js';

import '../title.js';

describe(`sbb-title`, () => {
  describeViewports({ viewports: ['zero', 'small', 'medium', 'large', 'ultra'] }, () => {
    for (const level of ['1', '2', '3', '4', '5', '6']) {
      it(
        `level=${level}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-title level=${level}>
                Data without insights are trivial, and insights without action are pointless
              </sbb-title>
              <article>
                Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean
                euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl
                rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi
                proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue.
              </article> `,
          );
        }),
      );
    }

    it(
      'negative',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-title negative>
              Data without insights are trivial, and insights without action are pointless
            </sbb-title>
          `,
          { backgroundColor: 'var(--sbb-color-charcoal)' },
        );
      }),
    );
  });
});
