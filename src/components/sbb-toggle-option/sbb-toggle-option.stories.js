import { h } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-toggle-option.events';

const checked = {
  control: {
    type: 'boolean',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
};

const iconName = {
  control: {
    type: 'text',
  },
};

const size = {
  control: {
    type: 'inline-radio',
    options: ['m', 's'],
  },
};

const value = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  checked,
  disabled,
  size,
};

const defaultArgs = {
  checked: false,
  disabled: false,
  size: 'm',
};

const DefaultTemplate = (args) => <sbb-toggle-option {...args}>Option 1</sbb-toggle-option>;

export const sbbToggleOption = DefaultTemplate.bind({});
sbbToggleOption.argTypes = { ...defaultArgTypes, value };
sbbToggleOption.args = { ...defaultArgs, value: 'Option 1' };
sbbToggleOption.documentation = {
  title: 'sbb-toggle-option',
};

export const sbbToggleOptionWithIcon = DefaultTemplate.bind({});
sbbToggleOptionWithIcon.argTypes = { ...defaultArgTypes, 'icon-name': iconName };
sbbToggleOptionWithIcon.args = { ...defaultArgs, 'icon-name': 'arrow-right-small' };
sbbToggleOptionWithIcon.documentation = {
  title: 'sbb-toggle-option with custom icon',
};

export const sbbToggleOptionWithLabelAndIcon = DefaultTemplate.bind({});
sbbToggleOptionWithLabelAndIcon.argTypes = { ...defaultArgTypes, 'icon-name': iconName, value };
sbbToggleOptionWithLabelAndIcon.args = {
  ...defaultArgs,
  'icon-name': 'arrow-right-small',
  value: 'Option 1',
};
sbbToggleOptionWithLabelAndIcon.documentation = {
  title: 'sbb-toggle-option with custom icon',
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
  title: 'components/form elements/toggle/sbb-toggle-option',
};
