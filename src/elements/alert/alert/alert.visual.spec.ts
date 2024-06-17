import type { Args } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import './alert.js';

describe(`sbb-alert`, () => {
  const defaultArgs: Args = {
    'title-content': 'Interruption between Berne and Olten',
    size: 'm',
    readonly: false,
    'icon-name': 'info',
    'link-content': undefined,
    href: 'https://www.sbb.ch',
  };

  const contentSlotText = html`Between Berne and Olten from 03.11.2021 to 05.12.2022 each time from
  22:30 to 06:00 o'clock construction work will take place. You have to expect changed travel times
  and changed connections.`;

  const alertTemplate = (args: Args): TemplateResult => html`
    <sbb-alert ${sbbSpread(args)}>${contentSlotText}</sbb-alert>
  `;

  describeViewports({ viewports: ['micro', 'small'] }, () => {
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
      'with custom link text',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          alertTemplate({ ...defaultArgs, 'link-content': 'Follow this link (custom text)' }),
        );
      }),
    );

    it(
      'icon and title as slot',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-alert icon-name="info" href="https://www.sbb.ch">
            <sbb-icon name="disruption" slot="icon"></sbb-icon>
            <span slot="title">Slotted title</span>
            ${contentSlotText}</sbb-alert
          >`,
        );
      }),
    );
  });
});
