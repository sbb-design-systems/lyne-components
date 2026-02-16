import type {
  Meta,
  StoryObj,
  Decorator,
  StoryContext,
  Args,
  ArgTypes,
} from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './datepicker-previous-day.component.ts';
import '../../date-input.ts';
import '../../form-field.ts';
import '../datepicker.ts';

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  negative,
};

const defaultArgs: Args = {
  negative: false,
};

const BaseTemplate = (args: Args, input: string | undefined = undefined): TemplateResult => html`
  <sbb-datepicker-previous-day
    ${sbbSpread(args)}
    input=${input || nothing}
  ></sbb-datepicker-previous-day>
`;

const StandaloneTemplate = (args: Args): TemplateResult => html` ${BaseTemplate(args)} `;

const PickerAndButtonTemplate = (args: Args): TemplateResult => html`
  <div style="display: flex; gap: 1em;">
    ${BaseTemplate(args, 'datepicker')}
    <sbb-date-input value="2023-02-15" id="datepicker-input"></sbb-date-input>
    <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
  </div>
`;

const FormFieldTemplate = (args: Args): TemplateResult => html`
  <sbb-form-field ${sbbSpread(args)}>
    ${BaseTemplate(args)}
    <sbb-date-input value="2023-02-15"></sbb-date-input>
    <sbb-datepicker></sbb-datepicker>
  </sbb-form-field>
`;

const EmptyFormFieldTemplate = (args: Args): TemplateResult => html`
  <sbb-form-field ${sbbSpread(args)}>
    ${BaseTemplate(args)}
    <sbb-date-input></sbb-date-input>
    <sbb-datepicker></sbb-datepicker>
  </sbb-form-field>
`;

export const Standalone: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const StandaloneNegative: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const WithPicker: StoryObj = {
  render: PickerAndButtonTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const InFormField: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const EmptyFormField: StoryObj = {
  render: EmptyFormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    actions: {
      handles: ['click', 'change'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-datepicker/sbb-datepicker-previous-day',
};

export default meta;
