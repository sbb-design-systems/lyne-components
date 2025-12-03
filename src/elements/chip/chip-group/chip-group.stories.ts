import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components-vite';
import { html, nothing, type TemplateResult } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { SbbChipGroupElement } from './chip-group.component.ts';
import readme from './readme.md?raw';

import '../chip.ts';
import '../../autocomplete.ts';
import '../../form-field.ts';
import '../../option.ts';

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

const separatorKeys: InputType = {
  control: {
    type: 'object',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l'],
  table: {
    category: 'Form field',
  },
};

const hiddenLabel: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const floatingLabel: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const defaultArgTypes: ArgTypes = {
  disabled,
  readonly,
  negative,
  separatorKeys,
  size,
  hiddenLabel,
  floatingLabel,
};

const defaultArgs: Args = {
  disabled: false,
  readonly: false,
  negative: false,
  separatorKeys: undefined,
  size: 'm',
  hiddenLabel: false,
  floatingLabel: false,
};

const Template = (args: Args): TemplateResult => html`
  <form>
    <sbb-form-field
      ?negative=${args.negative}
      size=${args.size}
      ?hidden-label=${args.hiddenLabel}
      ?floating-label=${args.floatingLabel}
    >
      <label>Label</label>
      <sbb-chip-group name="chip-group-1" .separatorKeys=${args.separatorKeys || nothing}>
        <sbb-chip value="chip 1"></sbb-chip>
        <sbb-chip value="chip 2"></sbb-chip>
        <sbb-chip value="chip 3"></sbb-chip>
        <input placeholder="Placeholder" ?disabled=${args.disabled} ?readonly=${args.readonly} />
      </sbb-chip-group>
    </sbb-form-field>
  </form>
`;

const WithAutocompleteTemplate = (args: Args): TemplateResult => html`
  <sbb-form-field
    ?negative=${args.negative}
    size=${args.size}
    ?hidden-label=${args.hiddenLabel}
    ?floating-label=${args.floatingLabel}
  >
    <label>Label</label>
    <sbb-chip-group
      name="chip-group-1"
      ?negative=${args.negative}
      .separatorKeys=${args.separatorKeys || nothing}
    >
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

const SeparatorKeysTemplate = (args: Args): TemplateResult => html`
  ${Template(args)}
  <br />
  <span>In this example, the <b>comma</b> will trigger the chip creation</span>
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

export const SizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: 's' },
};

export const SizeL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: 'l' },
};

export const WithAutocomplete: StoryObj = {
  render: WithAutocompleteTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const WithAutocompleteNegative: StoryObj = {
  render: WithAutocompleteTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const WithSeparatorKeys: StoryObj = {
  render: SeparatorKeysTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, separatorKeys: [','] },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbChipGroupElement.events.input,
        SbbChipGroupElement.events.change,
        SbbChipGroupElement.events.chipinputtokenend,
      ],
    },
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-chip/sbb-chip-group',
};

export default meta;
