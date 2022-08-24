import { h } from 'jsx-dom';
import readme from './readme.md';

const TemplateBasicInput = (args) => (
  <input
    class={args.class}
    placeholder={args.placeholder}
    disabled={args.disabled}
    readOnly={args.readonly}
    value={args.value}
  />
);

const TemplateBasicSelect = (args) => (
  <select class={args.class} placeholder={args.placeholder} disabled={args.disabled}>
    <option>Value 1</option>
    <option>Value 2</option>
    <option>Value 3</option>
  </select>
);

const TemplateInput = (args) => (
  <sbb-form-field
    error-space={args['error-space']}
    label={args.label}
    optional={args.optional}
    size={args.size}
    borderless={args.borderless}
  >
    {TemplateBasicInput(args)}
  </sbb-form-field>
);

const TemplateInputWithErrorSpace = (args) => {
  const sbbFormError = <sbb-form-error slot="error">{args.errortext}</sbb-form-error>;

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
        >
          <input
            id="sbb-form-field-input"
            onKeyUp={(event) => {
              if (event.currentTarget.value !== '') {
                sbbFormError.remove();
                document.getElementById('sbb-form-field').classList.remove(args.class);
              } else {
                document.getElementById('sbb-form-field').append(sbbFormError);
                document.getElementById('sbb-form-field').classList.add(args.class);
              }
            }}
            class={args.class}
            placeholder={args.placeholder}
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
    <sbb-icon slot="suffix" name="circle-information-small" />
  </sbb-form-field>
);

const TemplateSelect = (args) => (
  <sbb-form-field
    error-space={args['error-space']}
    label={args.label}
    optional={args.optional}
    size={args.size}
    borderless={args.borderless}
  >
    {TemplateBasicSelect(args)}
  </sbb-form-field>
);

const TemplateSelectWithErrorSpace = (args) => {
  const sbbFormError = <sbb-form-error slot="error">This is a required field.</sbb-form-error>;

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
        >
          <select
            id="sbb-form-field-input"
            onChange={(event) => {
              if (event.currentTarget.value !== '') {
                sbbFormError.remove();
                document.getElementById('sbb-form-field').classList.remove(args.class);
              } else {
                document.getElementById('sbb-form-field').append(sbbFormError);
                document.getElementById('sbb-form-field').classList.add(args.class);
              }
            }}
            class={args.class}
            placeholder={args.placeholder}
          >
            <option>{''}</option>
            <option>Value 1</option>
            <option>Value 2</option>
            <option>Value 3</option>
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
    <span slot="suffix">
      <sbb-icon name="circle-information-small" />
    </span>
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
  options: ['default', 'reserve'],
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
  optional: optionalArg,
  borderless: borderlessArg,
  size: sizeArg,
  class: classArg,
  placeholder: placeholderArg,
  disabled: disabledArg,
  readonly: readonlyArg,
  value: valueArg,
  errortext: errortextArg,
};

const basicArgs = {
  'error-space': 'default',
  label: 'Input name',
  optional: false,
  borderless: false,
  size: 'm',
  class: '',
  placeholder: 'Input placeholder',
  value: 'Input value',
  disabled: false,
  readonly: false,
  errortext: 'This is a required field.',
};

export const Input = TemplateInput.bind({});
Input.argTypes = basicArgTypes;
Input.args = JSON.parse(JSON.stringify({ ...basicArgs }));
Input.documentation = {
  title: 'sbb-form-field component with label and input',
};

export const InputNoLabel = TemplateInput.bind({});
InputNoLabel.argTypes = basicArgTypes;
InputNoLabel.args = JSON.parse(JSON.stringify({ ...basicArgs, label: '' }));
InputNoLabel.documentation = {
  title: 'sbb-form-field component with label and input and no label',
};

export const InputWithoutBorder = TemplateInput.bind({});
InputWithoutBorder.argTypes = basicArgTypes;
InputWithoutBorder.args = JSON.parse(JSON.stringify({ ...basicArgs, borderless: true }));
InputWithoutBorder.documentation = {
  title: 'sbb-form-field component with label and input, without border',
};

export const InputDisabled = TemplateInput.bind({});
InputDisabled.argTypes = basicArgTypes;
InputDisabled.args = JSON.parse(JSON.stringify({ ...basicArgs, disabled: true }));
InputDisabled.documentation = {
  title: 'sbb-form-field component with input disabled',
};

export const InputReadonly = TemplateInput.bind({});
InputReadonly.argTypes = basicArgTypes;
InputReadonly.args = JSON.parse(JSON.stringify({ ...basicArgs, readonly: true }));
InputReadonly.documentation = {
  title: 'sbb-form-field with input in readonly',
};

export const InputAndIcons = TemplateInputWithIcons.bind({});
InputAndIcons.argTypes = basicArgTypes;
InputAndIcons.args = JSON.parse(JSON.stringify(basicArgs));
InputAndIcons.documentation = {
  title: 'sbb-form-field component with label, input and icons',
};

export const InputLongLabelAndErrorSpace = TemplateInputWithErrorSpace.bind({});
InputLongLabelAndErrorSpace.argTypes = { ...basicArgTypes, 'error-space': errorSpaceArg };
InputLongLabelAndErrorSpace.args = JSON.parse(
  JSON.stringify({
    ...basicArgs,
    'error-space': 'reserve',
    class: 'sbb-invalid',
    label: 'This label name is so long that needs ellipsis to fit',
  })
);
InputLongLabelAndErrorSpace.documentation = {
  title: 'sbb-form-field component with label, input, error and error-space',
};

export const Select = TemplateSelect.bind({});
Select.argTypes = basicArgTypes;
Select.args = JSON.parse(JSON.stringify(basicArgs));
Select.documentation = {
  title: 'sbb-form-field component with label and select',
};

export const SelectWithoutBorder = TemplateSelect.bind({});
SelectWithoutBorder.argTypes = basicArgTypes;
SelectWithoutBorder.args = JSON.parse(JSON.stringify({ ...basicArgs, borderless: true }));
SelectWithoutBorder.documentation = {
  title: 'sbb-form-field component with label and select, without border',
};

export const SelectDisabled = TemplateSelect.bind({});
SelectDisabled.argTypes = basicArgTypes;
SelectDisabled.args = JSON.parse(JSON.stringify({ ...basicArgs, disabled: true }));
SelectDisabled.documentation = {
  title: 'sbb-form-field component with select disabled',
};

export const SelectErrorSpace = TemplateSelectWithErrorSpace.bind({});
SelectErrorSpace.argTypes = basicArgTypes;
SelectErrorSpace.args = JSON.parse(
  JSON.stringify({ ...basicArgs, 'error-space': 'reserve', class: 'sbb-invalid' })
);
SelectErrorSpace.documentation = {
  title: 'sbb-form-field component with label, input, error and error-space',
};

export const SelectAndIcons = TemplateSelectWithIcons.bind({});
SelectAndIcons.argTypes = basicArgTypes;
SelectAndIcons.args = JSON.parse(JSON.stringify(basicArgs));
SelectAndIcons.documentation = {
  title: 'sbb-form-field component with label, select and icons',
};

export default {
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
