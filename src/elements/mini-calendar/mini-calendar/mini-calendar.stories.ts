import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import type { InputType } from 'storybook/internal/types';

import { defaultDateAdapter } from '../../core/datetime.js';

import readme from './readme.md?raw';

import './mini-calendar.component.js';
import '../mini-calendar-month/mini-calendar-month.component.js';
import '../mini-calendar-day/mini-calendar-day.component.js';

const createDays = (year: number, month: number): TemplateResult => {
  const numDays = defaultDateAdapter.getNumDaysInMonth(new Date(year, month));
  return html`
    ${repeat(new Array(numDays), (_, index) => {
      const date = new Date(year, month, index + 1);
      return html`
        <sbb-mini-calendar-day
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

const Template = ({ year, offset }: Args): TemplateResult => html`
  <sbb-mini-calendar>
    ${repeat(new Array(13), (_, index) => {
      const realYear = index > 12 - 1 - offset ? year + 1 : year;
      const month = (index + offset) % 12;
      const date = `${realYear}-${String(month + 1).padStart(2, '0')}`;
      return html`
        <sbb-mini-calendar-month date=${date}>
          ${createDays(realYear, month)}
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
  options: [0, 4, 8],
};

const defaultArgTypes: ArgTypes = {
  year,
  offset,
};

const defaultArgs: Args = {
  year: 2025,
  offset: 0,
};

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
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
