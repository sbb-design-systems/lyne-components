import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';
import { SbbCalendarElement, type SbbMonthChangeEvent } from '../calendar.ts';
import { defaultDateAdapter } from '../core.ts';

import { createPrice, monthChangeHandler } from './calendar-day/calendar-day.helper.private.ts';
import readme from './readme.md?raw';

const today = new Date();
today.setDate(today.getDate() >= 15 ? 8 : 18);

const getCalendarAttr = (min: number | string, max: number | string): Record<string, string> => {
  const attr: Record<string, string> = {};
  if (min) {
    attr.min = defaultDateAdapter.toIso8601(new Date(min));
  }
  if (max) {
    attr.max = defaultDateAdapter.toIso8601(new Date(max));
  }
  return attr;
};

const getValueForTemplate = (multiple: boolean, value: Date | Date[]): Date | Date[] => {
  if (multiple) {
    if (!Array.isArray(value)) {
      value = [new Date(value)];
    } else {
      value = value.map((e) => new Date(e));
    }
  } else {
    if (Array.isArray(value)) {
      value = new Date(value[0]);
    } else {
      value = new Date(value);
    }
  }
  return value;
};

const Template = ({
  min,
  max,
  multiple,
  value,
  dateFilter,
  amount,
  ...args
}: Args): TemplateResult => {
  if (value) {
    value = getValueForTemplate(multiple, value);
  }
  return html`
    <sbb-calendar
      ?multiple=${multiple}
      .value=${value}
      .dateFilter="${dateFilter}"
      amount=${amount}
      ${sbbSpread(getCalendarAttr(min, max))}
      ${sbbSpread(args)}
    ></sbb-calendar>
  `;
};

const EnhancedTemplate = ({
  min,
  max,
  multiple,
  value,
  dateFilter,
  withPrice,
  amount,
  ...args
}: Args): TemplateResult => {
  if (value) {
    value = getValueForTemplate(multiple, value);
  }
  return html`
    <sbb-calendar
      ?multiple=${multiple}
      .value=${value}
      .dateFilter="${dateFilter}"
      amount=${amount}
      ${sbbSpread(getCalendarAttr(min, max))}
      ${sbbSpread(args)}
      @monthchange=${(e: SbbMonthChangeEvent) => monthChangeHandler(e, withPrice)}
    >
    </sbb-calendar>
  `;
};

const MixedTemplate = ({
  min,
  max,
  multiple,
  value,
  dateFilter,
  withPrice,
  amount,
  ...args
}: Args): TemplateResult => {
  if (value) {
    value = getValueForTemplate(multiple, value);
  }
  return html`
    <sbb-calendar
      ?multiple=${multiple}
      .value=${value}
      .dateFilter="${dateFilter}"
      amount=${amount}
      ${sbbSpread(getCalendarAttr(min, max))}
      ${sbbSpread(args)}
    >
      <sbb-calendar-day slot=${defaultDateAdapter.toIso8601(today)}>
        ${createPrice(withPrice)}
      </sbb-calendar-day>
      <sbb-calendar-day
        slot=${defaultDateAdapter.toIso8601(defaultDateAdapter.addCalendarDays(today, -5))}
      >
        ${createPrice(withPrice)}
      </sbb-calendar-day>
      <sbb-calendar-day
        slot=${defaultDateAdapter.toIso8601(defaultDateAdapter.addCalendarDays(today, 10))}
      >
        ${createPrice(withPrice)}
      </sbb-calendar-day>
    </sbb-calendar>
  `;
};

const amount: InputType = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Calendar',
  },
};

const weekNumbers: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Calendar',
  },
};

const multiple: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Calendar',
  },
};

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'] satisfies SbbCalendarElement['orientation'][],
  table: {
    category: 'Calendar',
  },
};

const value: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Calendar',
  },
};

const min: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Date filters',
  },
};

const max: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Date filters',
  },
};

const view: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['day', 'month', 'year'] satisfies SbbCalendarElement['view'][],
};

const filterFunctions = [
  undefined,
  (d: Date): boolean => d.getDay() !== 6 && d.getDay() !== 0,
  (d: Date): boolean => d.getDate() % 2 === 1,
  (d: Date): boolean => d.getFullYear() % 2 === 0,
  (d: Date): boolean => d.getMonth() > 6,
];
const dateFilter: InputType = {
  options: Object.keys(filterFunctions),
  mapping: filterFunctions,
  control: {
    type: 'select',
    labels: {
      0: 'No dateFilter function.',
      1: 'The dateFilter function includes only working days.',
      2: 'The dateFilter function excludes even days.',
      3: 'The dateFilter function excludes odd years.',
      4: 'The dateFilter function excludes months from January to July',
    },
  },
  table: {
    category: 'Date filters',
  },
};

const withPrice: InputType = {
  control: 'boolean',
  table: {
    category: 'Enhanced',
  },
};

const defaultArgTypes: ArgTypes = {
  amount,
  'week-numbers': weekNumbers,
  multiple,
  orientation,
  value,
  min,
  max,
  dateFilter,
  view,
};

const defaultArgs: Args = {
  amount: 1,
  orientation: orientation.options![0],
  value: today,
  view: view.options![0],
  'week-numbers': false,
  multiple: false,
};

const defaultArgTypesEnhanced: Args = {
  ...defaultArgTypes,
  withPrice,
};

const defaultArgsEnhanced: Args = {
  ...defaultArgs,
  withPrice: true,
};

export const Calendar: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs },
};

export const CalendarWithMinAndMax: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: {
    ...defaultArgs,
    min: new Date(today.getFullYear(), today.getMonth(), 5),
    max: new Date(today.getFullYear(), today.getMonth(), 29),
  },
};

export const CalendarFilterFunction: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes, dateFilter },
  args: {
    ...defaultArgs,
    dateFilter: dateFilter.options![2],
  },
};

export const CalendarWithInitialYearSelection: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, view: view.options![2] },
};

export const CalendarWeekNumbers: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, 'week-numbers': true },
};

export const CalendarWeekNumbersMultiple: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, 'week-numbers': true, multiple: true, value: [today] },
};

export const CalendarWide: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, amount: 2 },
};

export const CalendarWideWeekNumbers: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, amount: 2, 'week-numbers': true },
};

export const CalendarWideWeekNumbersMultiple: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, amount: 2, 'week-numbers': true, multiple: true, value: [today] },
};

export const CalendarVertical: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, orientation: orientation.options![1] },
};

export const CalendarVerticalWeekNumbers: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, orientation: orientation.options![1], 'week-numbers': true },
};

export const CalendarVerticalWeekNumbersMultiple: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: {
    ...defaultArgs,
    orientation: orientation.options![1],
    'week-numbers': true,
    multiple: true,
    value: [today],
  },
};

export const CalendarVerticalWide: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, orientation: orientation.options![1], amount: 2 },
};

export const CalendarVerticalWideWeekNumbers: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, orientation: orientation.options![1], amount: 2, 'week-numbers': true },
};

export const CalendarVerticalWideWeekNumbersMultiple: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: {
    ...defaultArgs,
    orientation: orientation.options![1],
    amount: 2,
    'week-numbers': true,
    multiple: true,
    value: [today],
  },
};

export const CalendarMixed: StoryObj = {
  render: MixedTemplate,
  argTypes: { ...defaultArgTypesEnhanced },
  args: { ...defaultArgsEnhanced, withPrice: true },
};

export const CalendarEnhanced: StoryObj = {
  render: EnhancedTemplate,
  argTypes: { ...defaultArgTypesEnhanced },
  args: { ...defaultArgsEnhanced },
};

export const CalendarEnhancedNoExtraContent: StoryObj = {
  render: EnhancedTemplate,
  argTypes: { ...defaultArgTypesEnhanced },
  args: { ...defaultArgs },
};

export const CalendarEnhancedVertical: StoryObj = {
  render: EnhancedTemplate,
  argTypes: { ...defaultArgTypesEnhanced },
  args: { ...defaultArgsEnhanced, orientation: orientation.options![1] },
};

export const CalendarEnhancedWide: StoryObj = {
  render: EnhancedTemplate,
  argTypes: { ...defaultArgTypesEnhanced },
  args: { ...defaultArgsEnhanced, amount: 2 },
};

export const CalendarEnhancedWideWeekNumbers: StoryObj = {
  render: EnhancedTemplate,
  argTypes: { ...defaultArgTypesEnhanced },
  args: { ...defaultArgsEnhanced, amount: 2, 'week-numbers': true },
};

export const CalendarEnhancedWideWeekNumbersMultiple: StoryObj = {
  render: EnhancedTemplate,
  argTypes: { ...defaultArgTypesEnhanced },
  args: {
    ...defaultArgsEnhanced,
    amount: 2,
    'week-numbers': true,
    multiple: true,
    value: [today],
  },
};

export const CalendarFixedMonth: StoryObj = {
  render: ({ amount }: Args) =>
    html`<sbb-calendar
      amount=${amount}
      fixed-month="2023-08"
      multiple
      week-numbers
    ></sbb-calendar>`,
  argTypes: { amount },
  args: { amount: 3 },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbCalendarElement.events.dateselected, SbbCalendarElement.events.monthchange],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Calendar',
};

export default meta;
