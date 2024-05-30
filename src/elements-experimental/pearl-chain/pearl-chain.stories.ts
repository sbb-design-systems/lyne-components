import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import isChromatic from 'chromatic/isChromatic';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../storybook/helpers/spread.js';

import {
  cancelledLeg,
  progressLeg,
  pastLeg,
  futureLeg,
  longFutureLeg,
  redirectedOnDepartureLeg,
  redirectedOnArrivalLeg,
} from './pearl-chain.sample-data.js';
import readme from './readme.md?raw';
import './pearl-chain.js';

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
  'disable-animation': disableAnimation,
  'data-now': now,
};

const defaultArgs: Args = {
  'disable-animation': isChromatic(),
  'data-now': new Date('2022-12-01T12:11:00').valueOf(),
};

const Template = ({ legs, ...args }: Args): TemplateResult => {
  return html`<sbb-pearl-chain .legs=${legs} ${sbbSpread(args)}></sbb-pearl-chain>`;
};

export const NoStops: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [futureLeg],
  },
};

export const ManyStops: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [futureLeg, longFutureLeg, futureLeg, futureLeg],
  },
};

export const Cancelled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [cancelledLeg],
  },
};

export const CancelledManyStops: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [futureLeg, cancelledLeg, futureLeg, cancelledLeg],
  },
};

export const withPosition: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [progressLeg],
    'data-now': new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const Past: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [pastLeg, pastLeg],
    'data-now': new Date('2023-11-01T12:11:00').valueOf(),
  },
};

export const DepartureStopSkipped: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [pastLeg, progressLeg, longFutureLeg, redirectedOnDepartureLeg, futureLeg],
    'data-now': new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const ArrivalStopSkipped: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [pastLeg, progressLeg, longFutureLeg, redirectedOnArrivalLeg, futureLeg],
    'data-now': new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const FirstStopSkipped: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [redirectedOnDepartureLeg, futureLeg, longFutureLeg],
    'data-now': new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const LastStopSkipped: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [futureLeg, longFutureLeg, redirectedOnArrivalLeg],
    'data-now': new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const Mixed: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [pastLeg, progressLeg, longFutureLeg, cancelledLeg, futureLeg],
    'data-now': new Date('2022-12-05T12:11:00').valueOf(),
  },
};

const meta: Meta = {
  decorators: [(story) => html`<div style="max-width: 80%;">${story()}</div>`],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-pearl-chain',
};

export default meta;
