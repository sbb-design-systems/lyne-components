import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components-vite';
import { html, nothing, type TemplateResult } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';
import { defaultDateAdapter } from '../../core/datetime.ts';
import type { SbbDateInputElement } from '../../date-input.ts';

import readme from './readme.md?raw';

import './datepicker.component.ts';
import '../datepicker-next-day.ts';
import '../datepicker-previous-day.ts';
import '../datepicker-toggle.ts';
import '../../date-input.ts';
import '../../form-field.ts';

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'date-input attribute',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'date-input attribute',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'date-input attribute',
  },
};

const required: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'date-input attribute',
  },
};

const form: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'date-input attribute',
  },
};

const min: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'date-input attribute',
  },
};

const max: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'date-input attribute',
  },
};

const filterFunctions = [
  () => true,
  (d: Date) => d.getDay() !== 6 && d.getDay() !== 0,
  (d: Date) => d.getDate() % 2 === 1,
  (d: Date) => d.getFullYear() % 2 === 0,
  (d: Date) => d.getMonth() > 6,
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
    category: 'date-input attribute',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'date-input attribute',
  },
};

const wide: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Datepicker attribute',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l'],
  table: {
    category: 'Form-field attribute',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const optional: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const basicArgTypes: ArgTypes = {
  value,
  form,
  disabled,
  readonly,
  required,
  min,
  max,
  wide,
  dateFilter,
  'aria-label': ariaLabel,
};

const basicArgs: Args = {
  value: `15.02.2023`,
  form: undefined,
  disabled: false,
  readonly: false,
  required: false,
  min: undefined,
  max: undefined,
  wide: false,
  dateFilter: dateFilter.options![0],
  'aria-label': undefined,
};

const formFieldBasicArgsTypes: ArgTypes = {
  ...basicArgTypes,
  label,
  size,
  negative,
  optional,
  borderless,
};

const formFieldBasicArgs = {
  ...basicArgs,
  label: 'Label',
  size: size.options![1],
  negative: false,
  optional: false,
  borderless: false,
};

const convertMillisecondsToIso8601 = (milliseconds: number): string | typeof nothing => {
  return milliseconds ? defaultDateAdapter.toIso8601(new Date(milliseconds)) : nothing;
};

const changeEventHandler = async (event: Event): Promise<void> => {
  const div = document.createElement('div');
  div.innerText = `valueAsDate is: ${(event.target as SbbDateInputElement).valueAsDate}.`;
  document.getElementById('container-value')?.append(div);
};

const Template = ({ min, max, wide, dateFilter, ...args }: Args): TemplateResult => {
  return html`
    <div style="display: flex; gap: 0.25rem;">
      <sbb-datepicker-previous-day input="datepicker-input"></sbb-datepicker-previous-day>
      <sbb-date-input
        ${sbbSpread(args)}
        id="datepicker-input"
        min=${convertMillisecondsToIso8601(min)}
        max=${convertMillisecondsToIso8601(max)}
        .dateFilter=${dateFilter}
        @change=${(event: Event) => changeEventHandler(event)}
      ></sbb-date-input>
      <sbb-datepicker-toggle
        input="datepicker-input"
        datepicker="datepicker"
      ></sbb-datepicker-toggle>
      <sbb-datepicker-next-day input="datepicker-input"></sbb-datepicker-next-day>
      <sbb-datepicker id="datepicker" input="datepicker-input" ?wide=${wide}></sbb-datepicker>
    </div>
    <div id="container-value" style="margin-block-start: 1rem; color: var(--sbb-color-smoke);">
      Change date to get the latest value:
    </div>
  `;
};

const TemplateFormField = ({
  min,
  max,
  label,
  optional,
  borderless,
  size,
  negative,
  wide,
  dateFilter,
  ...args
}: Args): TemplateResult => {
  return html`
    <sbb-form-field
      size=${size}
      ?negative=${negative}
      ?optional=${optional}
      ?borderless=${borderless}
    >
      ${label ? html`<label>${label}</label>` : nothing}
      <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
      <sbb-date-input
        ${sbbSpread(args)}
        min=${convertMillisecondsToIso8601(min)}
        max=${convertMillisecondsToIso8601(max)}
        .dateFilter=${dateFilter}
        @change=${(event: Event) => changeEventHandler(event)}
      ></sbb-date-input>
      <sbb-datepicker-toggle></sbb-datepicker-toggle>
      <sbb-datepicker-next-day></sbb-datepicker-next-day>
      <sbb-datepicker ?wide=${wide}></sbb-datepicker>
    </sbb-form-field>
    <div id="container-value" style="margin-block-start: 1rem; color: var(--sbb-color-smoke);">
      Change date to get the latest value:
    </div>
  `;
};

export const InFormField: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs },
};

export const InFormFieldDisabled: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, disabled: true },
};

export const InFormFieldReadonly: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, readonly: true },
};

export const InFormFieldNegative: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, negative: true },
};

export const InFormFieldDisabledNegative: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, disabled: true, negative: true },
};

export const InFormFieldReadonlyNegative: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, readonly: true, negative: true },
};

export const InFormFieldWide: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, wide: true },
};

export const InFormFieldWithMinAndMax: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgs,
    min: new Date(2023, 1, 8),
    max: new Date(2023, 1, 22),
  },
};

export const InFormFieldWithDateFilter: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, dateFilter: dateFilter.options![1] },
};

export const InFormFieldSmall: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, size: size.options![0] },
};

export const InFormFieldLarge: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, size: size.options![2] },
};

export const InFormFieldOptional: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, optional: true },
};

export const InFormFieldBorderless: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, borderless: true },
};

export const WithoutFormField: StoryObj = {
  render: Template,
  argTypes: { ...basicArgTypes },
  args: { ...basicArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '600px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-datepicker/sbb-datepicker',
};

export default meta;
