import { h } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';
import { progressLeg } from '../sbb-pearl-chain/sbb-pearl-chain.sample-data';

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

const now = {
  control: {
    type: 'date',
  },
};

const defaultArgTypes = {
  'departure-walk': departureWalk,
  'arrival-walk': arrivalWalk,
  'disable-animation': disableAnimation,
  'data-now': now,
};

const defaultArgs = {
  legs: [progressLeg],
  'disable-animation': isChromatic(),
  'data-now': undefined,
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
  legs: [progressLeg],
  'data-now': new Date().valueOf(),
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
