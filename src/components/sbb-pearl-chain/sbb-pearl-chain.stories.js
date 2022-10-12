import { h } from 'jsx-dom';
import readme from './readme.md';
import data from './sbb-pearl-chain.sample-data';

const disableAnimation = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes = {
  'disable-animation': disableAnimation,
};

const Template = (args) => {
  return <sbb-pearl-chain legs={args.legs} />;
};

export const NoStops = Template.bind({});
NoStops.argTypes = defaultArgTypes;
NoStops.args = {
  legs: [
    {
      duration: 300,
    },
  ],
};
NoStops.documentation = {
  title: 'No stops',
};

export const ManyStops = Template.bind({});
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

export const Cancelled = Template.bind({});
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

export const CancelledManyStops = Template.bind({});
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

export const withData = Template.bind({});
withData.argTypes = defaultArgTypes;
withData.args = {
  legs: data,
};

export const Past = Template.bind({});
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
      <div style={'max-width: 20rem;'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/pearl-chains/sbb-pearl-chain',
};
