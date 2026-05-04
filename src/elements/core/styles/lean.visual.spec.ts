import { aTimeout } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html, nothing } from 'lit';

import type { SbbFormFieldElement } from '../../form-field.ts';
import type { SbbNotificationElement } from '../../notification.ts';
import type { SbbSelectElement } from '../../select.ts';
import type { SbbTitleElement } from '../../title.ts';
import { describeEach, describeViewports, visualDiffDefault } from '../testing/private.ts';

import '../../autocomplete.ts';
import '../../form-field.ts';
import '../../link.ts';
import '../../notification.ts';
import '../../option.ts';
import '../../select.ts';
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

  describeViewports({ viewports: ['zero', 'large'], viewportHeight: 500 }, () => {
    describe('sbb-form-field', () => {
      for (const size of [null, 's', 'm', 'l'] satisfies SbbFormFieldElement['size'][]) {
        describe(`size=${size}`, () => {
          describe('with input', () => {
            it(
              visualDiffDefault.name,
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(html`
                  <sbb-form-field size=${size || nothing}>
                    <label>Input label</label>
                    <input placeholder="Placeholder" value="Input value" />
                  </sbb-form-field>
                `);
              }),
            );
          });

          describe('with sbb-select', () => {
            it(
              visualDiffDefault.name,
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(
                  html`
                    <sbb-form-field size=${size || nothing}>
                      <label>Select label</label>
                      <sbb-select value="Option 1">
                        <sbb-option value="Option 1">Option 1</sbb-option>
                        <sbb-option value="Option 2">Option 2</sbb-option>
                        <sbb-option value="Option 3">Option 3</sbb-option>
                      </sbb-select>
                    </sbb-form-field>
                  `,
                  { minHeight: '300px' },
                );
                setup.withPostSetupAction(() => {
                  const select =
                    setup.snapshotElement.querySelector<SbbSelectElement>('sbb-select')!;
                  select.focus();
                  select.open();
                });
              }),
            );
          });

          describe('with sbb-autocomplete', () => {
            it(
              visualDiffDefault.name,
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(
                  html`
                    <sbb-form-field size=${size || nothing}>
                      <label>Autocomplete label</label>
                      <input placeholder="Autocomplete placeholder" />
                      <sbb-autocomplete>
                        <sbb-option value="Option 1">Option 1</sbb-option>
                        <sbb-option value="Option 2">Option 2</sbb-option>
                        <sbb-option value="Option 3">Option 3</sbb-option>
                      </sbb-autocomplete>
                    </sbb-form-field>
                  `,
                  { minHeight: '300px' },
                );
                setup.withPostSetupAction(async () => {
                  // Wait for page is rendered stable. Otherwise, the overlay can be positioned slightly off.
                  await aTimeout(10);
                  const input = setup.snapshotElement.querySelector('input')!;
                  input.focus();
                  await sendKeys({ press: 'O' });
                });
              }),
            );
          });
        });
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
