import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-icon {...args}></sbb-icon>;

export const Default = Template.bind({});

const iconName = {
  control: {
    type: 'select',
  },
  options: [
    'app-icon-medium',
    'train-medium',
    'swisspass-medium',
    'pie-medium',
    'chevron-small-left-small',
  ],
};

const defaultArgTypes = {
  name: iconName,
};

Default.argTypes = defaultArgTypes;
Default.args = {
  name: iconName.options[0],
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
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-icon',
};
