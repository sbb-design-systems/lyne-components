import { h } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-toggle-option.events';

const value = {
  control: {
    type: 'text',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes = {
  disabled,
  value,
};

const defaultArgs = {
  disabled: false,
  value: 'Option 1',
};

const Template = (args) => <sbb-toggle-option {...args}>Option 1</sbb-toggle-option>;

export const sbbToggleOption = Template.bind({});
sbbToggleOption.args = defaultArgs;
sbbToggleOption.argTypes = defaultArgTypes;

sbbToggleOption.documentation = {
  title: 'Title which will be rendered on documentation platform',
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem; max-width: 1050px'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: [events.didSelect],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-toggle-option',
};
