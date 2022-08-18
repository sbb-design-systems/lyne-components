import { h } from 'jsx-dom';
// import isChromatic from 'chromatic/isChromatic';
import readme from './readme.md';
import data from './sbb-pearl-chain.sample-data';
const Template = (args) => {
  return <sbb-pearl-chain legs={args.legs} />;
};

export const NoStops = Template.bind({});
export const ManyStops = Template.bind({});
export const Cancelled = Template.bind({});
export const CancelledManyStops = Template.bind({});
export const withData = Template.bind({});
export const Past = Template.bind({});

withData.args = {
  legs: data,
};

NoStops.documentation = {
  title: 'No stops',
};

NoStops.args = {
  legs: [
    {
      duration: 300,
    },
  ],
};

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

Past.args = {
  legs: [
    {
      duration: 120,
      id: 'test',
      arrival: { time: new Date('2022-08-16T05:00:00') },
      departure: { time: new Date('2022-08-16T03:00:00') },
      serviceJourney: {
        serviceAlteration: {
          cancelled: false,
        },
      },
    },
    {
      duration: 600,
      id: 'test',
      arrival: { time: new Date('2022-08-16T17:00:00') },
      departure: { time: new Date('2022-08-16T08:00:00') },
      serviceJourney: {
        serviceAlteration: {
          cancelled: false,
        },
      },
    },
    {
      duration: 600,
      id: 'test',
      arrival: { time: new Date('2022-08-16T17:00:00') },
      departure: { time: new Date('2022-08-16T08:00:00') },
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
  title: 'components/sbb-pearl-chain (Unfinished)',
};
