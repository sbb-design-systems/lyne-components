import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './sbb-timetable-barrier-free.sample-data';

const Template = (args) => (
  <sbb-timetable-barrier-free config={JSON.stringify(args.config)}></sbb-timetable-barrier-free>
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
export const BarrierFree = Template.bind({});

BarrierFree.argTypes = defaultArgTypes;
BarrierFree.args = {
  config: sampleData[0],
};

BarrierFree.documentation = {
  title: 'Barrier free',
};

export const BarrierFreePartially = Template.bind({});

BarrierFreePartially.argTypes = defaultArgTypes;
BarrierFreePartially.args = {
  config: sampleData[1],
};

BarrierFreePartially.documentation = {
  title: 'Partially barrier free',
};

export const BarrierFreeReservation = Template.bind({});

BarrierFreeReservation.argTypes = defaultArgTypes;
BarrierFreeReservation.args = {
  config: sampleData[2],
};

BarrierFreeReservation.documentation = {
  title: 'Barrier free on request',
};

export const nonBarrierFree = Template.bind({});

nonBarrierFree.argTypes = defaultArgTypes;
nonBarrierFree.args = {
  config: sampleData[3],
};

nonBarrierFree.documentation = {
  title: 'Non barrier free',
};

export const BarrierFreeUnkonwn = Template.bind({});

BarrierFreeUnkonwn.argTypes = defaultArgTypes;
BarrierFreeUnkonwn.args = {
  config: sampleData[4],
};

BarrierFreeUnkonwn.documentation = {
  title: 'Barrier free status unknown',
};

export default {
  decorators: [(Story) => <Story />],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'Internals/sbb-timetable-barrier-free',
};
