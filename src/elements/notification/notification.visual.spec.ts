import { html, nothing, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.js';

import '../link/link.js';
import '../title.js';
import './notification.component.js';

describe(`sbb-notification`, () => {
  const defaultArgs = {
    type: 'info',
    size: 'm',
    readonly: false,
    showTitle: true,
  };

  const notificationTemplate = ({
    type,
    size,
    readonly,
    showTitle,
  }: typeof defaultArgs): TemplateResult => html`
    <sbb-notification
      size=${size}
      ?readonly=${readonly}
      type=${type}
      style="--sbb-notification-margin: 0 0 var(--sbb-spacing-fixed-4x) 0;"
    >
      ${showTitle ? html`<sbb-title>Title</sbb-title>` : nothing}
      <p>
        The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
        <sbb-link href="/">Link one</sbb-link>
        <sbb-link href="/">Link two</sbb-link>
        <sbb-link href="/">Link three</sbb-link>
      </p>
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

  const types = ['info', 'success', 'warn', 'error'];
  const visualStates = {
    state: [...types.map((type) => ({ type, multiple: false })), { multiple: true, type: 'all' }],
    size: ['s', 'm'],
  };

  describeViewports({ viewports: ['zero', 'small', 'medium'] }, () => {
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
            ${repeat(
              state.multiple ? types : [state.type],
              (type: string) => html`${notificationTemplate({ ...defaultArgs, type, size })}`,
            )}
            ${textTemplate}
          `);
        }),
      );
    });
  });
});
