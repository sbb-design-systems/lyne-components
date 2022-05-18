import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './sbb-timetable-platform.sample-data';

const Template = (args) => (
  <sbb-timetable-platform
    appearance={args.appearance}
    config={JSON.stringify(args.config)}
  >
  </sbb-timetable-platform>
);

const appearance = {
  control: {
    type: 'select'
  },
  options: [
    'first-level',
    'second-level-arrival',
    'second-level-departure'
  ]
};

const config = {
  table: {
    disable: false
  }
};

const defaultArgTypes = {
  appearance,
  config
};

const defaultArgs = {
  appearance: appearance.options[0]
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const SbbTimetablePlatformFirstLevel = Template.bind({});

SbbTimetablePlatformFirstLevel.argTypes = defaultArgTypes;
SbbTimetablePlatformFirstLevel.args = {
  ...defaultArgs,
  config: sampleData[0]
};

SbbTimetablePlatformFirstLevel.documentation = {
  title: 'SBB Timetable Platform - First Level'
};

export const SbbTimetableArrivalPlatformSecondLevel = Template.bind({});

SbbTimetableArrivalPlatformSecondLevel.argTypes = defaultArgTypes;
SbbTimetableArrivalPlatformSecondLevel.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  config: sampleData[0]
};

SbbTimetableArrivalPlatformSecondLevel.documentation = {
  title: 'SBB Timetable Arrival Platform - Second Level'
};

export const SbbTimetableDeparturePlatformSecondLevel = Template.bind({});

SbbTimetableDeparturePlatformSecondLevel.argTypes = defaultArgTypes;
SbbTimetableDeparturePlatformSecondLevel.args = {
  ...defaultArgs,
  appearance: appearance.options[2],
  config: sampleData[0]
};

SbbTimetableDeparturePlatformSecondLevel.documentation = {
  title: 'SBB Timetable Departure Platform - Second Level'
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
  title: 'internals/sbb-timetable-platform'
};
