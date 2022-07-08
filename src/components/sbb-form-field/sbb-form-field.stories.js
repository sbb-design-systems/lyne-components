import { h } from 'jsx-dom';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import readme from './readme.md';

const TemplateInput = (args) => (
  <sbb-form-field {...args}>
    <input slot="input" class="input" placeholder="Name" />
  </sbb-form-field>
);

const TemplateInputWithoutBorder = (args) => (
  <sbb-form-field {...args}>
    <input slot="input" class="input form-field--borderless" placeholder="Name" />
  </sbb-form-field>
);

const TemplateInputDisabled = (args) => (
  <sbb-form-field error-space={args['error-space']} label={args.label} optional={args.optional}>
    <input
      slot="input"
      class="input"
      placeholder="Name"
      disabled={args.disabled}
      value="Disabled"
    />
  </sbb-form-field>
);

const TemplateInputReadOnly = (args) => [
  <sbb-form-field error-space={args['error-space']} label={args.label} optional={args.optional}>
    <input
      slot="input"
      class="input"
      placeholder="Name"
      readOnly={args.readonly}
      value="Readonly"
    />
  </sbb-form-field>,
];

const TemplateInputWithError = (args) => (
  <sbb-form-field {...args}>
    <input slot="input" class="input sbb-invalid" placeholder="Name" />
    <sbb-form-error id="error" class="input-label-error" slot="error">
      This is a required field.
    </sbb-form-error>
  </sbb-form-field>
);

const TemplateInputWithIcons = (args) => (
  <sbb-form-field {...args}>
    <span slot="prefix" class="input__icon-prefix">
      {getMarkupForSvg('pie-small')}
    </span>
    <input slot="input" class="input" placeholder="Name" />
    <span slot="suffix" class="input__icon-suffix">
      {getMarkupForSvg('circle-information-small')}
    </span>
  </sbb-form-field>
);

const TemplateSelect = (args) => (
  <sbb-form-field {...args}>
    <select slot="input" class="input select" placeholder="Name">
      <option>Value 1</option>
      <option>Value 2</option>
      <option>Value 3</option>
    </select>
  </sbb-form-field>
);

const TemplateSelectDisabled = (args) => (
  <sbb-form-field {...args}>
    <select slot="input" class="input select" placeholder="Name" disabled={args.disabled}>
      <option>Value 1</option>
      <option>Value 2</option>
      <option>Value 3</option>
    </select>
  </sbb-form-field>
);

const TemplateSelectWithError = (args) => (
  <sbb-form-field {...args}>
    <select slot="input" class="input select" placeholder="Name">
      <option>Value 1</option>
      <option>Value 2</option>
      <option>Value 3</option>
    </select>
    <sbb-form-error idError="error" slot="error">
      This is a required field.
    </sbb-form-error>
  </sbb-form-field>
);

const TemplateSelectWithIcons = (args) => (
  <sbb-form-field {...args}>
    <span slot="prefix" class="input__icon-prefix">
      {getMarkupForSvg('pie-small')}
    </span>
    <select slot="input" class="input select" placeholder="Name">
      <option>Value 1</option>
      <option>Value 2</option>
      <option>Value 3</option>
    </select>
    <span slot="suffix" class="input__icon-suffix">
      {getMarkupForSvg('circle-information-small')}
    </span>
  </sbb-form-field>
);

const disabledArg = {
  control: {
    type: 'boolean',
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

const readonlyArg = {
  control: {
    type: 'boolean',
  },
};

const sizeArg = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm']
};

const basicArgTypes = {
  'error-space': errorSpaceArg,
  label: labelArg,
  optional: optionalArg,
  size: sizeArg
};

const basicArgs = {
  'error-space': 'default',
  label: 'Name',
  optional: false,
  size: 'l'
};

export const formWithLabelAndInput = TemplateInput.bind({});

formWithLabelAndInput.argTypes = basicArgTypes;

formWithLabelAndInput.args = JSON.parse(JSON.stringify(basicArgs));

formWithLabelAndInput.documentation = {
  title: 'sbb-form-field component with label and input',
};

export const formWithLabelAndInputWithoutBorder = TemplateInputWithoutBorder.bind({});

formWithLabelAndInputWithoutBorder.argTypes = basicArgTypes;

formWithLabelAndInputWithoutBorder.args = JSON.parse(JSON.stringify(basicArgs));

formWithLabelAndInputWithoutBorder.documentation = {
  title: 'sbb-form-field component with label and input, without border',
};

export const formWithInputDisabled = TemplateInputDisabled.bind({});

formWithInputDisabled.argTypes = { ...basicArgTypes, disabled: disabledArg };

formWithInputDisabled.args = JSON.parse(JSON.stringify({ ...basicArgs, disabled: true }));

formWithInputDisabled.documentation = {
  title: 'sbb-form-field component with input disabled',
};

export const formWithInputInReadOnly = TemplateInputReadOnly.bind({});

formWithInputInReadOnly.argTypes = { ...basicArgTypes, readonly: readonlyArg };

formWithInputInReadOnly.args = JSON.parse(JSON.stringify({ ...basicArgs, readonly: true }));

formWithInputInReadOnly.documentation = {
  title: 'sbb-form-field with input in readonly',
};

export const formWithLabelInputAndError = TemplateInputWithError.bind({});

formWithLabelInputAndError.argTypes = basicArgTypes;

formWithLabelInputAndError.args = JSON.parse(JSON.stringify(basicArgs));

formWithLabelInputAndError.documentation = {
  title: 'sbb-form-field component with label, input and error',
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
