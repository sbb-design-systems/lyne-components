import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './sbb-timetable-transportation-number.sample-data';

const Template = (args) => (
  <sbb-timetable-transportation-number
    appearance={args.appearance}
    config={JSON.stringify(args.config)}
  ></sbb-timetable-transportation-number>
);

const appearance = {
  control: {
    type: 'select',
  },
  options: ['first-level', 'second-level'],
};

const config = {
  table: {
    disable: false,
  },
};

const defaultArgTypes = {
  appearance,
  config,
};

const defaultArgs = {
  appearance: appearance.options[0],
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const BusFirstLevel = Template.bind({});

BusFirstLevel.argTypes = defaultArgTypes;
BusFirstLevel.args = {
  ...defaultArgs,
  config: sampleData.bus,
};

BusFirstLevel.documentation = {
  title: 'Bus - First Level',
};

export const BusSecondLevel = Template.bind({});

BusSecondLevel.argTypes = defaultArgTypes;
BusSecondLevel.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  config: sampleData.bus,
};

BusSecondLevel.documentation = {
  title: 'Bus - Second Level',
};

export const CableCarFirstLevel = Template.bind({});

CableCarFirstLevel.argTypes = defaultArgTypes;
CableCarFirstLevel.args = {
  ...defaultArgs,
  config: sampleData.cableCar,
};

CableCarFirstLevel.documentation = {
  title: 'Cable Car - First Level',
};

export const CableCarSecondLevel = Template.bind({});

CableCarSecondLevel.argTypes = defaultArgTypes;
CableCarSecondLevel.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  config: sampleData.cableCar,
};

CableCarSecondLevel.documentation = {
  title: 'Cable Car - Second Level',
};

export const TrainFirstLevel = Template.bind({});

TrainFirstLevel.argTypes = defaultArgTypes;
TrainFirstLevel.args = {
  ...defaultArgs,
  config: sampleData.train,
};

TrainFirstLevel.documentation = {
  title: 'Train - First Level',
};

export const TrainSecondLevel = Template.bind({});

TrainSecondLevel.argTypes = defaultArgTypes;
TrainSecondLevel.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  config: sampleData.train,
};

TrainSecondLevel.documentation = {
  title: 'Train - Second Level',
};

export const TramFirstLevel = Template.bind({});

TramFirstLevel.argTypes = defaultArgTypes;
TramFirstLevel.args = {
  ...defaultArgs,
  config: sampleData.tram,
};

TramFirstLevel.documentation = {
  title: 'Tram - First Level',
};

export const TramSecondLevel = Template.bind({});

TramSecondLevel.argTypes = defaultArgTypes;
TramSecondLevel.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  config: sampleData.tram,
};

TramSecondLevel.documentation = {
  title: 'Tram - Second Level',
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
  title: 'internals/sbb-timetable-transportation-number',
};
