import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { SbbChipGroupElement } from './chip-group.js';
import readme from './readme.md?raw';

import '../chip.js';
import '../../autocomplete/autocomplete.js';
import '../../form-field/form-field.js';
import '../../option/option.js';

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  disabled,
  readonly,
  negative,
};

const defaultArgs: Args = {
  disabled: false,
  readonly: false,
  negative: false,
};

const Template = (args: Args): TemplateResult => html`
  <form>
    <sbb-form-field ?negative=${args.negative}>
      <label>Label</label>
      <sbb-chip-group name="chip-group-1">
        <sbb-chip value="chip 1"></sbb-chip>
        <sbb-chip value="chip 2"></sbb-chip>
        <sbb-chip value="chip 3"></sbb-chip>
        <input placeholder="Placeholder" ?disabled=${args.disabled} ?readonly=${args.readonly} />
      </sbb-chip-group>
    </sbb-form-field>
  </form>
`;

const WithAutocompleteTemplate = (args: Args): TemplateResult => html`
  <sbb-form-field ?negative=${args.negative}>
    <label>Label</label>
    <sbb-chip-group name="chip-group-1" ?negative=${args.negative}>
      <sbb-chip value="chip 1"></sbb-chip>
      <sbb-chip value="chip 2"></sbb-chip>
      <sbb-chip value="chip 3"></sbb-chip>
      <input placeholder="Placeholder" ?disabled=${args.disabled} ?readonly=${args.readonly} />
    </sbb-chip-group>
    <sbb-autocomplete>
      <sbb-option value="Option A">Option A</sbb-option>
      <sbb-option value="Option B">Option B</sbb-option>
      <sbb-option value="Option C">Option C</sbb-option>
    </sbb-autocomplete>
  </sbb-form-field>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Disabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const Readonly: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, readonly: true },
};

export const WithAutocomplete: StoryObj = {
  render: WithAutocompleteTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbChipGroupElement.events.input, SbbChipGroupElement.events.change],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-chip-group/sbb-chip-group',
};

export default meta;
