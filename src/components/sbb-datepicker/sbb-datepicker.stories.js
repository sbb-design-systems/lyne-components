import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => [<sbb-datepicker {...args}></sbb-datepicker>];

export const Default = Template.bind({});

const defaultArgs = {
  wide: false,
  selectedDate: new Date(2023, 0, 20),
};

const defaultArgTypes = {
  wide: {
    control: {
      type: 'boolean',
    },
  },
  selectedDate: {
    control: {
      type: 'date',
    },
  },
  min: {
    control: {
      type: 'number',
    },
  },
  max: {
    control: {
      type: 'number',
    },
  },
};

Default.argTypes = {
  ...defaultArgTypes,
};

Default.args = {
  ...defaultArgs,
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
    actions: {},
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/datepicker/sbb-datepicker',
};
