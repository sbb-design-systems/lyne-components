import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './sbb-timetable-transportation-details.sample-data';

const Template = (args) => (
  <sbb-timetable-transportation-details
    config={JSON.stringify(args.config)}
  ></sbb-timetable-transportation-details>
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
export const sbbTimetableTransportationDetails = Template.bind({});

sbbTimetableTransportationDetails.argTypes = defaultArgTypes;
sbbTimetableTransportationDetails.args = {
  config: sampleData[0],
};

sbbTimetableTransportationDetails.documentation = {
  title: 'Minutes',
};

export default {
  decorators: [(Story) => <Story />],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'internals/sbb-timetable-transportation-details',
};
