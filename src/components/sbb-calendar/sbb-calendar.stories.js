import events from './sbb-calendar.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const getCalendarAttr = (min, max) => {
  let attr = {};
  if (min) {
    attr.min = new Date(min);
  }
  if (max) {
    attr.max = new Date(max);
  }
  return attr;
};

const Template = ({ min, max, selectedDate, dateFilter, ...args }) => (
  <sbb-calendar
    selectedDate={new Date(selectedDate)}
    {...getCalendarAttr(min, max)}
    {...args}
    ref={(calendarRef) => {
      calendarRef.dateFilter = dateFilter;
    }}
  ></sbb-calendar>
);

const TemplateUnixTimestamp = ({ min, max, selectedDate, dateFilter, ...args }) => (
  <sbb-calendar
    min={min}
    max={max}
    selected-date={selectedDate}
    {...args}
    ref={(calendarRef) => {
      calendarRef.dateFilter = dateFilter;
    }}
  ></sbb-calendar>
);

const TemplateFilterFunction = ({ dateFilter, ...args }) => (
  <sbb-calendar
    ref={(calendarRef) => {
      calendarRef.dateFilter = dateFilter;
    }}
    {...args}
  ></sbb-calendar>
);

const wide = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Calendar',
  },
};

const selectedDate = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Calendar',
  },
};

const min = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Date filters',
  },
};

const max = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Date filters',
  },
};

const selectedDateAsString = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Calendar',
  },
};

const minAsString = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Date filters',
  },
};

const maxAsString = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Date filters',
  },
};

const filterFunctions = [
  () => true,
  (d) => d.getDay() !== 6 && d.getDay() !== 0,
  (d) => d.getDate() % 2 === 1,
];
const dateFilter = {
  options: Object.keys(filterFunctions),
  mapping: filterFunctions,
  control: {
    type: 'select',
    labels: {
      0: 'No dateFilter function.',
      1: 'The dateFilter function includes only working days.',
      2: 'The dateFilter function excludes even days.',
    },
  },
  table: {
    category: 'Date filters',
  },
};

const defaultArgTypes = {
  wide,
  selectedDate,
  min,
  max,
  dateFilter,
};

const defaultArgs = {
  wide: false,
  selectedDate: new Date(2023, 0, 20),
  dateFilter: dateFilter.options[0],
};

export const Calendar = Template.bind({});
Calendar.argTypes = { ...defaultArgTypes };
Calendar.args = { ...defaultArgs };

export const CalendarWithMinAndMax = Template.bind({});
CalendarWithMinAndMax.argTypes = { ...defaultArgTypes };
CalendarWithMinAndMax.args = {
  ...defaultArgs,
  min: new Date(2023, 0, 9),
  max: new Date(2023, 0, 29),
};

export const CalendarUnixTimestamp = TemplateUnixTimestamp.bind({});
CalendarUnixTimestamp.argTypes = {
  ...defaultArgTypes,
  min: minAsString,
  max: maxAsString,
  selectedDate: selectedDateAsString,
};
CalendarUnixTimestamp.args = {
  ...defaultArgs,
  min: '1672873200',
  max: '1674946800',
  selectedDate: '1673996400',
};

export const CalendarWide = Template.bind({});
CalendarWide.argTypes = { ...defaultArgTypes };
CalendarWide.args = { ...defaultArgs, wide: true };

export const CalendarFilterFunction = TemplateFilterFunction.bind({});
CalendarFilterFunction.argTypes = { ...defaultArgTypes, dateFilter };
CalendarFilterFunction.args = { ...defaultArgs, dateFilter: dateFilter.options[2] };

export default {
  parameters: {
    actions: {
      handles: [events.dateSelected],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-calendar',
};
