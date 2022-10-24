import { h } from 'jsx-dom';
import readme from './readme.md';
import { formatDateForDepartureAndArrivalTime } from './sbb-pearl-chain-time.helper';
import { addDays, subDays } from 'date-fns';

const today = new Date();

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
  'departure-time': formatDateForDepartureAndArrivalTime(today.setHours(4, 48, 0, 0)),
  'arrival-time': formatDateForDepartureAndArrivalTime(today.setHours(14, 48, 0, 0)),
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
      arrival: {
        time: formatDateForDepartureAndArrivalTime(addDays(today, 4).setHours(15, 0, 0, 0)),
      },
      departure: {
        time: formatDateForDepartureAndArrivalTime(subDays(today, 12).setHours(14, 0, 0, 0)),
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
  title: 'components/timetable/pearl-chains/sbb-pearl-chain-time',
};
