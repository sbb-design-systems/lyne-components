import events from './sbb-calendar.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic';

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

const dataNow = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Testing',
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
  'data-now': dataNow,
};

const today = new Date();
today.setDate(today.getDate() >= 15 ? 8 : 18);

const defaultArgs = {
  wide: false,
  selectedDate: isChromatic() ? new Date(2023, 0, 20) : today,
  dataNow: isChromatic() ? new Date(2023, 0, 12, 0, 0, 0).valueOf() : undefined,
};

export const Calendar = Template.bind({});
Calendar.argTypes = { ...defaultArgTypes };
Calendar.args = { ...defaultArgs };

export const CalendarWithMinAndMax = Template.bind({});
CalendarWithMinAndMax.argTypes = { ...defaultArgTypes };
CalendarWithMinAndMax.args = {
  ...defaultArgs,
  min: isChromatic() ? new Date(2023, 0, 9) : new Date(today.getFullYear(), today.getMonth(), 5),
  max: isChromatic() ? new Date(2023, 0, 29) : new Date(today.getFullYear(), today.getMonth(), 29),
};

export const CalendarWide = Template.bind({});
CalendarWide.argTypes = { ...defaultArgTypes };
CalendarWide.args = { ...defaultArgs, wide: true };

export const CalendarFilterFunction = TemplateFilterFunction.bind({});
CalendarFilterFunction.argTypes = { ...defaultArgTypes, dateFilter };
CalendarFilterFunction.args = {
  ...defaultArgs,
  // Workaround: On Chromatic mapping functions do not work, so assign function directly.
  // TODO: Check if condition can be removed after refactoring Chromatic generation @kyubisation
  dateFilter: isChromatic() ? filterFunctions[1] : dateFilter.options[2],
};

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
