import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import './mini-calendar-day.component.js';

const marker: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [null, 'circle', 'target', 'slash', 'cross'],
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [null, 'charcoal', 'cloud', 'orange', 'red', 'sky'],
};

const defaultArgTypes: ArgTypes = {
  marker,
  color,
};

const defaultArgs: Args = {
  marker: marker.options![0],
  color: color.options![0],
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-mini-calendar-day date="2025-08-15" ${sbbSpread(args)}></sbb-mini-calendar-day>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Circle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, marker: marker.options![1] },
};

export const Target: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, marker: marker.options![2] },
};

export const Slash: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, marker: marker.options![3] },
};

export const Cross: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, marker: marker.options![4] },
};

export const Charcoal: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![1] },
};

export const Cloud: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![2] },
};

export const Orange: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![3] },
};

export const Red: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![4] },
};

export const Sky: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![5] },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-mini-calendar/sbb-mini-calendar-day',
};

export default meta;
