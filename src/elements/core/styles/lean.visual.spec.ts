import { html, nothing } from 'lit';

import type { SbbNotificationElement } from '../../notification.ts';
import type { SbbTitleElement } from '../../title.ts';
import { describeEach, describeViewports, visualDiffDefault } from '../testing/private.ts';

import '../../link.ts';
import '../../notification.ts';
import '../../title.ts';

import './lean-theme.scss';

describe(`lean`, () => {
  describeViewports({ viewports: ['small'] }, () => {
    describe('title', () => {
      for (const level of ['1', '2', '3', '4', '5', '6'] satisfies SbbTitleElement['level'][]) {
        it(
          `level=${level}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-title level=${level}>
                Data without insights are trivial, and insights without action are pointless
              </sbb-title>
              <article>
                Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean
                euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl
                rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi
                proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue.
              </article>
            `);
          }),
        );
      }
    });
  });

  describeViewports({ viewports: ['zero', 'small'] }, () => {
    describe('sbb-notification', () => {
      const cases = {
        size: [null, 's', 'm'] satisfies SbbNotificationElement['size'][],
        showTitle: [false, true],
      };

      describeEach(cases, ({ size, showTitle }) => {
        it(
          visualDiffDefault.name,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-notification size=${size || nothing}>
                ${showTitle ? html`<sbb-title>Title</sbb-title>` : nothing} The quick brown fox
                jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
                <sbb-link href="/">Link one</sbb-link>
                <sbb-link href="/">Link two</sbb-link>
                <sbb-link href="/">Link three</sbb-link>
              </sbb-notification>
            `);
          }),
        );
      });
    });
  });
});
