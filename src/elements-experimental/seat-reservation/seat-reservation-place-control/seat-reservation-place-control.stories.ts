import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import { SbbSeatReservationPlaceControlElement } from './seat-reservation-place-control.js';

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['SEAT', 'BICYCLE'],
};

const state: InputType = {
  control: {
    type: 'select',
  },
  options: ['FREE', 'SELECTED', 'RESTRICTED', 'ALLOCATED'],
};

const width: InputType = {
  control: {
    type: 'number',
  },
};

const height: InputType = {
  control: {
    type: 'number',
  },
};

const rotation: InputType = {
  control: {
    type: 'number',
  },
};

const graphicRotation: InputType = {
  control: {
    type: 'number',
  },
};

const text: InputType = {
  control: {
    type: undefined,
  },
};

const textRotation: InputType = {
  control: {
    type: 'number',
  },
};

const defaultArgTypes: ArgTypes = {
  type,
  state,
  width,
  height,
  rotation,
  'graphic-rotation': graphicRotation,
  text,
  'text-rotation': textRotation,
};

const defaultArgs: Args = {
  type: 'SEAT',
  state: 'FREE',
  width: 2,
  height: 2,
  rotation: 0,
  'graphic-rotation': 0,
  text: '',
  'text-rotation': 0,
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation-place-control
    ${sbbSpread(args)}
  ></sbb-seat-reservation-place-control>`;

export const DEFAULT: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const placeSeatFree: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'SEAT', state: 'FREE' },
};

export const placeSeatFreeRotation90TextRotationMinus90: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    text: '123',
    type: 'SEAT',
    state: 'FREE',
    rotation: 90,
    'text-rotation': -90,
  },
};

export const placeSeatSelected: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'SEAT', state: 'SELECTED' },
};

export const placeSeatRestricted: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'SEAT', state: 'RESTRICTED' },
};

export const placeSeatAllocated: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'SEAT', state: 'ALLOCATED' },
};

export const placeBicycleAvailable: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'BICYCLE', state: 'FREE' },
};

export const placeBicycleSelected: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'BICYCLE', state: 'SELECTED' },
};

export const placeBicycleRestricted: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'BICYCLE', state: 'RESTRICTED' },
};

export const placeBicycleAllocated: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'BICYCLE', state: 'ALLOCATED' },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbSeatReservationPlaceControlElement.events.selectPlace],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-place-control',
};

export default meta;
