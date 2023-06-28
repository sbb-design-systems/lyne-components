/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

const TooltipTrigger = (): JSX.Element[] => [
  <sbb-tooltip-trigger
    slot="suffix"
    id="tooltip-trigger"
    icon-name="circle-information-small"
  ></sbb-tooltip-trigger>,
  <sbb-tooltip data-testid="tooltip" trigger="tooltip-trigger">
    <span id="tooltip-content" class="sbb-text-s">
      Simple info tooltip.
      <sbb-link
        text-size="s"
        variant="block"
        icon-name="chevron-small-right-small"
        icon-placement="end"
        sbb-tooltip-close
      >
        Learn More
      </sbb-link>
    </span>
  </sbb-tooltip>,
];

const TemplateBasicInput = (args): JSX.Element => (
  <input
    class={args.class}
    placeholder={args.placeholder}
    disabled={args.disabled}
    readonly={args.readonly}
    value={args.value}
  />
);

const TemplateBasicSelect = (args): JSX.Element => (
  <select class={args.class} disabled={args.disabled}>
    <option value="1">Value 1</option>
    <option value="2">Value 2</option>
    <option value="3">Value 3</option>
  </select>
);

const TemplateInput = ({
  'error-space': errorSpace,
  label,
  optional,
  size,
  borderless,
  width,
  'floating-label': floatingLabel,
  ...args
}): JSX.Element => (
  <sbb-form-field
    error-space={errorSpace}
    label={label}
    optional={optional}
    size={size}
    borderless={borderless}
    width={width}
    floating-label={floatingLabel}
  >
    {TemplateBasicInput(args)}
  </sbb-form-field>
);

const TemplateInputWithSlottedLabel = ({
  'error-space': errorSpace,
  label,
  optional,
  size,
  borderless,
  width,
  'floating-label': floatingLabel,
  ...args
}): JSX.Element => (
  <sbb-form-field
    error-space={errorSpace}
    optional={optional}
    size={size}
    borderless={borderless}
    width={width}
    floating-label={floatingLabel}
  >
    <span slot="label">{label}</span>
    {TemplateBasicInput(args)}
  </sbb-form-field>
);

const TemplateInputWithErrorSpace = (args): JSX.Element => {
  const sbbFormError = <sbb-form-error>{args.errortext}</sbb-form-error>;

  return (
    <form>
      <div>
        <sbb-form-field
          id="sbb-form-field"
          error-space={args['error-space']}
          label={args.label}
          optional={args.optional}
          size={args.size}
          borderless={args.borderless}
          width={args.width}
          floating-label={args['floating-label']}
        >
          <input
            id="sbb-form-field-input"
            onKeyUp={(event) => {
              if ((event.currentTarget as HTMLInputElement).value !== '') {
                sbbFormError.remove();
                document.getElementById('sbb-form-field-input').classList.remove(args.class);
              } else {
                document.getElementById('sbb-form-field').append(sbbFormError);
                document.getElementById('sbb-form-field-input').classList.add(args.class);
              }
            }}
            class={args.class}
            placeholder={args.placeholder}
            disabled={args.disabled}
            readonly={args.readonly}
          />
          {sbbFormError}
        </sbb-form-field>
      </div>
      <div>Some text, right below the form-field, inside a div.</div>
    </form>
  );
};

const TemplateInputWithIcons = (args): JSX.Element => (
  <sbb-form-field {...args}>
    <sbb-icon slot="prefix" name="pie-small" />
    {TemplateBasicInput(args)}
    {TooltipTrigger()}
  </sbb-form-field>
);

const TemplateInputWithButton = ({ disabled, readonly, active, ...args }): JSX.Element => (
  <sbb-form-field {...args}>
    {TemplateBasicInput({ ...args, disabled, readonly })}
    <sbb-button
      slot="suffix"
      icon-name="cross-small"
      disabled={disabled || readonly}
      aria-label="clear input"
      data-active={active}
      onClick={() => {
        const input = document.querySelector('input');
        if (input) {
          input.value = '';
          input.focus();
        }
      }}
    />
  </sbb-form-field>
);

const TemplateSelect = (args): JSX.Element => (
  <sbb-form-field
    error-space={args['error-space']}
    label={args.label}
    optional={args.optional}
    size={args.size}
    borderless={args.borderless}
    width={args.width}
    floating-label={args['floating-label']}
  >
    {TemplateBasicSelect(args)}
  </sbb-form-field>
);

const TemplateSelectWithErrorSpace = (args): JSX.Element => {
  const sbbFormError = <sbb-form-error>{args.errortext}</sbb-form-error>;

  return (
    <form>
      <div>
        <sbb-form-field
          id="sbb-form-field"
          error-space={args['error-space']}
          label={args.label}
          optional={args.optional}
          size={args.size}
          borderless={args.borderless}
          width={args.width}
          floating-label={args['floating-label']}
        >
          <select
            id="sbb-form-field-input"
            onChange={(event) => {
              if ((event.currentTarget as HTMLSelectElement).value !== '') {
                sbbFormError.remove();
                document.getElementById('sbb-form-field-input').classList.remove(args.class);
              } else {
                document.getElementById('sbb-form-field').append(sbbFormError);
                document.getElementById('sbb-form-field-input').classList.add(args.class);
              }
            }}
            class={args.class}
            disabled={args.disabled}
          >
            <option value="0"></option>
            <option value="1">Value 1</option>
            <option value="2">Value 2</option>
            <option value="3">Value 3</option>
          </select>
          {sbbFormError}
        </sbb-form-field>
      </div>
      <div>
        <div>Some text, right below the form-field, inside a div.</div>
      </div>
    </form>
  );
};

const TemplateSelectWithIcons = (args): JSX.Element => (
  <sbb-form-field {...args}>
    <span slot="prefix">
      <sbb-icon name="pie-small" />
    </span>
    {TemplateBasicSelect(args)}
    <span slot="suffix">{TooltipTrigger()}</span>
  </sbb-form-field>
);

const placeholderArg: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input attribute',
  },
};

const classArg: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input attribute',
  },
};

const disabledArg: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input attribute',
  },
};

const readonlyArg: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input attribute',
  },
};

const valueArg: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input attribute',
  },
};

const errortextArg: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Error slot',
  },
};

const errorSpaceArg: InputType = {
  control: {
    type: 'select',
  },
  options: ['none', 'reserve'],
  table: {
    category: 'Form-field attribute',
  },
};

const widthArg: InputType = {
  control: {
    type: 'select',
  },
  options: ['default', 'collapse'],
  table: {
    category: 'Form-field attribute',
  },
};

const labelArg: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const floatingLabelArg: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const optionalArg: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const borderlessArg: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const sizeArg: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 'l'],
  table: {
    category: 'Form-field attribute',
  },
};

const basicArgTypes: ArgTypes = {
  'error-space': errorSpaceArg,
  label: labelArg,
  'floating-label': floatingLabelArg,
  optional: optionalArg,
  borderless: borderlessArg,
  size: sizeArg,
  class: classArg,
  placeholder: placeholderArg,
  disabled: disabledArg,
  readonly: readonlyArg,
  value: valueArg,
  errortext: errortextArg,
  width: widthArg,
};

const basicArgs: Args = {
  'error-space': 'none',
  label: 'Input name',
  'floating-label': false,
  optional: false,
  borderless: false,
  size: sizeArg.options[0],
  class: '',
  placeholder: 'Input placeholder',
  value: 'Input value',
  disabled: false,
  readonly: false,
  errortext: 'This is a required field.',
  width: widthArg.options[0],
};

export const Input: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, value: 'This input value is so long that it needs ellipsis to fit.' },
};

export const InputSizeL: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    value: 'This input value is so long that it needs ellipsis to fit.',
    size: 'l',
  },
};

export const InputNoLabel: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, label: '' },
};

export const InputWithSlottedLabel: StoryObj = {
  render: TemplateInputWithSlottedLabel,
  argTypes: basicArgTypes,
  args: { ...basicArgs, value: 'Random value' },
};

export const InputWithoutBorder: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, borderless: true },
};

export const InputDisabled: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

export const InputReadonly: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, readonly: true },
};

export const InputOptionalAndIcons: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true },
};

export const InputWithButton: StoryObj = {
  render: TemplateInputWithButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const InputWithButtonDisabled: StoryObj = {
  render: TemplateInputWithButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

export const InputWithButtonActive: StoryObj = {
  render: TemplateInputWithButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, active: true },
};

export const InputLongLabelAndErrorSpace: StoryObj = {
  render: TemplateInputWithErrorSpace,
  argTypes: { ...basicArgTypes, 'error-space': errorSpaceArg },
  args: {
    ...basicArgs,
    'error-space': 'reserve',
    class: 'sbb-invalid',
    label: 'This label name is so long that it needs ellipsis to fit.',
    value: 'This input value is so long that it needs ellipsis to fit.',
  },
};

export const InputFloatingLabel: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'floating-label': true, value: undefined },
};

export const InputFloatingLongLabel: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'floating-label': true,
    value: undefined,
    label: 'This is a very long label which receives ellipsis',
  },
};

export const InputFloatingWithIcons: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'floating-label': true,
    value: undefined,
  },
};

export const Select: StoryObj = {
  render: TemplateSelect,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const SelectWithoutBorder: StoryObj = {
  render: TemplateSelect,
  argTypes: basicArgTypes,
  args: { ...basicArgs, borderless: true },
};

export const SelectDisabled: StoryObj = {
  render: TemplateSelect,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

export const SelectErrorSpace: StoryObj = {
  render: TemplateSelectWithErrorSpace,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'error-space': 'reserve', class: 'sbb-invalid' },
};

export const SelectFloatingLabel: StoryObj = {
  render: TemplateSelectWithErrorSpace,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'floating-label': true, value: undefined },
};

export const SelectOptionalAndIcons: StoryObj = {
  render: TemplateSelectWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true },
};

export const InputCollapsedWidth: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, width: widthArg.options[1] },
};

export const InputWithIconsDisabled: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

const meta: Meta = {
  excludeStories: /.*Active$/,
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-form-field',
};

export default meta;
