import { h } from 'jsx-dom';
// import isChromatic from 'chromatic/isChromatic';
import readme from './readme.md';
import data from './sbb-pearl-chain-vertical.sample-data';
const Template = (args) => {
  return <sbb-pearl-chain-vertical legs={args.legs} dot-variant={args.dotVariant} />;
};

const dotVariant = {
  control: {
    type: 'select',
  },
  options: ['departure', 'arrival', 'transfer'],
};

export const NoStops = Template.bind({});
export const DepartureLeg = Template.bind({});
export const ArrivalLeg = Template.bind({});
export const TransferLeg = Template.bind({});
export const ManyStops = Template.bind({});
export const Cancelled = Template.bind({});
export const CancelledManyStops = Template.bind({});
export const withData = Template.bind({});
export const Past = Template.bind({});

const defaultArgTypes = {
  dotVariant,
};

withData.argTypes = defaultArgTypes;
withData.args = {
  legs: data,
};

DepartureLeg.argTypes = defaultArgTypes;
DepartureLeg.args = {
  legs: [
    {
      duration: 300,
    },
  ],
};

TransferLeg.argTypes = defaultArgTypes;
TransferLeg.args = {
  legs: [
    {
      duration: 300,
    },
  ],
  dotVariant: dotVariant.options[2],
};

ArrivalLeg.argTypes = defaultArgTypes;
ArrivalLeg.args = {
  legs: [
    {
      duration: 300,
    },
  ],
  dotVariant: dotVariant.options[1],
};

NoStops.argTypes = defaultArgTypes;
NoStops.documentation = {
  title: 'No stops',
};

NoStops.argTypes = defaultArgTypes;
NoStops.args = {
  legs: [
    {
      duration: 300,
    },
  ],
};

ManyStops.argTypes = defaultArgTypes;
ManyStops.args = {
  legs: [
    {
      duration: 300,
    },
    {
      duration: 300,
    },
    {
      duration: 300,
    },
    {
      duration: 300,
    },
  ],
};

Cancelled.argTypes = defaultArgTypes;
Cancelled.args = {
  legs: [
    {
      duration: 300,
      serviceJourney: {
        serviceAlteration: {
          cancelled: true,
        },
      },
    },
  ],
};

CancelledManyStops.argTypes = defaultArgTypes;
CancelledManyStops.args = {
  legs: [
    {
      duration: 300,
      serviceJourney: {
        serviceAlteration: {
          cancelled: false,
        },
      },
    },
    {
      duration: 300,
      serviceJourney: {
        serviceAlteration: {
          cancelled: false,
        },
      },
    },
    {
      duration: 211,
      serviceJourney: {
        serviceAlteration: {
          cancelled: true,
        },
      },
    },
    {
      duration: 300,
      serviceJourney: {
        serviceAlteration: {
          cancelled: true,
        },
      },
    },
    {
      duration: 300,
      serviceJourney: {
        serviceAlteration: {
          cancelled: false,
        },
      },
    },
  ],
};

Past.argTypes = defaultArgTypes;
Past.args = {
  legs: [
    {
      duration: 120,
      id: 'test',
      arrival: { time: '2022-08-16T05:00:00' },
      departure: { time: '2022-08-16T03:00:00' },
      serviceJourney: {
        serviceAlteration: {
          cancelled: false,
        },
      },
    },
    {
      duration: 600,
      id: 'test',
      arrival: { time: '2022-08-16T17:00:00' },
      departure: { time: '2022-08-16T08:00:00' },
      serviceJourney: {
        serviceAlteration: {
          cancelled: false,
        },
      },
    },
    {
      duration: 600,
      id: 'test',
      arrival: { time: '2022-08-16T17:00:00' },
      departure: { time: '2022-08-16T08:00:00' },
      serviceJourney: {
        serviceAlteration: {
          cancelled: false,
        },
      },
    },
  ],
};

export default {
  decorators: [
    (Story) => (
      <div style={'height: 10rem;'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-pearl-chain-vertical (Unfinished)',
};
