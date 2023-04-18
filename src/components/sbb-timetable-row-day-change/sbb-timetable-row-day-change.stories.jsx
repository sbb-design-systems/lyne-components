import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './sbb-timetable-row-day-change.sample-data';

const Template = (args) => (
  <sbb-timetable-row-day-change config={JSON.stringify(args.config)}></sbb-timetable-row-day-change>
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
export const currentDayHidden = Template.bind({});

currentDayHidden.argTypes = defaultArgTypes;
currentDayHidden.args = {
  config: sampleData[0],
};

currentDayHidden.documentation = {
  title: 'Current Day Hidden',
};

export const currentDayVisible = Template.bind({});

currentDayVisible.argTypes = defaultArgTypes;
currentDayVisible.args = {
  config: sampleData[1],
};

currentDayVisible.documentation = {
  title: 'Current Day Visible',
};

export const dayChange = Template.bind({});

dayChange.argTypes = defaultArgTypes;
dayChange.args = {
  config: sampleData[2],
};

dayChange.documentation = {
  title: 'Day Change',
};

export default {
  decorators: [(Story) => <Story />],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'internals/sbb-timetable-row-day-change',
};
