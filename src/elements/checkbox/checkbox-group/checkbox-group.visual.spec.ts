import { html, nothing, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.ts';

import '../../card.ts';
import '../../form-field/error.ts';
import '../../icon.ts';
import '../checkbox.ts';
import '../checkbox-panel.ts';
import './checkbox-group.component.ts';

describe('sbb-checkbox-group', () => {
  const longLabelText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in tincidunt
    quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut, hendrerit risus. Vestibulum rutrum elit et
    lacus sollicitudin, quis malesuada lorem vehicula. Suspendisse at augue quis tellus vulputate tempor. Vivamus urna
    velit, varius nec est ac, mollis efficitur lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat
    metus.`;

  const defaultArgs = {
    orientation: 'horizontal',
    disabled: false,
    required: false,
    horizontalFrom: undefined as string | undefined,
    size: 'm',
    label: 'Label',
    iconName: undefined as string | undefined,
    iconPlacement: undefined as string | undefined,
  };

  const checkboxesTemplate = ({
    orientation,
    disabled,
    required,
    horizontalFrom,
    size,
    label,
    iconName,
    iconPlacement,
  }: typeof defaultArgs): TemplateResult => html`
    <sbb-checkbox-group
      orientation=${orientation}
      horizontal-from=${horizontalFrom || nothing}
      size=${size}
      .disabled=${disabled}
    >
      ${repeat(
        new Array(3),
        (_, index) => html`
          <sbb-checkbox
            value="checkbox-${index}"
            ?checked=${index === 0}
            icon-name=${iconName || nothing}
            icon-placement=${iconPlacement || nothing}
          >
            ${label} ${index}
          </sbb-checkbox>
        `,
      )}
      ${required ? html`<sbb-error slot="error">This is a required field.</sbb-error>` : nothing}
    </sbb-checkbox-group>
  `;

  const panelsTemplate = ({
    orientation,
    disabled,
    horizontalFrom,
    size,
  }: typeof defaultArgs): TemplateResult => html`
    <sbb-checkbox-group
      orientation=${orientation}
      horizontal-from=${horizontalFrom || nothing}
      size=${size}
      .disabled=${disabled}
    >
      ${repeat(
        new Array(2),
        (_, index) => html`
          <sbb-checkbox-panel value="checkbox-${index}" ?checked=${index === 0}>
            Label ${index}
            <span slot="subtext">Subtext</span>
            <span
              slot="suffix"
              style="margin-inline-start: auto; display: flex; align-items: center;"
            >
              <sbb-icon
                name="diamond-small"
                style="margin-inline: var(--sbb-spacing-fixed-2x);"
              ></sbb-icon>
              <span class="sbb-text-m sbb-text--bold">CHF 40.00</span>
            </span>
            <sbb-card-badge>%</sbb-card-badge>
          </sbb-checkbox-panel>
        `,
      )}
    </sbb-checkbox-group>
  `;

  describeViewports({ viewports: ['small', 'large'] }, () => {
    for (const orientation of ['horizontal', 'vertical']) {
      const args = { ...defaultArgs, orientation };
      for (const visualDiffState of [visualDiffDefault, visualDiffFocus]) {
        it(
          `${orientation} ${visualDiffState.name}`,
          visualDiffState.with(async (setup) => {
            await setup.withFixture(checkboxesTemplate(args));
          }),
        );
      }

      it(
        `${orientation} size=s ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(checkboxesTemplate({ ...args, size: 's' }));
        }),
      );

      it(
        `${orientation} size=xs ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(checkboxesTemplate({ ...args, size: 'xs' }));
        }),
      );

      it(
        `${orientation} disabled ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(checkboxesTemplate({ ...args, disabled: true }));
        }),
      );

      it(
        `${orientation} required ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(checkboxesTemplate({ ...args, required: true }));
        }),
      );

      it(
        `${orientation} label=long ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(checkboxesTemplate({ ...args, label: longLabelText }));
        }),
      );

      for (const iconPlacement of ['start', 'end']) {
        it(
          `${orientation} iconPlacement=${iconPlacement} ${visualDiffDefault.name}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              checkboxesTemplate({ ...args, iconName: 'tickets-class-small', iconPlacement }),
            );
          }),
        );
      }

      it(
        `${orientation} template=panel ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(panelsTemplate(args));
        }),
      );
    }

    describe('horizontalFrom=large', () => {
      const args = { ...defaultArgs, orientation: 'vertical', horizontalFrom: 'large' };
      it(
        `checkbox ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(checkboxesTemplate(args));
        }),
      );

      it(
        `panel ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(panelsTemplate(args));
        }),
      );
    });
  });
});
