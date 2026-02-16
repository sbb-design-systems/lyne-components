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
