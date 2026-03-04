import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { nothing, type TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import readme from './readme.md?raw';
import './option-hint.component.ts';
import '../option.ts';
import '../optgroup.ts';
import '../../autocomplete.ts';
import '../../form-field.ts';
import '../../select.ts';

const divider: InputType = {
  control: {
    type: 'boolean',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
  table: {
    category: 'Form field',
  },
};

const defaultArgTypes: ArgTypes = {
  divider,
  negative,
  size,
};

const defaultArgs: Args = {
  divider: false,
  negative: false,
  size: size.options![0],
};

const WithAutocompleteTemplate = (args: Args): TemplateResult => html`
  <sbb-form-field ?negative=${args.negative} size=${args.size}>
    <label>Autocomplete</label>
    <input />
    <sbb-autocomplete>
      <sbb-option value="1"> Option 1 </sbb-option>
      <sbb-option value="2"> Option 2 </sbb-option>
      <sbb-option value="3"> Option 3 </sbb-option>
      <sbb-option value="4"> Option 4 </sbb-option>
      ${args.divider ? html`<sbb-divider></sbb-divider>` : nothing}
      <sbb-option-hint>Options hint</sbb-option-hint>
    </sbb-autocomplete>
  </sbb-form-field>
`;

const WithAutocompleteGroupTemplate = (args: Args): TemplateResult => html`
  <sbb-form-field ?negative=${args.negative} size=${args.size}>
    <label>Autocomplete</label>
    <input />
    <sbb-autocomplete preserve-icon-space>
      <sbb-optgroup label="Group 1">
        <sbb-option value="1" icon-name="clock-small"> Option 1 </sbb-option>
        <sbb-option value="2" icon-name="clock-small"> Option 2 </sbb-option>
        <sbb-option-hint>Group 1 hint</sbb-option-hint>
      </sbb-optgroup>
      <sbb-optgroup label="Group 2">
        <sbb-option value="3" icon-name="clock-small"> Option 3 </sbb-option>
        <sbb-option value="4"> Option 4 </sbb-option>
      </sbb-optgroup>
      ${args.divider ? html`<sbb-divider></sbb-divider>` : nothing}
      <sbb-option-hint>Options hint</sbb-option-hint>
    </sbb-autocomplete>
  </sbb-form-field>
`;

export const Autocomplete: StoryObj = {
  render: WithAutocompleteTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const AutocompleteWithGroup: StoryObj = {
  render: WithAutocompleteGroupTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, divider: true },
};

const meta: Meta = {
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-option/sbb-option-hint',
};

export default meta;


import type {
  Meta,
  StoryObj,
  ArgTypes,
  Args,
  Decorator,
  StoryContext,
} from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { StyleInfo } from 'lit/directives/style-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import { SbbOptionElement } from './option.component.ts';
import readme from './readme.md?raw';

import '../../form-field.ts';
import '../../select.ts';
import '../../autocomplete.ts';

const preserveIconSpace: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Wrapper property',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const numberOfOptions: InputType = {
  control: {
    type: 'number',
  },
};

const defaultArgTypes: ArgTypes = {
  value,
  'icon-name': iconName,
  disabled,
  numberOfOptions,
  preserveIconSpace,
};

const defaultArgs: Args = {
  value: 'Value',
  'icon-name': undefined,
  disabled: false,
  numberOfOptions: 5,
  preserveIconSpace: false,
};

const createOptions = ({
  value,
  disabled,
  numberOfOptions,
  preserveIconSpace,
  ...args
}: Args): TemplateResult[] => {
  const style: Readonly<StyleInfo> = preserveIconSpace
    ? { '--sbb-option-icon-container-display': 'block' }
    : {};
  return [
    ...new Array(numberOfOptions).fill(null).map((_, i) => {
      return html`
        <sbb-option
          style=${styleMap(style)}
          ?disabled=${disabled && i === 0}
          value=${`${value} ${i + 1}`}
          ${sbbSpread(args)}
          >${`${value} ${i + 1}`}</sbb-option
        >
      `;
    }),
    html`
      <sbb-option style=${styleMap(style)} ${sbbSpread(args)} value="long-value">
        Option Lorem ipsum dolor sit amet.
      </sbb-option>
    `,
  ];
};

const StandaloneTemplate = (args: Args): TemplateResult => html`${createOptions(args)}`;

const AutocompleteTemplate = (args: Args): TemplateResult => html`
  <sbb-form-field ?negative=${args.negative}>
    <label>sbb-autocomplete</label>
    <input placeholder="Please select." />
    <sbb-autocomplete>${createOptions(args)}</sbb-autocomplete>
  </sbb-form-field>
`;

const SelectTemplate = (args: Args): TemplateResult => html`
  <sbb-form-field ?negative=${args.negative}>
    <label>sbb-select</label>
    <sbb-select placeholder="Please select.">${createOptions(args)}</sbb-select>
  </sbb-form-field>
`;

const borderDecorator: Decorator = (story) => html`
  <div
    style="border-width: var(--sbb-spacing-fixed-2x); border-style: dashed; border-color: #ad00ff; width: 350px;"
  >
    ${story()}
  </div>
`;

export const Standalone: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: [borderDecorator],
};

export const WithIcon: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': 'clock-small' },
  decorators: [borderDecorator],
};

export const WithDisabledState: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
  decorators: [borderDecorator],
};

export const WithIconSpace: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, preserveIconSpace: true },
  decorators: [borderDecorator],
};

export const Autocomplete: StoryObj = {
  render: AutocompleteTemplate,
  argTypes: { ...defaultArgTypes, negative },
  args: { ...defaultArgs, negative: false },
};

export const Select: StoryObj = {
  render: SelectTemplate,
  argTypes: { ...defaultArgTypes, negative },
  args: { ...defaultArgs, negative: false },
};

const meta: Meta = {
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    actions: {
      handles: [
        SbbOptionElement.events.optionselectionchange,
        SbbOptionElement.events.optionselected,
      ],
    },
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '500px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-option/sbb-option',
};

export default meta;


import type {
  Meta,
  StoryObj,
  ArgTypes,
  Args,
  Decorator,
  StoryContext,
} from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import type { InputType } from 'storybook/internal/types';

import readme from './readme.md?raw';
import '../../form-field.ts';
import '../../autocomplete.ts';
import '../../select.ts';
import '../option.ts';
import './optgroup.component.ts';

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option group',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option',
  },
};

const disabledSingle: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option',
  },
};

const multiple: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete/Select',
  },
};

const numberOfOptions: InputType = {
  control: {
    type: 'number',
  },
};

const defaultArgTypes: ArgTypes = {
  label,
  'icon-name': iconName,
  value,
  disabled,
  disabledSingle,
  numberOfOptions,
};

const defaultArgs: Args = {
  label: 'Option group',
  'icon-name': undefined,
  value: 'Option',
  disabled: false,
  disabledSingle: false,
  numberOfOptions: 3,
};

const borderDecorator: Decorator = (story) => html`
  <div
    style="border-width: var(--sbb-spacing-fixed-2x); border-style: dashed; border-color: #ad00ff;"
  >
    ${story()}
  </div>
`;

const createOptions = (args: Args, groupId: string): TemplateResult[] =>
  new Array(args.numberOfOptions).fill(null).map((_, i) => {
    return html`
      <sbb-option
        value="${args.value} ${groupId} - ${i + 1}"
        ?disabled=${args.disabledSingle && i === 0}
        icon-name=${args['icon-name'] || nothing}
        >${args.value} ${groupId} - ${i + 1}</sbb-option
      >
    `;
  });

const Template = ({ label, disabled, ...args }: Args): TemplateResult => html`
  <sbb-optgroup label=${label + ' 1'} ?disabled=${disabled}>
    ${createOptions(args, '1')}
  </sbb-optgroup>
  <sbb-optgroup label=${label + ' 2'} ?disabled=${disabled}>
    ${createOptions(args, '2')}
  </sbb-optgroup>
`;

const TemplateAutocomplete = (args: Args): TemplateResult => {
  return html`
    <sbb-form-field ?negative=${args.negative}>
      <label>Autocomplete</label>
      <input placeholder="Placeholder" />
      <sbb-autocomplete>${Template(args)}</sbb-autocomplete>
    </sbb-form-field>
  `;
};

const TemplateSelect = (args: Args): TemplateResult => {
  return html`
    <sbb-form-field ?negative=${args.negative}>
      <label>Select</label>
      <sbb-select ?multiple=${args.multiple} placeholder="Select"> ${Template(args)} </sbb-select>
    </sbb-form-field>
  `;
};

export const Standalone: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: [borderDecorator],
};

export const Autocomplete: StoryObj = {
  render: TemplateAutocomplete,
  argTypes: { ...defaultArgTypes, negative },
  args: { ...defaultArgs, negative: false },
};

export const Select: StoryObj = {
  render: TemplateSelect,
  argTypes: { ...defaultArgTypes, negative, multiple },
  args: { ...defaultArgs, multiple: false, negative: false },
};

export const MultipleSelect: StoryObj = {
  render: TemplateSelect,
  argTypes: { ...defaultArgTypes, negative, multiple },
  args: { ...defaultArgs, multiple: true, negative: false },
};

const meta: Meta = {
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    actions: {
      handles: ['click'],
    },
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '500px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-option/sbb-optgroup',
};

export default meta;
