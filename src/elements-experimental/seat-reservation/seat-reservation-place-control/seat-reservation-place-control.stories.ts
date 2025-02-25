import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import { controlIcons } from './seat-reservation-place-control.js';

const name: InputType = {
  control: {
    type: 'select',
  },
  options: controlIcons,
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
  name,
  width,
  height,
  rotation,
  'graphic-rotation': graphicRotation,
  text,
  'text-rotation': textRotation,
};

const defaultArgs: Args = {
  name: controlIcons[0],
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
  args: { ...defaultArgs, text: '888', name: 'PLACE_SEAT_FREE' },
};

export const PLACE_SEAT_SELECTED: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, name: 'PLACE_SEAT_SELECTED' },
};

export const PLACE_SEAT_RESTRICTED: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, name: 'PLACE_SEAT_RESTRICTED' },
};

export const PLACE_SEAT_ALLOCATED: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '888', name: 'PLACE_SEAT_ALLOCATED' },
};

export const PLACE_BIKE_AVAILABLE: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '888', name: 'PLACE_BIKE_FREE' },
};

export const PLACE_BIKE_SELECTED: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, name: 'PLACE_BIKE_SELECTED' },
};

export const PLACE_BIKE_RESTRICTED: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '888', name: 'PLACE_BIKE_RESTRICTED' },
};

export const PLACE_BIKE_ALLOCATED: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '888', name: 'PLACE_BIKE_ALLOCATED' },
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
