import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <sbb-checkbox-group {...args}>
    <sbb-checkbox name="example-name1" value="example-value 1">
      Label 1
    </sbb-checkbox>
    <sbb-checkbox name="example-name2" value="example-value 2">
      Label 2
    </sbb-checkbox>
    <sbb-checkbox name="example-name3" value="example-value 3">
      Label 3
    </sbb-checkbox>
  </sbb-checkbox-group>
);

const disabled = {
  control: {
    type: 'boolean',
  },
};

const required = {
  control: {
    type: 'boolean',
  },
};

const basicArgTypes = {
  disabled,
  required,
};

const basicArgs = {
  disabled: false,
  required: false,
};

export const checkboxGroup = Template.bind({});
checkboxGroup.argTypes = basicArgTypes;
checkboxGroup.args = { ...basicArgs };

checkboxGroup.documentation = {
  title: 'Title which will be rendered on documentation platform',
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
  title: 'components/form elements/sbb-checkbox-group',
};
