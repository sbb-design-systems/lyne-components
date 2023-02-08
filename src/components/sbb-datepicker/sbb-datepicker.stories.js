import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => [
  <sbb-form-field size="m" label="Label" optional={false} borderless={false} width="collapse">
    <sbb-datepicker-previous-day />
    <sbb-datepicker-next-day />
    <sbb-datepicker-toggle />
    <sbb-datepicker {...args} onChange={(event) => changeEventHandler(event)}></sbb-datepicker>
  </sbb-form-field>,
  <div id="container-value"></div>,
];

const changeEventHandler = (event) => {
  const div = document.createElement('div');
  div.innerText = `value is: ${event.target.value}; valueAsDate is: ${event.target.valueAsDate}.`;
  document.getElementById('container-value').append(div);
};

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
