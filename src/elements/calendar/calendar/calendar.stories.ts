import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';
import { defaultDateAdapter } from '../../core/datetime.ts';
import {
  createSlottedDays,
  monthChangeHandler,
} from '../calendar-day/calendar-day.helper.private.ts';

import type { SbbMonthChangeEvent } from './calendar.component.ts';
import { SbbCalendarElement } from './calendar.component.ts';
import readme from './readme.md?raw';

const today = new Date();
today.setDate(today.getDate() >= 15 ? 8 : 18);

const createDays = (wide: boolean, withPrice: boolean): TemplateResult => {
  const year = defaultDateAdapter.getYear(today);
  const month = defaultDateAdapter.getMonth(today);
  if (wide) {
    const todayNextMonth = defaultDateAdapter.addCalendarMonths(today, 1);
    const yearNextMonth = defaultDateAdapter.getYear(todayNextMonth);
    const nextMonth = defaultDateAdapter.getMonth(todayNextMonth);
    return html`
      ${createSlottedDays(year, month, withPrice)}
      ${createSlottedDays(yearNextMonth, nextMonth, withPrice)}
    `;
  } else {
    return createSlottedDays(year, month, withPrice);
  }
};

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

const Template = ({ min, max, multiple, selected, dateFilter, ...args }: Args): TemplateResult => {
  if (selected) {
    if (multiple) {
      if (!Array.isArray(selected)) {
        selected = [new Date(selected)];
      } else {
        selected = selected.map((e) => new Date(e));
      }
    } else {
      if (Array.isArray(selected)) {
        selected = new Date(selected[0]);
      } else {
        selected = new Date(selected);
      }
    }
  }
  return html`
    <sbb-calendar
      ?multiple=${multiple}
      .selected=${selected}
      .dateFilter="${dateFilter}"
      ${sbbSpread(getCalendarAttr(min, max))}
      ${sbbSpread(args)}
    ></sbb-calendar>
  `;
};

const EnhancedTemplate = ({
  min,
  max,
  multiple,
  selected,
  dateFilter,
  withPrice,
  ...args
}: Args): TemplateResult => {
  if (selected) {
    if (multiple) {
      if (!Array.isArray(selected)) {
        selected = [new Date(selected)];
      } else {
        selected = selected.map((e) => new Date(e));
      }
    } else {
      if (Array.isArray(selected)) {
        selected = new Date(selected[0]);
      } else {
        selected = new Date(selected);
      }
    }
  }
  return html`
    <sbb-calendar
      ?multiple=${multiple}
      .selected=${selected}
      .dateFilter="${dateFilter}"
      ${sbbSpread(getCalendarAttr(min, max))}
      ${sbbSpread(args)}
      @monthchange=${(e: SbbMonthChangeEvent) => monthChangeHandler(e, withPrice)}
      >${createDays(args.wide, withPrice)}</sbb-calendar
    >
  `;
};

const wide: InputType = {
  control: {
    type: 'boolean',
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
  options: ['horizontal', 'vertical'],
  table: {
    category: 'Calendar',
  },
};

const selected: InputType = {
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
  options: ['day', 'month', 'year'],
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
  wide,
  'week-numbers': weekNumbers,
  multiple,
  orientation,
  selected,
  min,
  max,
  dateFilter,
  view,
  withPrice,
};

const defaultArgs: Args = {
  wide: false,
  orientation: orientation.options![0],
  selected: today,
  view: view.options![0],
  'week-numbers': false,
  multiple: false,
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
  args: { ...defaultArgs, 'week-numbers': true, multiple: true, selected: [today] },
};

export const CalendarWide: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, wide: true },
};

export const CalendarWideWeekNumbers: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, wide: true, 'week-numbers': true },
};

export const CalendarWideWeekNumbersMultiple: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, wide: true, 'week-numbers': true, multiple: true, selected: [today] },
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
    selected: [today],
  },
};

export const CalendarVerticalWide: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, orientation: orientation.options![1], wide: true },
};

export const CalendarVerticalWideWeekNumbers: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, orientation: orientation.options![1], wide: true, 'week-numbers': true },
};

export const CalendarVerticalWideWeekNumbersMultiple: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: {
    ...defaultArgs,
    orientation: orientation.options![1],
    wide: true,
    'week-numbers': true,
    multiple: true,
    selected: [today],
  },
};

export const CalendarEnhanced: StoryObj = {
  render: EnhancedTemplate,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs },
};

export const CalendarEnhancedExtraContent: StoryObj = {
  render: EnhancedTemplate,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, withPrice: true },
};

export const CalendarEnhancedVertical: StoryObj = {
  render: EnhancedTemplate,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, orientation: orientation.options![1] },
};

export const CalendarEnhancedWide: StoryObj = {
  render: EnhancedTemplate,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, wide: true },
};

export const CalendarEnhancedWideWeekNumbers: StoryObj = {
  render: EnhancedTemplate,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, wide: true, 'week-numbers': true },
};

export const CalendarEnhancedWideWeekNumbersMultiple: StoryObj = {
  render: EnhancedTemplate,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, wide: true, 'week-numbers': true, multiple: true, selected: [today] },
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
  title: 'elements/sbb-calendar/sbb-calendar',
};

export default meta;
