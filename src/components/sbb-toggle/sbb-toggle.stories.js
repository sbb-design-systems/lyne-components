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

const value1 = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Toggle Option',
  },
};

const value2 = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Toggle Option',
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

const toggleOption = (args) => [
  <sbb-toggle-option disabled={args.disabled} icon-name={args.iconName} value={args.value1}>
    option-1-option-1-option-1-option-1-option-1-option-1-option-1-option-1-
  </sbb-toggle-option>,
  <sbb-toggle-option disabled={args.disabled} icon-name={args.iconName} value={args.value2}>
    option-2
  </sbb-toggle-option>,
];

const DefaultTemplate = (args) => <sbb-toggle {...args}>{toggleOption(args)}</sbb-toggle>;

export const sbbToggle = DefaultTemplate.bind({});
sbbToggle.args = { ...defaultArgs, value1: 'option-1', value2: 'option-2' };
sbbToggle.argTypes = { ...defaultArgTypes, value1, value2 };
sbbToggle.documentation = {
  title: 'sbb-toggle',
};

export const sbbToggleDisabled = DefaultTemplate.bind({});
sbbToggleDisabled.args = { ...defaultArgs, disabled: true, value1: 'option-1', value2: 'option-2' };
sbbToggleDisabled.argTypes = { ...defaultArgTypes, value1, value2 };
sbbToggleDisabled.documentation = {
  title: 'sbb-toggle disabled',
};

export const sbbToggleFixedWidth = DefaultTemplate.bind({});
sbbToggleFixedWidth.args = { ...defaultArgs, even: true, value1: 'option-1', value2: 'option-2' };
sbbToggleFixedWidth.argTypes = { ...defaultArgTypes, value1, value2 };
sbbToggleFixedWidth.documentation = {
  title: 'sbb-toggle fixed width',
};

export const sbbToggleWithIcons = DefaultTemplate.bind({});
sbbToggleWithIcons.args = {
  ...defaultArgs,
  value1: 'option-1',
  value2: 'option-2',
  iconName: 'arrow-right-small',
};
sbbToggleWithIcons.argTypes = { ...defaultArgTypes, iconName, value1, value2 };
sbbToggleWithIcons.documentation = {
  title: 'sbb-toggle with custom icon',
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
