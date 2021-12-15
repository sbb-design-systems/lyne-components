import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-transportation-details.sample-data';

const Template = (args) => (
  <lyne-timetable-transportation-details
    config={JSON.stringify(args.config)}
    role={
      args.gridCellRole
        ? 'gridcell'
        : 'none'
    }
  >
  </lyne-timetable-transportation-details>
);

const gridCellRole = {
  control: {
    type: 'boolean'
  }
};

const config = {
  table: {
    disable: false
  }
};

const defaultArgTypes = {
  config,
  gridCellRole
};

const defaultArgs = {
  gridCellRole: true
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const LyneTimetableTransportationDetails = Template.bind({});

LyneTimetableTransportationDetails.argTypes = defaultArgTypes;
LyneTimetableTransportationDetails.args = {
  ...defaultArgs,
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
  title: 'Timetable/lyne-timetable-transportation-details'
};
