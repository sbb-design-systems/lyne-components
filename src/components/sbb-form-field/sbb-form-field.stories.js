import events from './sbb-form-field.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <sbb-form-field {...args}>
    <input slot='input' placeholder='Name' />
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

const basicArgTypes = {
  label: labelArg,
  optional: optionalArg
};

const basicArgs = {
  label: 'Name',
  optional: false
};

export const formWithLabelAndInput = Template.bind({});

formWithLabelAndInput.argTypes = basicArgTypes;

formWithLabelAndInput.args = JSON.parse(JSON.stringify(basicArgs));

formWithLabelAndInput.documentation = {
  title: 'Title which will be rendered on documentation platform'
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
    actions: {
      handles: [events.click]
    },
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'sbb-form-field'
};
