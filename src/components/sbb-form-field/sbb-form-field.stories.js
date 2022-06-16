import { h } from 'jsx-dom';
import readme from './readme.md';

const TemplateInput = (args) => (
  <sbb-form-field {...args}>
    <input slot='input' placeholder='Name' />
  </sbb-form-field>
);

const TemplateInputWithError = (args) => (
  <sbb-form-field {...args}>
    <input slot='input' placeholder='Name' />
    <sbb-form-error slot='error'>required field</sbb-form-error>
  </sbb-form-field>
);

const TemplateInputWithIcons = (args) => (
  <sbb-form-field {...args}>
    <i slot='prefix'></i>
    <input slot='input' placeholder='Name' />
    <i slot='suffix'></i>
  </sbb-form-field>
);

const TemplateSelect = (args) => (
  <sbb-form-field {...args}>
    <select slot='input' placeholder='Name'>
      <option>Value 1</option>
      <option>Value 2</option>
      <option>Value 3</option>
    </select>
  </sbb-form-field>
);

const TemplateSelectWithError = (args) => (
  <sbb-form-field {...args}>
    <select slot='input' placeholder='Name'>
      <option>Value 1</option>
      <option>Value 2</option>
      <option>Value 3</option>
    </select>
    <sbb-form-error slot='error'>required field</sbb-form-error>
  </sbb-form-field>
);

const labelArg = {
  control: {
    type: 'text'
  }
};

const optionalArg = {
  control: {
    type: 'boolean'
  }
};

const clearableArg = {
  control: {
    type: 'boolean'
  }
};

const basicArgTypes = {
  clearable: clearableArg,
  label: labelArg,
  optional: optionalArg
};

const basicArgs = {
  clearable: false,
  label: 'Name',
  optional: false
};

export const formWithLabelAndInput = TemplateInput.bind({});

formWithLabelAndInput.argTypes = basicArgTypes;

formWithLabelAndInput.args = JSON.parse(JSON.stringify(basicArgs));

formWithLabelAndInput.documentation = {
  title: 'sbb-form-field component with label and input'
};

export const formWithLabelInputAndError = TemplateInputWithError.bind({});

formWithLabelInputAndError.argTypes = basicArgTypes;

formWithLabelInputAndError.args = JSON.parse(JSON.stringify(basicArgs));

formWithLabelInputAndError.documentation = {
  title: 'sbb-form-field component with label, input and error'
};

export const formWithLabelInputAndIcons = TemplateInputWithIcons.bind({});

formWithLabelInputAndIcons.argTypes = basicArgTypes;

formWithLabelInputAndIcons.args = JSON.parse(JSON.stringify(basicArgs));

formWithLabelInputAndIcons.documentation = {
  title: 'sbb-form-field component with label, input and error'
};

export const formWithLabelAndSelect = TemplateSelect.bind({});

formWithLabelAndSelect.argTypes = basicArgTypes;

formWithLabelAndSelect.args = JSON.parse(JSON.stringify(basicArgs));

formWithLabelAndSelect.documentation = {
  title: 'sbb-form-field component with label and select'
};

export const formWithLabelSelectAndError = TemplateSelectWithError.bind({});

formWithLabelSelectAndError.argTypes = basicArgTypes;

formWithLabelSelectAndError.args = JSON.parse(JSON.stringify(basicArgs));

formWithLabelSelectAndError.documentation = {
  title: 'sbb-form-field component with label and select'
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story/>
      </div>
    )
  ],
  documentation: {
    disableArgs: ['someArgToDisableForDocumentationPlatform']
  },
  parameters: {
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'sbb-form-field'
};
