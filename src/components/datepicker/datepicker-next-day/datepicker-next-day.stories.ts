import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type {
  Meta,
  StoryObj,
  Decorator,
  StoryContext,
  Args,
  ArgTypes,
} from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import './datepicker-next-day.js';
import '../../form-field/index.js';
import '../datepicker/index.js';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
});

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

const BaseTemplate = (args: Args, picker: string | undefined = undefined): TemplateResult => html`
  <sbb-datepicker-next-day ${sbbSpread(args)} .datePicker=${picker}></sbb-datepicker-next-day>
`;

const StandaloneTemplate = (args: Args): TemplateResult => html` ${BaseTemplate(args)} `;

const PickerAndButtonTemplate = (args: Args): TemplateResult => html`
  <div style=${styleMap({ display: 'flex', gap: '1em' })}>
    <sbb-datepicker
      id="datepicker"
      input="datepicker-input"
      data-now=${new Date(2023, 0, 12, 0, 0, 0).valueOf()}
    ></sbb-datepicker>
    <input value="15.02.2023" id="datepicker-input" />
    ${BaseTemplate(args, 'datepicker')}
  </div>
`;

const FormFieldTemplate = (args: Args): TemplateResult => html`
  <sbb-form-field ${sbbSpread(args)}>
    <input value="15.02.2023" />
    <sbb-datepicker></sbb-datepicker>
    ${BaseTemplate(args)}
  </sbb-form-field>
`;

const EmptyFormFieldTemplate = (args: Args): TemplateResult => html`
  <sbb-form-field ${sbbSpread(args)}>
    <input />
    <sbb-datepicker></sbb-datepicker>
    ${BaseTemplate(args)}
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
  decorators: [
    (story, context) => html`
      <div style=${styleMap({ ...wrapperStyle(context), padding: '2rem' })}>${story()}</div>
    `,
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: ['click', 'change', 'input'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-datepicker/sbb-datepicker-next-day',
};

export default meta;
