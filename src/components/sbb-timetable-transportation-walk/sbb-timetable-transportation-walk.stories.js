import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './sbb-timetable-transportation-walk.sample-data';

const Template = (args) => (
  <sbb-timetable-transportation-walk
    appearance={args.appearance}
    config={JSON.stringify(args.config)}
  >
  </sbb-timetable-transportation-walk>
);

const appearance = {
  control: {
    type: 'select'
  },
  options: [
    'first-level',
    'second-level'
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
export const SbbTimetableTransportationDepartureWalk = Template.bind({});

SbbTimetableTransportationDepartureWalk.argTypes = defaultArgTypes;
SbbTimetableTransportationDepartureWalk.args = {
  ...defaultArgs,
  config: sampleData[0]
};

SbbTimetableTransportationDepartureWalk.documentation = {
  title: 'SBB Timetable Departure Walk'
};

export const SbbTimetableTransportationArrivalWalk = Template.bind({});

SbbTimetableTransportationArrivalWalk.argTypes = defaultArgTypes;
SbbTimetableTransportationArrivalWalk.args = {
  ...defaultArgs,
  config: sampleData[1]
};

SbbTimetableTransportationArrivalWalk.documentation = {
  title: 'SBB Timetable Departure Walk'
};

export const SbbTimetableTransportationWalkSecondLevel = Template.bind({});

SbbTimetableTransportationWalkSecondLevel.argTypes = defaultArgTypes;
SbbTimetableTransportationWalkSecondLevel.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  config: sampleData[3]
};

SbbTimetableTransportationWalkSecondLevel.documentation = {
  title: 'SBB Timetable Walk - Second Level'
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
  title: 'internals/sbb-timetable-transportation-walk'
};
