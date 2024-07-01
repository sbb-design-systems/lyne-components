import { html, nothing, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.js';

import '../../form-error.js';
import '../checkbox.js';
import './checkbox-group.js';

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
    horizontalFrom: undefined,
    size: 'm',
    label: 'Label',
    iconName: undefined as string | undefined,
    iconPlacement: undefined as string | undefined,
  };

  const template = ({
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
            ?checked=${index === 0 && true}
            icon-name=${iconName || nothing}
            icon-placement=${iconPlacement || nothing}
          >
            ${label} ${index}
          </sbb-checkbox>
        `,
      )}
      ${required
        ? html`<sbb-form-error slot="error">This is a required field.</sbb-form-error>`
        : nothing}
    </sbb-checkbox-group>
  `;

  describeViewports({ viewports: ['small', 'medium'] }, () => {
    for (const orientation of ['horizontal', 'vertical']) {
      const args = { ...defaultArgs, orientation };
      for (const visualDiffState of [visualDiffDefault, visualDiffFocus]) {
        it(
          `${orientation} ${visualDiffState.name}`,
          visualDiffState.with(async (setup) => {
            await setup.withFixture(template(args));
          }),
        );
      }

      it(
        `${orientation} size=s ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ ...args, size: 's' }));
        }),
      );

      it(
        `${orientation} disabled ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ ...args, disabled: true }));
        }),
      );

      it(
        `${orientation} required ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ ...args, required: true }));
        }),
      );

      it(
        `${orientation} label=ellipsis ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ ...args, label: longLabelText }));
        }),
      );

      for (const iconPlacement of ['start', 'end']) {
        it(
          `${orientation} iconPlacement=${iconPlacement} ${visualDiffDefault.name}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              template({ ...args, iconName: 'tickets-class-small', iconPlacement }),
            );
          }),
        );
      }
    }
  });
});
