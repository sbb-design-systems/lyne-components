import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-transportation-time.sample-data';

const Template = (args) => (
  <lyne-timetable-transportation-time
    config={JSON.stringify(args.config)}
  >
  </lyne-timetable-transportation-time>
);

const config = {
  table: {
    disable: false
  }
};

const defaultArgTypes = {
  config
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const LyneTimetableDepartureTime = Template.bind({});

LyneTimetableDepartureTime.argTypes = defaultArgTypes;
LyneTimetableDepartureTime.args = {
  config: sampleData[0]
};

LyneTimetableDepartureTime.documentation = {
  title: 'Lyne Timetable Departure Time'
};

export const LyneTimetableArrivalTime = Template.bind({});

LyneTimetableArrivalTime.argTypes = defaultArgTypes;
LyneTimetableArrivalTime.args = {
  config: sampleData[1]
};

LyneTimetableArrivalTime.documentation = {
  title: 'Lyne Timetable Arrival Time'
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
