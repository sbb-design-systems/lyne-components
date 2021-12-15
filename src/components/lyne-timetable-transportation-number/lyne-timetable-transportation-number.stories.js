import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-transportation-number.sample-data';

const Template = (args) => (
  <lyne-timetable-transportation-number
    config={JSON.stringify(args.config)}
    role={
      args.gridCellRole
        ? 'gridcell'
        : 'none'
    }
    appearance={args.appearance}
  >
  </lyne-timetable-transportation-number>
);

const config = {
  table: {
    disable: false
  }
};

const gridCellRole = {
  control: {
    type: 'boolean'
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
  gridCellRole,
  appearance
};

const defaultArgs = {
  gridCellRole: true,
  appearance: appearance.options[0]
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const BusFirstLevel = Template.bind({});

BusFirstLevel.argTypes = defaultArgTypes;
BusFirstLevel.args = {
  ...defaultArgs,
  config: sampleData.bus
};

BusFirstLevel.documentation = {
  title: 'Bus - First Level'
};

export const BusSecondLevel = Template.bind({});

BusSecondLevel.argTypes = defaultArgTypes;
BusSecondLevel.args = {
  ...defaultArgs,
  config: sampleData.bus,
  appearance: appearance.options[1]
};

BusSecondLevel.documentation = {
  title: 'Bus - Second Level'
};

export const CableCarFirstLevel = Template.bind({});

CableCarFirstLevel.argTypes = defaultArgTypes;
CableCarFirstLevel.args = {
  ...defaultArgs,
  config: sampleData.cableCar
};

CableCarFirstLevel.documentation = {
  title: 'Cable Car - First Level'
};

export const CableCarSecondLevel = Template.bind({});

CableCarSecondLevel.argTypes = defaultArgTypes;
CableCarSecondLevel.args = {
  ...defaultArgs,
  config: sampleData.cableCar,
  appearance: appearance.options[1]
};

CableCarSecondLevel.documentation = {
  title: 'Cable Car - Second Level'
};


export const TrainFirstLevel = Template.bind({});

TrainFirstLevel.argTypes = defaultArgTypes;
TrainFirstLevel.args = {
  ...defaultArgs,
  config: sampleData.train
};

TrainFirstLevel.documentation = {
  title: 'Train - First Level'
};

export const TrainSecondLevel = Template.bind({});

TrainSecondLevel.argTypes = defaultArgTypes;
TrainSecondLevel.args = {
  ...defaultArgs,
  config: sampleData.train,
  appearance: appearance.options[1]
};

TrainSecondLevel.documentation = {
  title: 'Train - Second Level'
};

export const TramFirstLevel = Template.bind({});

TramFirstLevel.argTypes = defaultArgTypes;
TramFirstLevel.args = {
  ...defaultArgs,
  config: sampleData.tram
};

TramFirstLevel.documentation = {
  title: 'Tram - First Level'
};

export const TramSecondLevel = Template.bind({});

TramSecondLevel.argTypes = defaultArgTypes;
TramSecondLevel.args = {
  ...defaultArgs,
  config: sampleData.tram,
  appearance: appearance.options[1]
};

TramSecondLevel.documentation = {
  title: 'Tram - Second Level'
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
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Timetable/lyne-timetable-transportation-number'
};
