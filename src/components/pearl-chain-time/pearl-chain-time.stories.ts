import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import isChromatic from 'chromatic/isChromatic';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../storybook/helpers/spread.js';
import { extendedLeg, progressLeg } from '../pearl-chain/pearl-chain.sample-data.js';

import readme from './readme.md?raw';
import './pearl-chain-time.js';

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
  now,
};

const defaultArgs: Args = {
  legs: [progressLeg],
  'arrival-time': '2022-12-11T14:11:00',
  'departure-time': '2022-12-11T12:11:00',
  'disable-animation': isChromatic(),
  now: new Date('2022-12-01T12:11:00').valueOf(),
};

const Template = ({ legs, ...args }: Args): TemplateResult =>
  html`<sbb-pearl-chain-time .legs=${legs} ${sbbSpread(args)}></sbb-pearl-chain-time>`;

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
    now: new Date('2022-12-05T12:11:00').valueOf(),
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
    now: new Date('2022-12-05T12:11:00').valueOf(),
    legs: [extendedLeg],
  },
};

const meta: Meta = {
  decorators: [(story) => html` <div style="max-width: 20rem;">${story()}</div> `],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'timetable/sbb-pearl-chain-time',
};

export default meta;
