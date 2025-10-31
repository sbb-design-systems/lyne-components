import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbTransparentButtonElement } from '../../button/transparent-button.ts';
import { describeViewports, visualDiffDefault } from '../../core/testing/private.ts';
import { EventSpy, waitForCondition } from '../../core/testing.ts';
import { SbbAlertElement } from '../alert.ts';

import './alert-group.component.ts';
import '../../title.ts';

describe(`sbb-alert-group`, () => {
  const alert = html`<sbb-alert>
    <sbb-title level="3">Interruption between Berne and Olten</sbb-title>
    Between Berne and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00 o'clock
    construction work will take place. You have to expect changed travel times and changed
    connections.
  </sbb-alert>`;

  describeViewports({ viewports: ['large'] }, () => {
    it(
      'basic',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-alert-group> ${alert} ${alert} ${alert} </sbb-alert-group>`,
        );
      }),
    );

    it(
      'focused group after deletion',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`<sbb-alert-group>${alert} ${alert}</sbb-alert-group>`);

        setup.withPostSetupAction(async () => {
          const alert = setup.snapshotElement.querySelector('sbb-alert')!;
          const closeSpy = new EventSpy(SbbAlertElement.events.close, alert);

          // As registering an eventSpy is too late we have to use waitForCondition().
          await waitForCondition(() => alert.matches(':state(state-opened)'));

          const closeButton = setup.snapshotElement
            .querySelector('sbb-alert')!
            .shadowRoot!.querySelector<SbbTransparentButtonElement>('.sbb-alert__close-button')!;

          closeButton.focus();
          await sendKeys({ press: 'Enter' });

          await closeSpy.calledOnce();
        });
      }),
    );
  });
});
