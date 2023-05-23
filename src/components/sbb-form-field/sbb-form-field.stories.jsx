import { h } from 'jsx-dom';
import readme from './readme.md';

const TooltipTrigger = () => [
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

const TemplateBasicInput = (args) => (
  <input
    class={args.class}
    placeholder={args.placeholder}
    disabled={args.disabled}
    readonly={args.readonly}
    value={args.value}
  />
);

const TemplateBasicSelect = (args) => (
  <select
    class={args.class}
    placeholder={args.placeholder}
    disabled={args.disabled}
    readonly={args.readonly}
  >
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
}) => (
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
}) => (
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

const TemplateInputWithErrorSpace = (args) => {
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
              if (event.currentTarget.value !== '') {
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

const TemplateInputWithIcons = (args) => (
  <sbb-form-field {...args}>
    <sbb-icon slot="prefix" name="pie-small" />
    {TemplateBasicInput(args)}
    {TooltipTrigger()}
  </sbb-form-field>
);

const TemplateInputWithButton = ({ disabled, readonly, active, ...args }) => (
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

const TemplateSelect = (args) => (
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

const TemplateSelectWithErrorSpace = (args) => {
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
              if (event.currentTarget.value !== '') {
                sbbFormError.remove();
                document.getElementById('sbb-form-field-input').classList.remove(args.class);
              } else {
                document.getElementById('sbb-form-field').append(sbbFormError);
                document.getElementById('sbb-form-field-input').classList.add(args.class);
              }
            }}
            class={args.class}
            placeholder={args.placeholder}
            readonly={args.readonly}
            disabled={args.disabled}
          >
            <option>{''}</option>
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

const TemplateSelectWithIcons = (args) => (
  <sbb-form-field {...args}>
    <span slot="prefix">
      <sbb-icon name="pie-small" />
    </span>
    {TemplateBasicSelect(args)}
    <span slot="suffix">{TooltipTrigger()}</span>
  </sbb-form-field>
);

const placeholderArg = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input attribute',
  },
};

const classArg = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input attribute',
  },
};

const disabledArg = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input attribute',
  },
};

const readonlyArg = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input attribute',
  },
};

const valueArg = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input attribute',
  },
};

const errortextArg = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Error slot',
  },
};

const errorSpaceArg = {
  control: {
    type: 'select',
  },
  options: ['none', 'reserve'],
  table: {
    category: 'Form-field attribute',
  },
};

const widthArg = {
  control: {
    type: 'select',
  },
  options: ['default', 'collapse'],
  table: {
    category: 'Form-field attribute',
  },
};

const labelArg = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const floatingLabelArg = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const optionalArg = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const borderlessArg = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const sizeArg = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 'l'],
  table: {
    category: 'Form-field attribute',
  },
};

const basicArgTypes = {
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

const basicArgs = {
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

export const Input = TemplateInput.bind({});
Input.argTypes = basicArgTypes;
Input.args = { ...basicArgs, value: 'This input value is so long that it needs ellipsis to fit.' };

export const InputSizeL = TemplateInput.bind({});
InputSizeL.argTypes = basicArgTypes;
InputSizeL.args = {
  ...basicArgs,
  value: 'This input value is so long that it needs ellipsis to fit.',
  size: 'l',
};

export const InputNoLabel = TemplateInput.bind({});
InputNoLabel.argTypes = basicArgTypes;
InputNoLabel.args = { ...basicArgs, label: '' };

export const InputWithSlottedLabel = TemplateInputWithSlottedLabel.bind({});
InputWithSlottedLabel.argTypes = basicArgTypes;
InputWithSlottedLabel.args = { ...basicArgs, value: 'Random value' };

export const InputWithoutBorder = TemplateInput.bind({});
InputWithoutBorder.argTypes = basicArgTypes;
InputWithoutBorder.args = { ...basicArgs, borderless: true };

export const InputDisabled = TemplateInput.bind({});
InputDisabled.argTypes = basicArgTypes;
InputDisabled.args = { ...basicArgs, disabled: true };

export const InputReadonly = TemplateInput.bind({});
InputReadonly.argTypes = basicArgTypes;
InputReadonly.args = { ...basicArgs, readonly: true };

export const InputOptionalAndIcons = TemplateInputWithIcons.bind({});
InputOptionalAndIcons.argTypes = basicArgTypes;
InputOptionalAndIcons.args = { ...basicArgs, optional: true };

export const InputWithButton = TemplateInputWithButton.bind({});
InputWithButton.argTypes = basicArgTypes;
InputWithButton.args = { ...basicArgs };

export const InputWithButtonDisabled = TemplateInputWithButton.bind({});
InputWithButtonDisabled.argTypes = basicArgTypes;
InputWithButtonDisabled.args = { ...basicArgs, disabled: true };

export const InputWithButtonActive = TemplateInputWithButton.bind({});
InputWithButtonActive.argTypes = basicArgTypes;
InputWithButtonActive.args = { ...basicArgs, active: true };

export const InputLongLabelAndErrorSpace = TemplateInputWithErrorSpace.bind({});
InputLongLabelAndErrorSpace.argTypes = { ...basicArgTypes, 'error-space': errorSpaceArg };
InputLongLabelAndErrorSpace.args = {
  ...basicArgs,
  'error-space': 'reserve',
  class: 'sbb-invalid',
  label: 'This label name is so long that it needs ellipsis to fit.',
  value: 'This input value is so long that it needs ellipsis to fit.',
};

export const Select = TemplateSelect.bind({});
Select.argTypes = basicArgTypes;
Select.args = JSON.parse(JSON.stringify(basicArgs));

export const SelectWithoutBorder = TemplateSelect.bind({});
SelectWithoutBorder.argTypes = basicArgTypes;
SelectWithoutBorder.args = { ...basicArgs, borderless: true };

export const SelectDisabled = TemplateSelect.bind({});
SelectDisabled.argTypes = basicArgTypes;
SelectDisabled.args = { ...basicArgs, disabled: true };

export const SelectErrorSpace = TemplateSelectWithErrorSpace.bind({});
SelectErrorSpace.argTypes = basicArgTypes;
SelectErrorSpace.args = { ...basicArgs, 'error-space': 'reserve', class: 'sbb-invalid' };

export const SelectOptionalAndIcons = TemplateSelectWithIcons.bind({});
SelectOptionalAndIcons.argTypes = basicArgTypes;
SelectOptionalAndIcons.args = { ...basicArgs, optional: true };

export const InputCollapsedWidth = TemplateInput.bind({});
InputCollapsedWidth.argTypes = basicArgTypes;
InputCollapsedWidth.args = { ...basicArgs, width: widthArg.options[1] };

export const InputWithIconsDisabled = TemplateInputWithIcons.bind({});
InputWithIconsDisabled.argTypes = basicArgTypes;
InputWithIconsDisabled.args = { ...basicArgs, disabled: true };

export const FloatingLabel = TemplateInput.bind({});
FloatingLabel.argTypes = basicArgTypes;
FloatingLabel.args = { ...basicArgs, 'floating-label': true, value: undefined };

export default {
  excludeStories: /.*Active$/,
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
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
