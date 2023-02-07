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

const preserveIconSpace = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes = {
  value,
  'icon-name': iconName,
  'preserve-icon-space': preserveIconSpace,
};

const defaultArgs = {
  value: 'First value',
  'icon-name': 'clock-small',
  'preserve-icon-space': true,
};

const Template = ({ value, ...args }) => (
  <div style="border: 1px solid">
    <sbb-option {...args}>{value}</sbb-option>
  </div>
);

export const Basic = Template.bind({});
Basic.argTypes = defaultArgTypes;
Basic.args = { ...defaultArgs };

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
