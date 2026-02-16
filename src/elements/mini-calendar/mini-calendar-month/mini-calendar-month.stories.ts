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
