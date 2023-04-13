import { h } from 'jsx-dom';
import readme from './readme.md';

const checked = {
  control: {
    type: 'boolean',
  },
};

const indeterminate = {
  control: {
    type: 'boolean',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes = {
  checked,
  indeterminate,
  disabled,
};

const defaultArgs = {
  checked: false,
  indeterminate: false,
  disabled: false,
};

const Template = (args) => (
  <div style="display: flex">
    <sbb-visual-checkbox {...args}></sbb-visual-checkbox>
  </div>
);

export const Basic = Template.bind({});
Basic.argTypes = defaultArgTypes;
Basic.args = { ...defaultArgs };

export const Checked = Template.bind({});
Checked.argTypes = defaultArgTypes;
Checked.args = { ...defaultArgs, checked: true };

export const Indeterminate = Template.bind({});
Indeterminate.argTypes = defaultArgTypes;
Indeterminate.args = { ...defaultArgs, indeterminate: true };

export const Disabled = Template.bind({});
Disabled.argTypes = defaultArgTypes;
Disabled.args = { ...defaultArgs, disabled: true };

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
  title: 'internals/sbb-visual-checkbox',
};
