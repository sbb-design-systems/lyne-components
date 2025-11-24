import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';

import './seat-reservation-area.component.ts';

const mounting: InputType = {
  control: {
    type: 'select',
  },
  options: ['free', 'upper-border', 'lower-border', 'upper-to-lower-border'],
};

const background: InputType = {
  control: {
    type: 'select',
  },
  options: ['light', 'dark'],
};

const defaultArgTypes: ArgTypes = {
  mounting,
  background,
};

const defaultArgs: Args = {
  style: '--sbb-seat-reservation-area-width: 100;--sbb-seat-reservation-area-height: 50;',
  background: 'dark',
  mounting: 'free',
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
    style: '--sbb-seat-reservation-area-width: 32;--sbb-seat-reservation-area-height: 32;',
  },
};

export const width160Height64: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    style: '--sbb-seat-reservation-area-width: 160;--sbb-seat-reservation-area-height: 64;',
  },
};

export const width64Height64Rotation45Deg: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    style:
      '--sbb-seat-reservation-area-width: 64;--sbb-seat-reservation-area-height: 64;--sbb-seat-reservation-area-rotation: 45',
  },
};

export const backgroundLight: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, background: 'light' },
};

export const mountingUpperBorder: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, mounting: 'upper-border' },
};

export const mountingLowerBorder: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, mounting: 'lower-border' },
};

export const mountingUpperToLowerBorder: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, mounting: 'upper-to-lower-border' },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-area',
};

export default meta;
