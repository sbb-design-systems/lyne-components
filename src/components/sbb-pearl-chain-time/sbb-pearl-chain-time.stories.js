import { h } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';
import { extendedLeg, progressLeg } from '../sbb-pearl-chain/sbb-pearl-chain.sample-data';

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

const departureTime = {
  control: {
    type: 'text',
  },
};

const arrivalTime = {
  control: {
    type: 'text',
  },
};

const disableAnimation = {
  control: {
    type: 'boolean',
  },
};

const now = {
  control: {
    type: 'date',
  },
};

const defaultArgTypes = {
  'departure-walk': departureWalk,
  'arrival-walk': arrivalWalk,
  'arrival-time': arrivalTime,
  'departure-time': departureTime,
  'disable-animation': disableAnimation,
  'data-now': now,
};

const defaultArgs = {
  legs: [progressLeg],
  'arrival-time': '2022-12-11T14:11:00',
  'departure-time': '2022-12-11T12:11:00',
  'disable-animation': isChromatic(),
  'data-now': new Date('2022-12-01T12:11:00').valueOf(),
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

export const mixed = Template.bind({});
mixed.argTypes = defaultArgTypes;
mixed.args = {
  ...defaultArgs,
  'departure-walk': '0',
  'arrival-walk': '5',
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
  legs: [progressLeg],
};

export const extendedEnter = Template.bind({});
extendedEnter.argTypes = defaultArgTypes;
extendedEnter.args = {
  ...defaultArgs,
  'departure-walk': '10',
  'arrival-walk': '5',
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
  legs: [extendedLeg],
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
  title: 'components/timetable/sbb-pearl-chain-time',
};
