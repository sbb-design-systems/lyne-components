import { nothing, type TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import './alert.js';

describe(`sbb-alert`, () => {
  const defaultArgs = {
    size: 'm',
    readonly: false,
    icon: 'info',
    titleContent: 'Interruption between Berne and Olten',
    linkContent: undefined as string | undefined,
    href: 'https://www.sbb.ch' as string | undefined,
  };

  const contentSlotText = html`Between Berne and Olten from 03.11.2021 to 05.12.2022 each time from
  22:30 to 06:00 o'clock construction work will take place. You have to expect changed travel times
  and changed connections.`;

  const alertTemplate = ({
    size,
    readonly,
    icon,
    titleContent,
    linkContent,
    href,
  }: typeof defaultArgs): TemplateResult => html`
    <sbb-alert
      size=${size}
      ?readonly=${readonly}
      icon-name=${icon}
      title-content=${titleContent}
      link-content=${linkContent ?? nothing}
      href=${href ?? nothing}
      >${contentSlotText}</sbb-alert
    >
  `;

  describeViewports({ viewports: ['micro', 'small', 'medium'] }, () => {
    it(
      'with default args',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-alert title-content=${defaultArgs.titleContent} href=${defaultArgs.href!}
            >${contentSlotText}</sbb-alert
          >`,
        );
      }),
    );

    for (const size of ['s', 'l']) {
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
      'with custom link text',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          alertTemplate({ ...defaultArgs, linkContent: 'Follow this link (custom text)' }),
        );
      }),
    );

    it(
      'icon and title as slot',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-alert href="https://www.sbb.ch">
            <sbb-icon name="disruption" slot="icon"></sbb-icon>
            <span slot="title">Slotted title</span>
            ${contentSlotText}</sbb-alert
          >`,
        );
      }),
    );
  });
});
