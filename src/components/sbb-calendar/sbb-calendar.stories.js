import events from './sbb-calendar.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = ({ min, max, selectedDate, ...args }) => (
  <sbb-calendar
    min={new Date(min)}
    max={new Date(max)}
    selectedDate={new Date(selectedDate)}
    {...args}
  ></sbb-calendar>
);
const TemplateUnixTimestamp = ({ min, max, selectedDate, ...args }) => (
  <sbb-calendar min={min} max={max} selected-date={selectedDate} {...args}></sbb-calendar>
);
const TemplateFilterFunction = (args) => (
  <sbb-calendar
    ref={(calendarRef) => {
      calendarRef.dateFilter = (d) => d.getDay() !== 6 && d.getDay() !== 0;
    }}
    {...args}
  ></sbb-calendar>
);

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
export const calendarUnixTimestamp = TemplateUnixTimestamp.bind({});
export const calendarISOString = Template.bind({});
export const calendarWide = Template.bind({});
export const calendarFilterFunction = TemplateFilterFunction.bind({});

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
  selectedDate: {
    control: {
      type: 'text',
    },
  },
};

calendarUnixTimestamp.args = {
  ...defaultArgs,
  min: '1672873200',
  max: '1674946800',
  selectedDate: '1673996400',
};

calendarISOString.args = {
  ...defaultArgs,
  min: new Date('2023-01-02T23:00:00.000Z'),
  max: new Date('2023-01-24T23:00:00.000Z'),
};

calendarWide.argTypes = {
  ...defaultArgTypes,
};

calendarWide.args = {
  ...defaultArgs,
  wide: true,
};

calendarFilterFunction.argTypes = {
  ...defaultArgTypes,
};

calendarFilterFunction.args = {
  ...defaultArgs,
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
