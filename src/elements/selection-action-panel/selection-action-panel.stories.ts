import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';

import './selection-action-panel.component.ts';
import '../button/secondary-button.ts';
import '../card.ts';
import '../checkbox.ts';
import '../form-field/error.ts';
import '../link/block-link-button.ts';
import '../radio-button.ts';
import '../selection-expansion-panel.ts';

import readme from './readme.md?raw';

const input: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['checkbox', 'radio'],
  table: {
    category: 'Group / Input',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['xs', 's', 'm'],
  table: {
    category: 'Group / Input',
  },
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk'],
  table: {
    category: 'Input',
  },
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input',
  },
};

const checkedInput: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input',
  },
};

const disabledInput: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input',
  },
};

const basicArgTypes: ArgTypes = {
  input,
  size,
  color,
  borderless,
  checkedInput,
  disabledInput,
};

const basicArgs: Args = {
  input: input.options![0],
  size: size.options![2],
  color: color.options![0],
  borderless: false,
  checkedInput: false,
  disabledInput: false,
};

const cardBadge = (): TemplateResult => html`<sbb-card-badge>ab CHF 26.50</sbb-card-badge>`;

const subtext = (): TemplateResult => html` <span slot="subtext">Subtext</span>`;

const actionButton = (size: string, disabled: boolean): TemplateResult => html`
  <sbb-secondary-button
    size=${size === 'm' ? 'm' : 's'}
    ?disabled=${disabled}
    icon-name="arrow-right-small"
  >
  </sbb-secondary-button>
`;

const checkboxPanel = (
  checked: boolean,
  disabled: boolean,
  size: string,
  borderless: boolean,
  color: string,
): TemplateResult => html`
  <sbb-checkbox-panel
    ?checked=${checked}
    ?disabled=${disabled}
    size=${size}
    color=${color}
    ?borderless=${borderless}
  >
    Value one ${subtext()}
  </sbb-checkbox-panel>
`;

const radioButtonPanel = (
  checked: boolean,
  disabled: boolean,
  size: string,
  borderless: boolean,
  color: string,
): TemplateResult => html`
  <sbb-radio-button-panel
    value="Value one"
    ?checked=${checked}
    ?disabled=${disabled}
    size=${size}
    color=${color}
    ?borderless=${borderless}
  >
    Value one ${subtext()}
  </sbb-radio-button-panel>
`;

const Template = ({
  checkedInput,
  disabledInput,
  input,
  size,
  color,
  borderless,
  ...args
}: Args): TemplateResult => html`
  <sbb-selection-action-panel ${sbbSpread(args)}>
    ${input === 'checkbox'
      ? checkboxPanel(checkedInput, disabledInput, size, borderless, color)
      : radioButtonPanel(checkedInput, disabledInput, size, borderless, color)}
    ${actionButton(size, disabledInput)} ${cardBadge()}
  </sbb-selection-action-panel>
`;

const WithExpansionPanelTemplate = ({
  checkedInput,
  disabledInput,
  input,
  size,
  color,
  borderless,
  ...args
}: Args): TemplateResult => html`
  <sbb-selection-expansion-panel ${sbbSpread(args)}>
    <sbb-selection-action-panel>
      ${input === 'checkbox'
        ? checkboxPanel(checkedInput, disabledInput, size, borderless, color)
        : radioButtonPanel(checkedInput, disabledInput, size, borderless, color)}
      ${actionButton(size, disabledInput)} ${cardBadge()}
    </sbb-selection-action-panel>
    <div slot="content">
      Inner Content
      <sbb-block-link-button icon-name="chevron-small-right-small" icon-placement="end">
        Link
      </sbb-block-link-button>
    </div>
  </sbb-selection-expansion-panel>
`;

const WithCheckboxGroupTemplate = ({
  checkedInput,
  disabledInput,
  size,
  borderless,
  color,
  ...args
}: Args): TemplateResult => html`
  <sbb-checkbox-group orientation="vertical" horizontal-from="large" size=${size}>
    <sbb-selection-action-panel ${sbbSpread(args)}>
      <sbb-checkbox-panel ?checked=${checkedInput} color=${color} ?borderless=${borderless}>
        Value one ${subtext()}
      </sbb-checkbox-panel>
      ${actionButton(size, false)} ${cardBadge()}
    </sbb-selection-action-panel>

    <sbb-selection-action-panel ${sbbSpread(args)}>
      <sbb-checkbox-panel ?disabled=${disabledInput} color=${color} ?borderless=${borderless}>
        Value two ${subtext()}
      </sbb-checkbox-panel>
      ${actionButton(size, disabledInput)} ${cardBadge()}
    </sbb-selection-action-panel>

    <sbb-selection-action-panel ${sbbSpread(args)}>
      <sbb-checkbox-panel color=${color} ?borderless=${borderless}>
        Value three ${subtext()}
      </sbb-checkbox-panel>
      ${actionButton(size, false)} ${cardBadge()}
    </sbb-selection-action-panel>
  </sbb-checkbox-group>
`;

const WithRadioButtonGroupTemplate = ({
  checkedInput,
  disabledInput,
  allowEmptySelection,
  size,
  color,
  borderless,
  ...args
}: Args): TemplateResult => html`
  <sbb-radio-button-group
    orientation="vertical"
    horizontal-from="large"
    ?allow-empty-selection=${allowEmptySelection}
    size=${size}
  >
    <sbb-selection-action-panel ${sbbSpread(args)}>
      <sbb-radio-button-panel
        value="Value one"
        ?checked=${checkedInput}
        color=${color}
        ?borderless=${borderless}
      >
        Value one ${subtext()}
      </sbb-radio-button-panel>
      ${actionButton(size, false)} ${cardBadge()}
    </sbb-selection-action-panel>

    <sbb-selection-action-panel ${sbbSpread(args)}>
      <sbb-radio-button-panel
        value="Value two"
        ?disabled=${disabledInput}
        color=${color}
        ?borderless=${borderless}
      >
        Value two ${subtext()}
      </sbb-radio-button-panel>
      ${actionButton(size, disabledInput)} ${cardBadge()}
    </sbb-selection-action-panel>

    <sbb-selection-action-panel ${sbbSpread(args)}>
      <sbb-radio-button-panel value="Value three" color=${color} ?borderless=${borderless}>
        Value three ${subtext()}
      </sbb-radio-button-panel>
      ${actionButton(size, false)} ${cardBadge()}
    </sbb-selection-action-panel>
  </sbb-radio-button-group>
`;

export const WithCheckbox: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const WithRadioButton: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgs, input: 'radio' },
};

export const SizeS: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgs, size: size.options![1] },
};

export const Checked: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgs, checkedInput: true },
};

export const Disabled: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabledInput: true },
};

export const Milk: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgs, color: 'milk' },
};

export const Borderless: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgs, borderless: true },
};

export const WithExpansionPanel: StoryObj = {
  render: WithExpansionPanelTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

const groupArgTypes = { ...basicArgTypes };
const groupArg = { ...basicArgs };
delete groupArgTypes.input;
delete groupArg.input;

export const WithCheckboxGroup: StoryObj = {
  render: WithCheckboxGroupTemplate,
  argTypes: groupArgTypes,
  args: { ...groupArg, checkedInput: true, disabledInput: true },
};

export const WithRadioButtonGroup: StoryObj = {
  render: WithRadioButtonGroupTemplate,
  argTypes: groupArgTypes,
  args: { ...groupArg, checkedInput: true, disabledInput: true },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-selection-action-panel',
};

export default meta;
