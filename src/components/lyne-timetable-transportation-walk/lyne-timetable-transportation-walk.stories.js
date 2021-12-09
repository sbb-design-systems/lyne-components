import { h } from 'jsx-dom';
import sampleData from './lyne-timetable-transportation-walk.sample-data';

const Template = (args) => (
  <lyne-timetable-transportation-walk
    config={JSON.stringify(args.config)}
    variant={args.variant}
  >
  </lyne-timetable-transportation-walk>
);

const config = {
  table: {
    disable: false
  }
};

const variant = {
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
  variant
};

const defaultArgs = {
  variant: variant.options[0]
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
