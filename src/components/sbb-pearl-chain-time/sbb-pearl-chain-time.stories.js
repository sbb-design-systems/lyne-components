import { h } from 'jsx-dom';
// import isChromatic from 'chromatic/isChromatic';
import readme from './readme.md';

const Template = (args) => {
  return <sbb-pearl-chain-time {...args} />;
};

export const minimal = Template.bind({});
export const departureWalk = Template.bind({});
export const arrivalWalk = Template.bind({});
export const maximal = Template.bind({});

minimal.args = {
  legs: [
    {
      duration: 300,
    },
  ],
  'departure-time': '2022-10-28T02:48:00+02:00',
  'arrival-time': '2022-10-28T12:48:00+02:00',
};

departureWalk.args = {
  legs: [
    {
      duration: 300,
    },
  ],
  'departure-time': '2022-10-28T02:48:00+02:00',
  'arrival-time': '2022-10-28T12:48:00+02:00',
  'departure-walk': '10',
};

arrivalWalk.args = {
  legs: [
    {
      duration: 300,
    },
  ],
  'departure-time': '2022-10-28T02:48:00+02:00',
  'arrival-time': '2022-10-28T12:48:00+02:00',
  'arrival-walk': '10',
};

maximal.args = {
  legs: [
    {
      duration: 300,
    },
  ],
  'departure-time': '2022-10-28T02:48:00+02:00',
  'arrival-time': '2022-10-28T12:48:00+02:00',
  'departure-walk': '10',
  'arrival-walk': '10',
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
  title: 'components/sbb-pearl-chain (Unfinished)/sbb-pearl-chain-time',
};
