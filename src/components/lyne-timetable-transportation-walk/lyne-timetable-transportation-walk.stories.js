import { h } from 'jsx-dom';
import sampleData from './lyne-timetable-transportation-walk.sample-data';

const Template = (args) => (
  <lyne-timetable-transportation-walk
    config={JSON.stringify(args.config)}
    appearance={args.appearance}
  >
  </lyne-timetable-transportation-walk>
);

const config = {
  table: {
    disable: false
  }
};

const appearance = {
  control: {
    type: 'select'
  },
  options: [
    'first-level',
    'second-level'
  ]
};

const defaultArgTypes = {
  config,
  appearance
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

export const LyneTimetableTransportationWalkLevel2 = Template.bind({});

LyneTimetableTransportationWalkLevel2.argTypes = defaultArgTypes;
LyneTimetableTransportationWalkLevel2.args = {
  ...defaultArgs,
  config: sampleData[3],
  appearance: appearance.options[1]
};

LyneTimetableTransportationWalkLevel2.documentation = {
  title: 'Lyne Timetable Walk - Level 2'
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 1rem'}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Timetable/lyne-timetable-transportation-walk'
};
