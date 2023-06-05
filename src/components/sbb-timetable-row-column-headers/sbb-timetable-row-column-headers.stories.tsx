import { h } from 'jsx-dom';
import readme from './readme.md';

import sampleData from './sbb-timetable-row-column-headers.sample-data';

const Template = (args) => (
  <sbb-timetable-row-column-headers
    config={JSON.stringify(args.config)}
  ></sbb-timetable-row-column-headers>
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
export const SbbTimetableRowColumnHeaders = Template.bind({});

SbbTimetableRowColumnHeaders.argTypes = defaultArgTypes;
SbbTimetableRowColumnHeaders.args = {
  config: sampleData,
};

SbbTimetableRowColumnHeaders.documentation = {
  title: 'SBB Timetable Row Column Headers',
};

export default {
  decorators: [(Story) => <Story />],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'internals/sbb-timetable-row-column-headers',
};
