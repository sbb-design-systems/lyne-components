import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import type { InputType } from 'storybook/internal/types';

import readme from './readme.md?raw';

import './mini-calendar-month.component.ts';
import '../mini-calendar-day/mini-calendar-day.component.ts';
import '../mini-calendar/mini-calendar.component.ts';

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const marker: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [null, 'circle', 'target', 'slash', 'cross'],
  table: {
    category: 'Day',
  },
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [null, 'charcoal', 'cloud', 'orange', 'red', 'sky'],
  table: {
    category: 'Day',
  },
};

const defaultArgTypes: ArgTypes = {
  orientation,
  marker,
  color,
};

const defaultArgs: Args = {
  orientation: orientation.options![0],
  marker: marker.options![0],
  color: color.options![0],
};

const Template = ({ orientation, marker, color }: Args): TemplateResult => html`
  <sbb-mini-calendar orientation=${orientation}>
    <sbb-mini-calendar-month date="2025-01">
      ${repeat(
        new Array(31),
        (_, index) => html`
          <sbb-mini-calendar-day
            date=${`2025-01-${String(index + 1).padStart(2, '0')}`}
            color=${color}
            marker=${index > 11 && index < 19 ? marker : ''}
          ></sbb-mini-calendar-day>
        `,
      )}
    </sbb-mini-calendar-month>
  </sbb-mini-calendar>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs },
};

export const Vertical: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, orientation: orientation.options![1] },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-mini-calendar/sbb-mini-calendar-month',
};

export default meta;


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


import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';
import { defaultDateAdapter } from '../../core/datetime.ts';

import readme from './readme.md?raw';

import '../../tooltip.ts';
import '../mini-calendar-month/mini-calendar-month.component.ts';
import '../mini-calendar-day/mini-calendar-day.component.ts';
import './mini-calendar.component.ts';

const createDays = (year: number, month: number, withTooltip: boolean): TemplateResult => {
  const numDays = defaultDateAdapter.getNumDaysInMonth(new Date(year, month));
  return html`
    ${repeat(new Array(numDays), (_, index) => {
      const date = new Date(year, month, index + 1);
      const tooltipAttributes = withTooltip
        ? {
            'sbb-tooltip': defaultDateAdapter.format(date, { weekdayStyle: 'none' }),
            'sbb-tooltip-open-delay': 200,
          }
        : {};
      return html`
        <sbb-mini-calendar-day
          ${sbbSpread(tooltipAttributes)}
          date=${defaultDateAdapter.toIso8601(date)}
          marker=${defaultDateAdapter.getDayOfWeek(date) === 0 ||
          defaultDateAdapter.getDayOfWeek(date) === 6
            ? 'circle'
            : ''}
        ></sbb-mini-calendar-day>
      `;
    })}
  `;
};

const Template = ({ orientation, year, offset, withTooltip }: Args): TemplateResult => html`
  <sbb-mini-calendar orientation=${orientation}>
    ${repeat(new Array(13), (_, index) => {
      const realYear = index > 12 - 1 - offset ? year + 1 : year;
      const month = (index + offset) % 12;
      const date = `${realYear}-${String(month + 1).padStart(2, '0')}`;
      return html`
        <sbb-mini-calendar-month date=${date}>
          ${createDays(realYear, month, withTooltip)}
        </sbb-mini-calendar-month>
      `;
    })}
  </sbb-mini-calendar>
`;

const year: InputType = {
  control: {
    type: 'number',
  },
};

const offset: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [0, 3, 6, 9],
};

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const withTooltip: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  year,
  offset,
  orientation,
  withTooltip,
};

const defaultArgs: Args = {
  year: 2025,
  offset: offset.options![0],
  orientation: orientation.options![0],
  withTooltip: false,
};

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Vertical: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, orientation: orientation.options![1] },
};

export const Offset: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, offset: offset.options![1] },
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
  title: 'elements/sbb-mini-calendar/sbb-mini-calendar',
};

export default meta;
