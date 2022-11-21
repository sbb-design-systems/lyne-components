import { h } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-toggle.events';

const disabled = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Toggle',
  },
};

const even = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Toggle',
  },
};

const size = {
  control: {
    type: 'inline-radio',
    options: ['m', 's'],
  },
  table: {
    category: 'Toggle',
  },
};

const value = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Toggle',
  },
};

const iconName = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Toggle Option',
  },
};

const defaultArgTypes = {
  disabled,
  even,
  size,
  value,
};

const defaultArgs = {
  disabled: false,
  even: false,
  size: 'm',
  value: 'option-1',
};

const toggleOption = (disabled, iconName) => [
  <sbb-toggle-option disabled={disabled} icon-name={iconName} value="option-1"></sbb-toggle-option>,
  <sbb-toggle-option disabled={disabled} icon-name={iconName} value="option-2"></sbb-toggle-option>,
];

const DefaultTemplate = (args) => (
  <sbb-toggle {...args}>
    <sbb-toggle-option value="option-1">Option 1</sbb-toggle-option>
    <sbb-toggle-option value="option-2">Option 2</sbb-toggle-option>
  </sbb-toggle>
);

const CustomIconsTemplate = ({ disabled, iconName, ...args }) => (
  <sbb-toggle {...args}>{toggleOption(disabled, iconName)}</sbb-toggle>
);

export const sbbToggle = DefaultTemplate.bind({});
sbbToggle.args = defaultArgs;
sbbToggle.argTypes = defaultArgTypes;
sbbToggle.documentation = {
  title: 'sbb-toggle',
};

export const sbbToggleDisabled = DefaultTemplate.bind({});
sbbToggleDisabled.args = { ...defaultArgs, disabled: true };
sbbToggleDisabled.argTypes = defaultArgTypes;
sbbToggleDisabled.documentation = {
  title: 'sbb-toggle disabled',
};

export const sbbToggleFixedWidth = DefaultTemplate.bind({});
sbbToggleFixedWidth.args = { ...defaultArgs, even: true };
sbbToggleFixedWidth.argTypes = defaultArgTypes;
sbbToggleFixedWidth.documentation = {
  title: 'sbb-toggle fixed width',
};

export const sbbToggleWithIcons = CustomIconsTemplate.bind({});
sbbToggleWithIcons.args = { ...defaultArgs, iconName: 'arrow-right-small' };
sbbToggleWithIcons.argTypes = { ...defaultArgTypes, iconName };
sbbToggleWithIcons.documentation = {
  title: 'sbb-toggle fixed width',
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
    actions: {
      handles: [events.didChange],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-toggle',
};
