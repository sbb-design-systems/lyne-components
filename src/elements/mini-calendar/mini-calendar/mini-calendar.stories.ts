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

const createDays = (date: Date): TemplateResult => {
  const numDays = defaultDateAdapter.getNumDaysInMonth(date);
  const isoDate = defaultDateAdapter.toIso8601(date);
  return html`
    ${repeat(
      new Array(numDays),
      () => html` <sbb-mini-calendar-day date=${isoDate}></sbb-mini-calendar-day> `,
    )}
  `;
};

const Template = ({ year }: Args): TemplateResult => html`
  <sbb-mini-calendar>
    ${repeat(
      new Array(12),
      (_, index) => html`
        <sbb-mini-calendar-month date="${year}-${String(index + 1).padStart(2, '0')}">
          ${createDays(new Date(year, index))}
        </sbb-mini-calendar-month>
      `,
    )}
  </sbb-mini-calendar>
`;

const year: InputType = {
  control: {
    type: 'number',
  },
};

const defaultArgTypes: ArgTypes = {
  year,
};

const defaultArgs: Args = {
  year: 2025,
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
