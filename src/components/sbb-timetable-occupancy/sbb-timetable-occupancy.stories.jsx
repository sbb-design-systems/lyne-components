import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './sbb-timetable-occupancy.sample-data';

const Template = (args) => (
  <sbb-timetable-occupancy config={JSON.stringify(args.config)}></sbb-timetable-occupancy>
);

const config = {
  table: {
    disable: false,
  },
};

const defaultArgTypes = {
  config,
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const NoneNoneOccupancy = Template.bind({});

NoneNoneOccupancy.argTypes = defaultArgTypes;
NoneNoneOccupancy.args = {
  config: sampleData[0],
};

NoneNoneOccupancy.documentation = {
  title: 'None/None Occupancy Information',
};

export const NonLowOccupancy = Template.bind({});

NonLowOccupancy.argTypes = defaultArgTypes;
NonLowOccupancy.args = {
  config: sampleData[1],
};

NonLowOccupancy.documentation = {
  title: 'None/None Occupancy Information',
};

export const LowLowOccupancy = Template.bind({});

LowLowOccupancy.argTypes = defaultArgTypes;
LowLowOccupancy.args = {
  config: sampleData[2],
};

LowLowOccupancy.documentation = {
  title: 'Low/Low Occupancy',
};

export const LowMediumOccupancy = Template.bind({});

LowMediumOccupancy.argTypes = defaultArgTypes;
LowMediumOccupancy.args = {
  config: sampleData[3],
};

LowMediumOccupancy.documentation = {
  title: 'Low/Medium Occupancy',
};

export const MediumMediumOccupancy = Template.bind({});

MediumMediumOccupancy.argTypes = defaultArgTypes;
MediumMediumOccupancy.args = {
  config: sampleData[4],
};

MediumMediumOccupancy.documentation = {
  title: 'Medium/Medium Occupancy',
};

export const LowHighOccupancy = Template.bind({});

LowHighOccupancy.argTypes = defaultArgTypes;
LowHighOccupancy.args = {
  config: sampleData[5],
};

LowHighOccupancy.documentation = {
  title: 'Low/High Occupancy',
};

export const MediumHighOccupancy = Template.bind({});

MediumHighOccupancy.argTypes = defaultArgTypes;
MediumHighOccupancy.args = {
  config: sampleData[6],
};

MediumHighOccupancy.documentation = {
  title: 'Medium/High Occupancy',
};

export const HighHighOccupancy = Template.bind({});

HighHighOccupancy.argTypes = defaultArgTypes;
HighHighOccupancy.args = {
  config: sampleData[7],
};

HighHighOccupancy.documentation = {
  title: 'High/High Occupancy',
};

export default {
  decorators: [(Story) => <Story />],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'internals/sbb-timetable-occupancy',
};
