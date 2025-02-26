import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import {
  controlPlaceTypeOptions,
  controlPlaceStateOptions,
} from './seat-reservation-place-control.js';

const type: InputType = {
  control: {
    type: 'select',
  },
  options: controlPlaceTypeOptions,
};

const state: InputType = {
  control: {
    type: 'select',
  },
  options: controlPlaceStateOptions,
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
  type: controlPlaceTypeOptions[0],
  state: controlPlaceStateOptions[0],
  width: 3,
  height: 3,
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

export const PLACE_SEAT_FREE: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'SEAT', state: 'FREE' },
};

export const PLACE_SEAT_SELECTED: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'SEAT', state: 'SELECTED' },
};

export const PLACE_SEAT_RESTRICTED: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'SEAT', state: 'RESTRICTED' },
};

export const PLACE_SEAT_ALLOCATED: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'SEAT', state: 'ALLOCATED' },
};

export const PLACE_BIKE_AVAILABLE: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'BIKE', state: 'FREE' },
};

export const PLACE_BIKE_SELECTED: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'BIKE', state: 'SELECTED' },
};

export const PLACE_BIKE_RESTRICTED: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'BIKE', state: 'RESTRICTED' },
};

export const PLACE_BIKE_ALLOCATED: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'BIKE', state: 'ALLOCATED' },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-place-control',
};

export default meta;
