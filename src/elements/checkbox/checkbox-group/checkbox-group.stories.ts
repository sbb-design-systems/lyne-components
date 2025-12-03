import type { ArgTypes, Args, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { styleMap, type StyleInfo } from 'lit/directives/style-map.js';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';
import type { SbbCheckboxElement } from '../checkbox.ts';

import readme from './readme.md?raw';

import './checkbox-group.component.ts';
import '../checkbox.ts';
import '../checkbox-panel.ts';
import '../../form-field/error.ts';
import '../../icon.ts';
import '../../card/card-badge.ts';

const longLabelText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in tincidunt
quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut, hendrerit risus. Vestibulum rutrum elit et
lacus sollicitudin, quis malesuada lorem vehicula. Suspendisse at augue quis tellus vulputate tempor. Vivamus urna
velit, varius nec est ac, mollis efficitur lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat
metus.`;

const suffixStyle: Readonly<StyleInfo> = {
  display: 'flex',
  alignItems: 'center',
};

const cardBadge = (): TemplateResult => html`<sbb-card-badge>%</sbb-card-badge>`;

const suffixAndSubtext = (): TemplateResult => html`
  <span slot="subtext">Subtext</span>
  <span slot="suffix" style="margin-inline-start: auto;">
    <span style=${styleMap(suffixStyle)}>
      <sbb-icon name="diamond-small" style="margin-inline: var(--sbb-spacing-fixed-2x);"></sbb-icon>
      <span class="sbb-text-m sbb-text--bold">CHF 40.00</span>
    </span>
  </span>
  ${cardBadge()}
`;

const checkboxes = (
  checked: boolean,
  disabledSingle: boolean,
  iconName: string,
  iconPlacement: 'start' | 'end',
  label: string,
): TemplateResult => html`
  <sbb-checkbox
    value="checkbox-1"
    ?checked=${checked}
    icon-name=${iconName || nothing}
    icon-placement=${iconPlacement}
  >
    ${label} 1
  </sbb-checkbox>
  <sbb-checkbox
    value="checkbox-2"
    ?disabled=${disabledSingle}
    icon-name=${iconName || nothing}
    icon-placement=${iconPlacement}
  >
    ${label} 2
  </sbb-checkbox>
  <sbb-checkbox value="checkbox-3" icon-name=${iconName || nothing} icon-placement=${iconPlacement}>
    ${label} 3
  </sbb-checkbox>
`;

const checkboxPanels = (
  checked: boolean,
  disabledSingle: boolean,
  label: string,
): TemplateResult => html`
  <sbb-checkbox-panel value="checkbox-1" ?checked=${checked}>
    ${label} 1 ${suffixAndSubtext()}</sbb-checkbox-panel
  >
  <sbb-checkbox-panel value="checkbox-2" ?disabled=${disabledSingle}>
    ${label} 2 ${suffixAndSubtext()}
  </sbb-checkbox-panel>
  <sbb-checkbox-panel value="checkbox-3"> ${label} 3 ${suffixAndSubtext()} </sbb-checkbox-panel>
`;

const DefaultTemplate = ({
  checked,
  disabledSingle,
  iconName,
  iconPlacement,
  label,
  ...args
}: Args): TemplateResult => html`
  <sbb-checkbox-group ${sbbSpread(args)}>
    ${checkboxes(checked, disabledSingle, iconName, iconPlacement, label)}
  </sbb-checkbox-group>
`;

const PanelTemplate = ({ checked, disabledSingle, label, ...args }: Args): TemplateResult => html`
  <sbb-checkbox-group ${sbbSpread(args)}>
    ${checkboxPanels(checked, disabledSingle, label)}
  </sbb-checkbox-group>
`;

const ErrorMessageTemplate = ({
  checked,
  disabledSingle,
  iconName,
  iconPlacement,
  label,
  ...args
}: Args): TemplateResult => html`
  <sbb-checkbox-group ${sbbSpread(args)} id="sbb-checkbox-group">
    ${checkboxes(checked, disabledSingle, iconName, iconPlacement, label)}
    ${args.required ? html`<sbb-error slot="error">This is a required field.</sbb-error>` : nothing}
  </sbb-checkbox-group>
`;

let selectedCheckboxes = ['checkbox-1'];

const childCheck = (event: Event): void => {
  const target: SbbCheckboxElement = event.target as SbbCheckboxElement;
  if (target.checked) {
    selectedCheckboxes.push(target.value as string);
  } else {
    selectedCheckboxes.splice(selectedCheckboxes.indexOf(target.value as string), 1);
  }
  const parent = document.getElementById('invariant-parent') as SbbCheckboxElement;
  parent.indeterminate = selectedCheckboxes.length === 1;
  parent.checked = selectedCheckboxes.length === 2;
};

const parentCheck = (event: Event): void => {
  const target: SbbCheckboxElement = event.target as SbbCheckboxElement;
  if (target.checked) {
    selectedCheckboxes = ['checkbox-1', 'checkbox-2'];
  } else {
    selectedCheckboxes = [];
  }
  (document.getElementById('invariant-checkbox-1') as SbbCheckboxElement).checked = target.checked;
  (document.getElementById('invariant-checkbox-2') as SbbCheckboxElement).checked = target.checked;
};

const IndeterminateGroupTemplate = ({
  disabledSingle,
  iconName,
  iconPlacement,
  label,
  ...args
}: Args): TemplateResult => html`
  <div style="margin-block-end: 1rem;">
    <div>Check/uncheck all the children checkboxes and the parent will be checked/unchecked.</div>
    <div>Check a single child and the parent will be indeterminate.</div>
  </div>
  <sbb-checkbox-group ${sbbSpread(args)} id="sbb-checkbox-group">
    <sbb-checkbox
      id="invariant-parent"
      value="parent"
      ?checked=${false}
      ?indeterminate=${true}
      @change=${(event: Event) => parentCheck(event)}
      icon-name=${iconName || nothing}
      icon-placement=${iconPlacement}
    >
      Parent checkbox
    </sbb-checkbox>
    <sbb-checkbox
      id="invariant-checkbox-1"
      value="checkbox-1"
      ?checked=${true}
      @change=${(event: Event) => childCheck(event)}
      icon-name=${iconName || nothing}
      icon-placement=${iconPlacement}
      ?disabled=${disabledSingle}
      style="margin-inline-start: 2rem;"
    >
      ${label} option 1
    </sbb-checkbox>
    <sbb-checkbox
      id="invariant-checkbox-2"
      value="checkbox-2"
      ?checked=${false}
      @change=${(event: Event) => childCheck(event)}
      icon-name=${iconName || nothing}
      icon-placement=${iconPlacement}
      style="margin-inline-start: 2rem;"
    >
      ${label} option 2
    </sbb-checkbox>
  </sbb-checkbox-group>
`;

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Checkbox group',
  },
};

const required: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Checkbox group',
  },
};

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
  table: {
    category: 'Checkbox group',
  },
};

const horizontalFrom: InputType = {
  control: {
    type: 'select',
  },
  options: ['unset', 'zero', 'small', 'large', 'ultra'],
  table: {
    category: 'Checkbox group',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['xs', 's', 'm'],
  table: {
    category: 'Checkbox group',
  },
};

const checked: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Checkbox',
  },
};

const disabledSingle: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Checkbox',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Checkbox',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Checkbox',
  },
};

const iconPlacement: InputType = {
  control: {
    type: 'select',
  },
  options: ['start', 'end'],
  table: {
    category: 'Checkbox',
  },
};

const basicArgTypes: ArgTypes = {
  disabled,
  required,
  orientation,
  'horizontal-from': horizontalFrom,
  size,
  label,
  checked,
  disabledSingle,
};

const checkboxArgTypes: ArgTypes = {
  ...basicArgTypes,
  iconName,
  iconPlacement,
};

const basicArgs: Args = {
  disabled: false,
  required: false,
  orientation: orientation.options![0],
  'horizontal-from': undefined,
  size: size.options![1],
  label: 'Label',
  checked: true,
  disabledSingle: false,
};

const checkboxArgs: Args = {
  ...basicArgs,
  iconName: undefined,
  iconPlacement: undefined,
};

const checkboxArgsVertical = {
  ...checkboxArgs,
  orientation: orientation.options![1],
};

const iconStart: Args = {
  iconName: 'tickets-class-small',
  iconPlacement: iconPlacement.options![0],
};

const iconEnd: Args = {
  iconName: 'tickets-class-small',
  iconPlacement: iconPlacement.options![1],
};

export const horizontal: StoryObj = {
  render: DefaultTemplate,
  argTypes: checkboxArgTypes,
  args: { ...checkboxArgs },
};

export const vertical: StoryObj = {
  render: DefaultTemplate,
  argTypes: checkboxArgTypes,
  args: { ...checkboxArgsVertical },
};

export const verticalToHorizontal: StoryObj = {
  render: DefaultTemplate,
  argTypes: checkboxArgTypes,
  args: { ...checkboxArgsVertical, 'horizontal-from': 'large' },
};

export const horizontalSizeM: StoryObj = {
  render: DefaultTemplate,
  argTypes: checkboxArgTypes,
  args: { ...checkboxArgs, size: 'm' },
};

export const horizontalSizeXS: StoryObj = {
  render: DefaultTemplate,
  argTypes: checkboxArgTypes,
  args: { ...checkboxArgs, size: 'xs' },
};

export const horizontalDisabled: StoryObj = {
  render: DefaultTemplate,
  argTypes: checkboxArgTypes,
  args: { ...checkboxArgs, disabled: true, disabledSingle: true },
};

export const verticalDisabled: StoryObj = {
  render: DefaultTemplate,
  argTypes: checkboxArgTypes,
  args: { ...checkboxArgsVertical, disabled: true, disabledSingle: true },
};

export const horizontalIconStart: StoryObj = {
  render: DefaultTemplate,
  argTypes: checkboxArgTypes,
  args: { ...checkboxArgs, ...iconStart },
};

export const verticalIconStart: StoryObj = {
  render: DefaultTemplate,
  argTypes: checkboxArgTypes,
  args: { ...checkboxArgsVertical, ...iconStart },
};

export const horizontalIconEnd: StoryObj = {
  render: DefaultTemplate,
  argTypes: checkboxArgTypes,
  args: { ...checkboxArgs, ...iconEnd },
};

export const verticalIconEnd: StoryObj = {
  render: DefaultTemplate,
  argTypes: checkboxArgTypes,
  args: { ...checkboxArgsVertical, ...iconEnd },
};

export const verticalIconEndLongLabel: StoryObj = {
  render: DefaultTemplate,
  argTypes: checkboxArgTypes,
  args: { ...checkboxArgsVertical, ...iconEnd, label: longLabelText },
};

export const horizontalWitherror: StoryObj = {
  render: ErrorMessageTemplate,
  argTypes: checkboxArgTypes,
  args: { ...checkboxArgs, required: true },
};

export const verticalWitherror: StoryObj = {
  render: ErrorMessageTemplate,
  argTypes: checkboxArgTypes,
  args: { ...checkboxArgsVertical, required: true },
};

export const indeterminateGroup: StoryObj = {
  render: IndeterminateGroupTemplate,
  argTypes: { ...checkboxArgTypes },
  args: { ...checkboxArgsVertical, checked: undefined },
};

export const horizontalPanel: StoryObj = {
  render: PanelTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const verticalPanel: StoryObj = {
  render: PanelTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, orientation: orientation.options![1] },
};

export const verticalToHorizontalPanel: StoryObj = {
  render: PanelTemplate,
  argTypes: checkboxArgTypes,
  args: { ...basicArgs, orientation: orientation.options![1], 'horizontal-from': 'large' },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: ['change', 'input'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-checkbox/sbb-checkbox-group',
};

export default meta;
