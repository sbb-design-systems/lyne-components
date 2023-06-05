import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './sbb-timetable-row-header.sample-data';

const Template = (args) => (
  <sbb-timetable-row-header config={JSON.stringify(args.config)}></sbb-timetable-row-header>
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
export const SbbTimetableRowHeader = Template.bind({});

SbbTimetableRowHeader.argTypes = defaultArgTypes;
SbbTimetableRowHeader.args = {
  config: sampleData[0],
};

SbbTimetableRowHeader.documentation = {
  title: 'SBB Timetable Row Header',
};

export default {
  decorators: [(Story) => <Story />],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'internals/sbb-timetable-row-header',
};
