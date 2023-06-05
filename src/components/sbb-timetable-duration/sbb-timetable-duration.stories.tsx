import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './sbb-timetable-duration.sample-data';

const Template = (args) => (
  <sbb-timetable-duration config={JSON.stringify(args.config)}></sbb-timetable-duration>
);

const config = {
  table: {
    disable: false,
  },
};

const defaultArgTypes = {
  config,
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const MinutesOnly = Template.bind({});

MinutesOnly.argTypes = defaultArgTypes;
MinutesOnly.args = {
  config: sampleData[0],
};

MinutesOnly.documentation = {
  title: 'Minutes',
};

export const OneHourOneMinute = Template.bind({});

OneHourOneMinute.argTypes = defaultArgTypes;
OneHourOneMinute.args = {
  config: sampleData[1],
};

OneHourOneMinute.documentation = {
  title: 'One Hour / One Minute',
};

export const HoursAndMinutes = Template.bind({});

HoursAndMinutes.argTypes = defaultArgTypes;
HoursAndMinutes.args = {
  config: sampleData[2],
};

HoursAndMinutes.documentation = {
  title: 'Hours and Minutes',
};

export default {
  decorators: [(Story) => <Story />],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'internals/sbb-timetable-duration',
};
