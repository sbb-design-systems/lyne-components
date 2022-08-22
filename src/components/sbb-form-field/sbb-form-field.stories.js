import { h } from 'jsx-dom';
import readme from './readme.md';

const TemplateInput = (args) => (
  <sbb-form-field
    error-space={args['error-space']}
    label={args.label}
    optional={args.optional}
    size={args.size}
    borderless={args.borderless}
  >
    <input
      placeholder="Name"
      disabled={args.disabled}
      readOnly={args.readonly}
      value={args.status}
    />
  </sbb-form-field>
);

const TemplateInputWithError = (args) => (
  <sbb-form-field {...args}>
    <input class="sbb-invalid" placeholder="Name" />
    <sbb-form-error slot="error">{args.errortext}</sbb-form-error>
  </sbb-form-field>
);

const TemplateInputWithErrorSpace = (args) => {
  const sbbFormError = <sbb-form-error slot="error">{args.errortext}</sbb-form-error>;

  return (
    <form>
      <div>
        <sbb-form-field id="sbb-form-field" {...args}>
          <input
            id="sbb-form-field-input"
            onFocus={(event) => {
              if (event.currentTarget.value === '') {
                document.getElementById('sbb-form-field').append(sbbFormError);
              }
            }}
            onBlur={(event) => {
              if (event.currentTarget.value !== '') {
                sbbFormError.remove();
              }
            }}
            class="sbb-invalid"
            placeholder="Name"
          />
          {sbbFormError}
        </sbb-form-field>
      </div>
      <div>
        <sbb-form-field {...args}>
          <input placeholder="Name" />
        </sbb-form-field>
      </div>
    </form>
  );
};

const TemplateInputWithIcons = (args) => (
  <sbb-form-field {...args}>
    <sbb-icon slot="prefix" name="pie-small" />
    <input placeholder="Name" />
    <sbb-icon slot="suffix" name="circle-information-small" />
  </sbb-form-field>
);

const TemplateSelect = (args) => (
  <sbb-form-field {...args}>
    <select placeholder="Name">
      <option>Value 1</option>
      <option>Value 2</option>
      <option>Value 3</option>
    </select>
  </sbb-form-field>
);

const TemplateSelectDisabled = (args) => (
  <sbb-form-field {...args}>
    <select disabled={args.disabled}>
      <option>Value 1</option>
      <option>Value 2</option>
      <option>Value 3</option>
    </select>
  </sbb-form-field>
);

const TemplateSelectWithError = (args) => (
  <sbb-form-field {...args}>
    <select class="sbb-invalid">
      <option>Value 1</option>
      <option>Value 2</option>
      <option>Value 3</option>
    </select>
    <sbb-form-error slot="error">This is a required field.</sbb-form-error>
  </sbb-form-field>
);

const TemplateSelectWithErrorSpace = (args) => {
  const sbbFormError = <sbb-form-error slot="error">This is a required field.</sbb-form-error>;

  return (
    <form>
      <div>
        <sbb-form-field id="sbb-form-field" {...args}>
          <select
            id="sbb-form-field-input"
            onFocus={(event) => {
              if (event.currentTarget.value === '') {
                document.getElementById('sbb-form-field').append(sbbFormError);
              }
            }}
            onBlur={(event) => {
              if (event.currentTarget.value !== '') {
                sbbFormError.remove();
              }
            }}
            class="sbb-invalid"
            placeholder="Name"
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
        <sbb-form-field {...args}>
          <input placeholder="Name" />
        </sbb-form-field>
      </div>
    </form>
  );
};

const TemplateSelectWithIcons = (args) => (
  <sbb-form-field {...args}>
    <span slot="prefix">
      <sbb-icon name="pie-small" />
    </span>
    <select>
      <option>Value 1</option>
      <option>Value 2</option>
      <option>Value 3</option>
    </select>
    <span slot="suffix">
      <sbb-icon name="circle-information-small" />
    </span>
  </sbb-form-field>
);

const disabledArg = {
  control: {
    type: 'boolean',
  },
};

const statusArg = {
  control: {
    type: 'text',
  },
};

const errorSpaceArg = {
  control: {
    type: 'select',
  },
  options: ['default', 'reserve'],
};

const labelArg = {
  control: {
    type: 'text',
  },
};

const optionalArg = {
  control: {
    type: 'boolean',
  },
};

const borderlessArg = {
  control: {
    type: 'boolean',
  },
};

const readonlyArg = {
  control: {
    type: 'boolean',
  },
};

const sizeArg = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm'],
};

const basicArgTypes = {
  label: labelArg,
  optional: optionalArg,
  borderless: borderlessArg,
  size: sizeArg,
};

const basicArgs = {
  label: 'Name',
  optional: false,
  borderless: false,
  size: 'm',
  status: '',
  errortext: 'This is a required field.',
};

export const formWithLabelAndInput = TemplateInput.bind({});

formWithLabelAndInput.argTypes = basicArgTypes;

formWithLabelAndInput.args = JSON.parse(JSON.stringify({ ...basicArgs }));

formWithLabelAndInput.documentation = {
  title: 'sbb-form-field component with label and input',
};

export const formWithLabelAndInputWithoutBorder = TemplateInput.bind({});

formWithLabelAndInputWithoutBorder.argTypes = basicArgTypes;

formWithLabelAndInputWithoutBorder.args = JSON.parse(
  JSON.stringify({ ...basicArgs, borderless: true })
);

formWithLabelAndInputWithoutBorder.documentation = {
  title: 'sbb-form-field component with label and input, without border',
};

export const formWithInputDisabled = TemplateInput.bind({});

formWithInputDisabled.argTypes = { ...basicArgTypes, disabled: disabledArg, status: statusArg };

formWithInputDisabled.args = JSON.parse(
  JSON.stringify({ ...basicArgs, disabled: true, status: 'disabled' })
);

formWithInputDisabled.documentation = {
  title: 'sbb-form-field component with input disabled',
};

export const formWithInputInReadOnly = TemplateInput.bind({});

formWithInputInReadOnly.argTypes = { ...basicArgTypes, readonly: readonlyArg, status: statusArg };

formWithInputInReadOnly.args = JSON.parse(
  JSON.stringify({ ...basicArgs, readonly: true, status: 'readonly' })
);

formWithInputInReadOnly.documentation = {
  title: 'sbb-form-field with input in readonly',
};

export const formWithLabelInputAndError = TemplateInputWithError.bind({});

formWithLabelInputAndError.argTypes = basicArgTypes;

formWithLabelInputAndError.args = JSON.parse(JSON.stringify(basicArgs));

formWithLabelInputAndError.documentation = {
  title: 'sbb-form-field component with label, input and error',
};

export const formWithLabelInputAndErrorLongText = TemplateInputWithError.bind({});

formWithLabelInputAndErrorLongText.argTypes = basicArgTypes;

formWithLabelInputAndErrorLongText.args = JSON.parse(
  JSON.stringify({
    ...basicArgs,
    errortext: 'This is a required field, insert only characters and numbers.',
  })
);

formWithLabelInputAndErrorLongText.documentation = {
  title: 'sbb-form-field component with label, input and error with long text',
};

export const formWithLabelInputAndErrorSpace = TemplateInputWithErrorSpace.bind({});

formWithLabelInputAndErrorSpace.argTypes = { ...basicArgTypes, 'error-space': errorSpaceArg };

formWithLabelInputAndErrorSpace.args = JSON.parse(
  JSON.stringify({ ...basicArgs, 'error-space': 'default' })
);

formWithLabelInputAndErrorSpace.documentation = {
  title: 'sbb-form-field component with label, input, error and error-space',
};

export const formWithLabelInputAndIcons = TemplateInputWithIcons.bind({});

formWithLabelInputAndIcons.argTypes = basicArgTypes;

formWithLabelInputAndIcons.args = JSON.parse(JSON.stringify(basicArgs));

formWithLabelInputAndIcons.documentation = {
  title: 'sbb-form-field component with label, input and icons',
};

export const formWithLabelAndSelect = TemplateSelect.bind({});

formWithLabelAndSelect.argTypes = basicArgTypes;

formWithLabelAndSelect.args = JSON.parse(JSON.stringify(basicArgs));

formWithLabelAndSelect.documentation = {
  title: 'sbb-form-field component with label and select',
};

export const formWithLabelAndSelectWithoutBorder = TemplateSelect.bind({});

formWithLabelAndSelectWithoutBorder.argTypes = basicArgTypes;

formWithLabelAndSelectWithoutBorder.args = JSON.parse(
  JSON.stringify({ ...basicArgs, borderless: true })
);

formWithLabelAndSelectWithoutBorder.documentation = {
  title: 'sbb-form-field component with label and select, without border',
};

export const formWithSelectDisabled = TemplateSelectDisabled.bind({});

formWithSelectDisabled.argTypes = { ...basicArgTypes, disabled: disabledArg };

formWithSelectDisabled.args = JSON.parse(JSON.stringify({ ...basicArgs, disabled: true }));

formWithSelectDisabled.documentation = {
  title: 'sbb-form-field component with select disabled',
};

export const formWithLabelSelectAndError = TemplateSelectWithError.bind({});

formWithLabelSelectAndError.argTypes = basicArgTypes;

formWithLabelSelectAndError.args = JSON.parse(JSON.stringify(basicArgs));

formWithLabelSelectAndError.documentation = {
  title: 'sbb-form-field component with label and select',
};

export const formWithLabelSelectAndErrorSpace = TemplateSelectWithErrorSpace.bind({});

formWithLabelSelectAndErrorSpace.argTypes = { ...basicArgTypes, 'error-space': errorSpaceArg };

formWithLabelSelectAndErrorSpace.args = JSON.parse(
  JSON.stringify({ ...basicArgs, 'error-space': 'default' })
);

formWithLabelSelectAndErrorSpace.documentation = {
  title: 'sbb-form-field component with label, input, error and error-space',
};

export const formWithLabelSelectAndIcons = TemplateSelectWithIcons.bind({});

formWithLabelSelectAndIcons.argTypes = basicArgTypes;

formWithLabelSelectAndIcons.args = JSON.parse(JSON.stringify(basicArgs));

formWithLabelSelectAndIcons.documentation = {
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
  documentation: {
    disableArgs: ['someArgToDisableForDocumentationPlatform'],
  },
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
