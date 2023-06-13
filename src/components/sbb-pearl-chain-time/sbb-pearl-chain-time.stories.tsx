/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic';
import { extendedLeg, progressLeg } from '../sbb-pearl-chain/sbb-pearl-chain.sample-data';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

const departureWalk: InputType = {
  control: {
    type: 'number',
  },
};

const arrivalWalk: InputType = {
  control: {
    type: 'number',
  },
};

const departureTime: InputType = {
  control: {
    type: 'text',
  },
};

const arrivalTime: InputType = {
  control: {
    type: 'text',
  },
};

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
};

const now: InputType = {
  control: {
    type: 'date',
  },
};

const defaultArgTypes: ArgTypes = {
  'departure-walk': departureWalk,
  'arrival-walk': arrivalWalk,
  'arrival-time': arrivalTime,
  'departure-time': departureTime,
  'disable-animation': disableAnimation,
  'data-now': now,
};

const defaultArgs: Args = {
  legs: [progressLeg],
  'arrival-time': '2022-12-11T14:11:00',
  'departure-time': '2022-12-11T12:11:00',
  'disable-animation': isChromatic(),
  'data-now': new Date('2022-12-01T12:11:00').valueOf(),
};

const Template = (args): JSX.Element => {
  return <sbb-pearl-chain-time {...args} />;
};

export const minimal: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const withDepartureWalk: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'departure-walk': '10',
  },
};

export const withArrivalWalk: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'arrival-walk': '5',
  },
};

export const mixed: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'departure-walk': '0',
    'arrival-walk': '5',
    'data-now': new Date('2022-12-05T12:11:00').valueOf(),
    legs: [progressLeg],
  },
};

export const extendedEnter: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'departure-walk': '10',
    'arrival-walk': '5',
    'data-now': new Date('2022-12-05T12:11:00').valueOf(),
    legs: [extendedLeg],
  },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ 'max-width': '20rem' }}>
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

export default meta;
