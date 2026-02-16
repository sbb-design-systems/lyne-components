import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import readme from './readme.md?raw';

import '../../date-input.ts';
import '../../form-field.ts';
import '../datepicker.ts';
import './datepicker-toggle.component.ts';

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

const PickerAndButtonTemplate = (): TemplateResult => html`
  <div style="display: flex; gap: 1em;">
    <sbb-date-input id="datepicker-input"></sbb-date-input>
    <sbb-datepicker-toggle input="datepicker-input" datepicker="datepicker"></sbb-datepicker-toggle>
    <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
  </div>
`;

const FormFieldTemplate = ({ negative }: Args): TemplateResult => html`
  <sbb-form-field ?negative=${negative}>
    <sbb-date-input></sbb-date-input>
    <sbb-datepicker></sbb-datepicker>
    <sbb-datepicker-toggle></sbb-datepicker-toggle>
  </sbb-form-field>
`;

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

export const InFormFieldNegative: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    actions: {
      handles: ['click'],
    },
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '600px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-datepicker/sbb-datepicker-toggle',
};

export default meta;
