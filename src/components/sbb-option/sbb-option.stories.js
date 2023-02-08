import { h } from 'jsx-dom';
import readme from './readme.md';

const iconName = {
  control: {
    type: 'text',
  },
};

const value = {
  control: {
    type: 'text',
  },
};

const selected = {
  control: {
    type: 'boolean',
  },
};

const preserveIconSpace = {
  control: 'inline-radio',
  options: ['true', 'false'],
};

const defaultArgTypes = {
  value,
  'icon-name': iconName,
  selected,
  'preserve-icon-space': preserveIconSpace,
};

const defaultArgs = {
  value: 'First value',
  'icon-name': 'clock-small',
  selected: false,
  'preserve-icon-space': 'true',
};

const Template = ({ value, ...args }) => (
  <div style="border: 1px solid cyan">
    <sbb-option {...args}>{value}</sbb-option>
  </div>
);

export const Basic = Template.bind({});
Basic.argTypes = defaultArgTypes;
Basic.args = { ...defaultArgs };

export const NoIcon = Template.bind({});
NoIcon.argTypes = defaultArgTypes;
NoIcon.args = { ...defaultArgs, 'icon-name': '' };

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
      handles: ['click'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/autocomplete/sbb-option',
};
