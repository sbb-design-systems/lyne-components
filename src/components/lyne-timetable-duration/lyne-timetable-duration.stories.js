import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-duration.sample-data';

const Template = (args) => (
  <lyne-timetable-duration
    config={JSON.stringify(args.config)}
    role={
      args.gridCellRole
        ? 'gridcell'
        : 'none'
    }
  >
  </lyne-timetable-duration>
);

const gridCellRole = {
  control: {
    type: 'boolean'
  }
};

const config = {
  table: {
    disable: false
  }
};

const defaultArgTypes = {
  config,
  gridCellRole
};

const defaultArgs = {
  gridCellRole: true
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const MinutesOnly = Template.bind({});

MinutesOnly.argTypes = defaultArgTypes;
MinutesOnly.args = {
  ...defaultArgs,
  config: sampleData[0]
};

MinutesOnly.documentation = {
  title: 'Minutes'
};

export const OneHourOneMinute = Template.bind({});

OneHourOneMinute.argTypes = defaultArgTypes;
OneHourOneMinute.args = {
  ...defaultArgs,
  config: sampleData[1]
};

OneHourOneMinute.documentation = {
  title: 'One Hour / One Minute'
};

export const HoursAndMinutes = Template.bind({});

HoursAndMinutes.argTypes = defaultArgTypes;
HoursAndMinutes.args = {
  ...defaultArgs,
  config: sampleData[2]
};

HoursAndMinutes.documentation = {
  title: 'Hours and Minutes'
};

export default {
  decorators: [
    (Story) => (
      <Story/>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Timetable/lyne-timetable-duration'
};
