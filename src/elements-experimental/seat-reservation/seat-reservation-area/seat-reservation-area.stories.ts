import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import { elementMountingOptions } from '../seat-reservation.js';

import readme from './readme.md?raw';

import './seat-reservation-area.component.js';

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
  options: ['LIGHT', 'DARK'],
};

const defaultArgTypes: ArgTypes = {
  width,
  height,
  rotation,
  mounting,
  background,
};

const defaultArgs: Args = {
  style: '--sbb-reservation-area-width: 100;--sbb-reservation-area-height: 50;',
  background: 'DARK',
  mounting: elementMountingOptions[0],
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation-area ${sbbSpread(args)}></sbb-seat-reservation-area>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const width32Height32: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    style: '--sbb-reservation-area-width: 32;--sbb-reservation-area-height: 32;',
  },
};

export const width160Height64: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    style: '--sbb-reservation-area-width: 160;--sbb-reservation-area-height: 64;',
  },
};

export const width64Height64Rotation45Deg: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    style:
      '--sbb-reservation-area-width: 64;--sbb-reservation-area-height: 64;--sbb-reservation-area-rotation: 45',
  },
};

export const backgroundLight: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, background: 'LIGHT' },
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
