import { h } from 'jsx-dom';
import readme from './readme.md';

const departureWalk = {
  control: {
    type: 'number',
  },
};

const arrivalWalk = {
  control: {
    type: 'number',
  },
};

const disableAnimation = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes = {
  'departure-walk': departureWalk,
  'arrival-walk': arrivalWalk,
  'disable-animation': disableAnimation,
};

const defaultArgs = {
  legs: [
    {
      duration: 300,
    },
  ],
  'departure-time': '2022-10-28T02:48:00+02:00',
  'arrival-time': '2022-10-28T12:48:00+02:00',
};

const Template = (args) => {
  return <sbb-pearl-chain-time {...args} />;
};

export const minimal = Template.bind({});
minimal.argTypes = defaultArgTypes;
minimal.args = {
  ...defaultArgs,
};

export const withDepartureWalk = Template.bind({});
withDepartureWalk.argTypes = defaultArgTypes;
withDepartureWalk.args = {
  ...defaultArgs,
  'departure-walk': '10',
};

export const withArrivalWalk = Template.bind({});
withArrivalWalk.argTypes = defaultArgTypes;
withArrivalWalk.args = {
  ...defaultArgs,
  'arrival-walk': '5',
};

export const maximal = Template.bind({});
maximal.argTypes = defaultArgTypes;
maximal.args = {
  ...defaultArgs,
  'departure-walk': '10',
  'arrival-walk': '5',
  legs: [
    {
      duration: 300,
      arrival: { time: '2022-10-20T13:00' },
      departure: { time: '2022-10-08T12:00' },
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
  title: 'components/timetable/pearl-chains/sbb-pearl-chain-time',
};
