import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import { elementMountingOptions } from '../seat-reservation.js';

import readme from './readme.md?raw';

import './seat-reservation-area.js';

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

const mounting: InputType = {
  control: {
    type: 'select',
  },
  options: elementMountingOptions,
};

const background: InputType = {
  control: {
    type: 'select',
  },
  options: ['light', 'dark'],
};

const defaultArgTypes: ArgTypes = {
  width,
  height,
  rotation,
  mounting,
  background,
};

const defaultArgs: Args = {
  width: 6,
  height: 6,
  rotation: 0,
  background: 'dark',
  mounting: elementMountingOptions[0],
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation-area ${sbbSpread(args)}></sbb-seat-reservation-area>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const width2Height2: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, width: 2, height: 2 },
};

export const width10Height4: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, width: 10, height: 4 },
};

export const width4Height4Rotation45Deg: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, width: 4, height: 4, rotation: 45 },
};

export const backgroundLight: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, background: 'light' },
};

export const mountingUPPER_BORDER: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, mounting: 'UPPER_BORDER' },
};

export const mountingLOWER_BORDER: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, mounting: 'LOWER_BORDER' },
};

export const mountingUPPER_TO_LOWER_BORDER: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, mounting: 'UPPER_TO_LOWER_BORDER' },
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
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-area',
};

export default meta;
