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
export const LyneTimetableDepartureTimeFirstLevel = Template.bind({});

LyneTimetableDepartureTimeFirstLevel.argTypes = defaultArgTypes;
LyneTimetableDepartureTimeFirstLevel.args = {
  ...defaultArgs,
  config: sampleData[0]
};

LyneTimetableDepartureTimeFirstLevel.documentation = {
  title: 'Lyne Timetable Departure Time - First Level'
};

export const LyneTimetableArrivalTimeFirstLevel = Template.bind({});

LyneTimetableArrivalTimeFirstLevel.argTypes = defaultArgTypes;
LyneTimetableArrivalTimeFirstLevel.args = {
  ...defaultArgs,
  config: sampleData[1]
};

LyneTimetableArrivalTimeFirstLevel.documentation = {
  title: 'Lyne Timetable Arrival Time - First Level'
};

export const LyneTimetableDepartureTimeSecondLevel = Template.bind({});

LyneTimetableDepartureTimeSecondLevel.argTypes = defaultArgTypes;
LyneTimetableDepartureTimeSecondLevel.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  config: sampleData[2]
};

LyneTimetableDepartureTimeSecondLevel.documentation = {
  title: 'Lyne Timetable Departure Time - Second Level'
};

export const LyneTimetableArrivalTimeSecondLevel = Template.bind({});

LyneTimetableArrivalTimeSecondLevel.argTypes = defaultArgTypes;
LyneTimetableArrivalTimeSecondLevel.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  config: sampleData[3]
};

LyneTimetableArrivalTimeSecondLevel.documentation = {
  title: 'Lyne Timetable Arrival Time - Second Level'
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
  title: 'Timetable/lyne-timetable-transportation-time'
};
