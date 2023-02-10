import events from './sbb-calendar.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-calendar {...args}></sbb-calendar>;

/*
  ref={(calendarRef) => {
      calendarRef.dateFilter = (d) => d.getDay() !== 6 && d.getDay() !== 0;
    }}
*/

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
};

export const calendar = Template.bind({});
export const calendarUnixTimestamp = Template.bind({});
export const calendarISOString = Template.bind({});

calendar.argTypes = {
  ...defaultArgTypes,
  min: {
    control: {
      type: 'date',
    },
  },
  max: {
    control: {
      type: 'date',
    },
  },
};

calendar.args = {
  ...defaultArgs,
  min: new Date(2023, 0, 9),
  max: new Date(2023, 0, 29),
};

calendarUnixTimestamp.argTypes = {
  ...defaultArgTypes,
  min: {
    control: {
      type: 'text',
    },
  },
  max: {
    control: {
      type: 'text',
    },
  },
};

calendarUnixTimestamp.args = {
  ...defaultArgs,
  min: new Date(2023, 0, 8),
  max: new Date(2023, 0, 29),
};

calendarISOString.args = {
  ...defaultArgs,
  min: new Date('2023-01-02T23:00:00.000Z'),
  max: new Date('2023-01-24T23:00:00.000Z'),
};

export default {
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: [events.dateSelected],
    },
  },
  backgrounds: {
    disable: true,
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/datepicker/sbb-calendar',
};
