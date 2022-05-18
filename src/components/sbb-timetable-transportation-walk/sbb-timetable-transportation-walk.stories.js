import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-transportation-walk.sample-data';

const Template = (args) => (
  <lyne-timetable-transportation-walk
    appearance={args.appearance}
    config={JSON.stringify(args.config)}
  >
  </lyne-timetable-transportation-walk>
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
export const LyneTimetableTransportationDepartureWalk = Template.bind({});

LyneTimetableTransportationDepartureWalk.argTypes = defaultArgTypes;
LyneTimetableTransportationDepartureWalk.args = {
  ...defaultArgs,
  config: sampleData[0]
};

LyneTimetableTransportationDepartureWalk.documentation = {
  title: 'Lyne Timetable Departure Walk'
};

export const LyneTimetableTransportationArrivalWalk = Template.bind({});

LyneTimetableTransportationArrivalWalk.argTypes = defaultArgTypes;
LyneTimetableTransportationArrivalWalk.args = {
  ...defaultArgs,
  config: sampleData[1]
};

LyneTimetableTransportationArrivalWalk.documentation = {
  title: 'Lyne Timetable Departure Walk'
};

export const LyneTimetableTransportationWalkSecondLevel = Template.bind({});

LyneTimetableTransportationWalkSecondLevel.argTypes = defaultArgTypes;
LyneTimetableTransportationWalkSecondLevel.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  config: sampleData[3]
};

LyneTimetableTransportationWalkSecondLevel.documentation = {
  title: 'Lyne Timetable Walk - Second Level'
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
  title: 'internals/lyne-timetable-transportation-walk'
};
