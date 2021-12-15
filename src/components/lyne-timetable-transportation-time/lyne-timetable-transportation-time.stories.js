import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-transportation-time.sample-data';

const Template = (args) => (
  <lyne-timetable-transportation-time
    appearance={args.appearance}
    config={JSON.stringify(args.config)}
  >
  </lyne-timetable-transportation-time>
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
  config,
  appearance
};

const defaultArgs = {
  appearance: appearance.options[0]
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const LyneTimetableDepartureTime = Template.bind({});

LyneTimetableDepartureTime.argTypes = defaultArgTypes;
LyneTimetableDepartureTime.args = {
  ...defaultArgs,
  config: sampleData[0]
};

LyneTimetableDepartureTime.documentation = {
  title: 'Lyne Timetable Departure Time'
};

export const LyneTimetableArrivalTime = Template.bind({});

LyneTimetableArrivalTime.argTypes = defaultArgTypes;
LyneTimetableArrivalTime.args = {
  ...defaultArgs,
  config: sampleData[1]
};

LyneTimetableArrivalTime.documentation = {
  title: 'Lyne Timetable Arrival Time'
};

export const LyneTimetableDepartureTimeLevel2 = Template.bind({});

LyneTimetableDepartureTimeLevel2.argTypes = defaultArgTypes;
LyneTimetableDepartureTimeLevel2.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  config: sampleData[2]
};

LyneTimetableDepartureTimeLevel2.documentation = {
  title: 'Lyne Timetable Departure Time - Level 2'
};

export const LyneTimetableArrivalTimeLevel2 = Template.bind({});

LyneTimetableArrivalTimeLevel2.argTypes = defaultArgTypes;
LyneTimetableArrivalTimeLevel2.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  config: sampleData[3]
};

LyneTimetableArrivalTimeLevel2.documentation = {
  title: 'Lyne Timetable Arrival Time - Level 2'
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Timetable/lyne-timetable-transportation-time'
};
