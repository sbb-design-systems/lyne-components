import { nothing, type TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.ts';

import '../../link/link.ts';
import './alert.component.ts';
import '../../title.ts';

describe(`sbb-alert`, () => {
  const defaultArgs = {
    size: 'm',
    readonly: false,
    icon: 'info',
    title: 'Interruption between Berne and Olten',
    href: 'https://www.sbb.ch' as string | undefined,
  };

  const contentSlotText = html`Between Berne and Olten from 03.11.2021 to 05.12.2022 each time from
  22:30 to 06:00 o'clock construction work will take place. You have to expect changed travel times
  and changed connections.`;

  const alertTemplate = ({
    size,
    readonly,
    icon,
    title,
    href,
  }: typeof defaultArgs): TemplateResult => html`
    <sbb-alert size=${size} ?readonly=${readonly} icon-name=${icon}>
      <sbb-title>${title}</sbb-title>
      ${contentSlotText}${href ? html` <sbb-link href=${href}>Find out more</sbb-link>` : nothing}
    </sbb-alert>
  `;

  describeViewports({ viewports: ['small', 'large'] }, () => {
    for (const size of ['s', 'm', 'l']) {
      it(
        `size=${size}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(alertTemplate({ ...defaultArgs, size: size }));
        }),
      );
    }

    it(
      'without close button',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(alertTemplate({ ...defaultArgs, readonly: true }));
      }),
    );

    it(
      'without link',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(alertTemplate({ ...defaultArgs, href: undefined }));
      }),
    );

    it(
      'icon and title as slot',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-alert>
            <sbb-icon name="disruption" slot="icon"></sbb-icon>
            <sbb-title>Slotted title</sbb-title>
            ${contentSlotText}
          </sbb-alert>`,
        );
      }),
    );

    it(
      'darkMode=true focus',
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(alertTemplate({ ...defaultArgs }), { darkMode: true });
      }),
    );

    it(
      'forcedColors=true',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(alertTemplate({ ...defaultArgs }), { forcedColors: true });
      }),
    );
  });
});
