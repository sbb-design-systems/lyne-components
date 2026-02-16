import { html, nothing, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.ts';

import '../link/link.ts';
import '../title.ts';
import './notification.component.ts';

describe(`sbb-notification`, () => {
  const defaultArgs = {
    type: 'info',
    size: 'm',
    readonly: false,
    showTitle: true,
    iconName: '',
  };

  const notificationTemplate = ({
    type,
    size,
    readonly,
    showTitle,
    iconName,
  }: typeof defaultArgs): TemplateResult => html`
    <sbb-notification
      size=${size}
      ?readonly=${readonly}
      type=${type}
      style="--sbb-notification-margin: 0 0 var(--sbb-spacing-fixed-4x) 0;"
      icon-name=${iconName || nothing}
    >
      ${showTitle ? html`<sbb-title>Title</sbb-title>` : nothing} The quick brown fox jumps over the
      lazy dog. The quick brown fox jumps over the lazy dog.
      <sbb-link href="/">Link one</sbb-link>
      <sbb-link href="/">Link two</sbb-link>
      <sbb-link href="/">Link three</sbb-link>
    </sbb-notification>
  `;

  const textTemplate = html`
    <p style="margin: 0;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. <sbb-link href="/"> Link </sbb-link>
    </p>
  `;

  const states = {
    readonly: [false, true],
    showTitle: [false, true],
  };

  const types = ['info', 'note', 'success', 'warn', 'error'];
  const visualStates = {
    state: [...types.map((type) => ({ type, multiple: false })), { multiple: true, type: 'all' }],
    size: ['s', 'm'],
  };

  describeViewports({ viewports: ['zero', 'small', 'large'] }, () => {
    describeEach(states, ({ readonly, showTitle }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          const args = {
            ...defaultArgs,
            readonly,
            showTitle,
          } satisfies typeof defaultArgs;
          await setup.withFixture(html`${notificationTemplate(args)} ${textTemplate}`);
        }),
      );
    });

    describeEach(visualStates, ({ state, size }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            ${repeat(state.multiple ? types : [state.type], (type: string) =>
              notificationTemplate({ ...defaultArgs, type, size }),
            )}
            ${textTemplate}
          `);
        }),
      );
    });
  });

  describeViewports({ viewports: ['large'] }, () => {
    for (const type of types) {
      describe(`type=${type}`, () => {
        it(
          'darkMode=true',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`${notificationTemplate({ ...defaultArgs, type })} ${textTemplate}`,
              {
                darkMode: true,
              },
            );
          }),
        );

        it(
          'forcedColors=true',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`${notificationTemplate({ ...defaultArgs, type })} ${textTemplate}`,
              {
                forcedColors: true,
              },
            );
          }),
        );
      });
    }

    it(
      'custom icon name',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          notificationTemplate({ ...defaultArgs, iconName: 'magnifying-glass-small' }),
        );
      }),
    );

    it(
      'slotted icon',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-notification type="info">
            <sbb-icon name="magnifying-glass-small" slot="icon"></sbb-icon>
            <sbb-title>Title</sbb-title>
            Text
          </sbb-notification>`,
        );
      }),
    );
  });
});
