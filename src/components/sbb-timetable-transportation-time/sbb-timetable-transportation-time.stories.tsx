import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './sbb-timetable-transportation-time.sample-data';

const Template = (args) => (
  <sbb-timetable-transportation-time
    appearance={args.appearance}
    config={JSON.stringify(args.config)}
  ></sbb-timetable-transportation-time>
);

const appearance = {
  control: {
    type: 'select',
  },
  options: ['first-level', 'second-level'],
};

const config = {
  table: {
    disable: false,
  },
};

const defaultArgTypes = {
  appearance,
  config,
};

const defaultArgs = {
  appearance: appearance.options[0],
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const SbbTimetableDepartureTimeFirstLevel = Template.bind({});

SbbTimetableDepartureTimeFirstLevel.argTypes = defaultArgTypes;
SbbTimetableDepartureTimeFirstLevel.args = {
  ...defaultArgs,
  config: sampleData[0],
};

SbbTimetableDepartureTimeFirstLevel.documentation = {
  title: 'SBB Timetable Departure Time - First Level',
};

export const SbbTimetableArrivalTimeFirstLevel = Template.bind({});

SbbTimetableArrivalTimeFirstLevel.argTypes = defaultArgTypes;
SbbTimetableArrivalTimeFirstLevel.args = {
  ...defaultArgs,
  config: sampleData[1],
};

SbbTimetableArrivalTimeFirstLevel.documentation = {
  title: 'SBB Timetable Arrival Time - First Level',
};

export const SbbTimetableDepartureTimeSecondLevel = Template.bind({});

SbbTimetableDepartureTimeSecondLevel.argTypes = defaultArgTypes;
SbbTimetableDepartureTimeSecondLevel.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  config: sampleData[2],
};

SbbTimetableDepartureTimeSecondLevel.documentation = {
  title: 'SBB Timetable Departure Time - Second Level',
};

export const SbbTimetableArrivalTimeSecondLevel = Template.bind({});

SbbTimetableArrivalTimeSecondLevel.argTypes = defaultArgTypes;
SbbTimetableArrivalTimeSecondLevel.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  config: sampleData[3],
};

SbbTimetableArrivalTimeSecondLevel.documentation = {
  title: 'SBB Timetable Arrival Time - Second Level',
};

export default {
  decorators: [(Story) => <Story />],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'internals/sbb-timetable-transportation-time',
};
