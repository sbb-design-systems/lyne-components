import { html, type TemplateResult } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.ts';

import '../title.ts';

describe(`sbb-title`, () => {
  const htmlTemplate: (level: string) => TemplateResult = (level: string) => html`
    <sbb-title level=${level}>
      Data without insights are trivial, and insights without action are pointless
    </sbb-title>
    <article>
      Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
      elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus
      urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus
      turpis in eu mi bibendum neque egestas congue.
    </article>
  `;

  describeViewports(() => {
    for (const level of ['1', '2', '3', '4', '5', '6']) {
      it(
        `level=${level}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(htmlTemplate(level));
        }),
      );

      describe('lean', () => {
        beforeEach(() => {
          document.documentElement.classList.add('sbb-lean');
        });

        it(
          `level=${level}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(htmlTemplate(level));
          }),
        );

        afterEach(() => {
          document.documentElement.classList.remove('sbb-lean');
        });
      });
    }
  });

  describeViewports({ viewports: ['small'] }, () => {
    describeEach({ darkMode: [false, true], negative: [false, true] }, ({ negative, darkMode }) => {
      it(
        '',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-title ?negative=${negative}>
                Data without insights are trivial, and insights without action are pointless
              </sbb-title>
            `,
            {
              backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
              darkMode,
            },
          );
        }),
      );
    });
  });
});
