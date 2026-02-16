import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';
import { defaultDateAdapter } from '../../core/datetime.ts';

import '../../tooltip.ts';
import './mini-calendar-day.component.ts';
import readme from './readme.md?raw';

const date: InputType = {
  control: {
    type: 'date',
  },
};

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

const withTooltip: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  date,
  marker,
  color,
  withTooltip,
};

const defaultArgs: Args = {
  date: new Date('08-15-2025'),
  marker: marker.options![0],
  color: color.options![0],
  withTooltip: false,
};

const Template = ({ date, withTooltip, ...args }: Args): TemplateResult => {
  date = new Date(date);
  const tooltipAttributes = withTooltip
    ? {
        'sbb-tooltip': defaultDateAdapter.format(date, { weekdayStyle: 'none' }),
        'sbb-tooltip-open-delay': 200,
      }
    : {};
  return html`
    <sbb-mini-calendar-day
      date="${defaultDateAdapter.toIso8601(date)}"
      ${sbbSpread({ ...args, ...tooltipAttributes })}
    ></sbb-mini-calendar-day>
  `;
};

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

export const WithTooltip: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, withTooltip: true },
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
