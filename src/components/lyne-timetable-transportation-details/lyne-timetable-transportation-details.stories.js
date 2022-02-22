import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-transportation-details.sample-data';

const Template = (args) => (
  <lyne-timetable-transportation-details
    config={JSON.stringify(args.config)}
  >
  </lyne-timetable-transportation-details>
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
export const LyneTimetableTransportationDetails = Template.bind({});

LyneTimetableTransportationDetails.argTypes = defaultArgTypes;
LyneTimetableTransportationDetails.args = {
  config: sampleData[0]
};

LyneTimetableTransportationDetails.documentation = {
  title: 'Minutes'
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
  title: 'internals/lyne-timetable-transportation-details'
};
