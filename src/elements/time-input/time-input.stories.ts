import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryObj,
  StoryContext,
} from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.js';
import type { SbbFormFieldElement } from '../form-field.js';

import readme from './readme.md?raw';
import type { SbbTimeInputElement } from './time-input.component.js';

import './time-input.component.js';
import '../button/secondary-button.js';
import '../form-field.js';
import '../form-error.js';

const updateOutput = (timeInput: SbbTimeInputElement): void => {
  const exampleParent = timeInput.closest<HTMLDivElement>('div.example-parent');
  exampleParent!.querySelector('.container-value')!.textContent = `value is: ${
    timeInput.value
  }; valueAsDate (time only) is: ${timeInput.valueAsDate?.toTimeString() ?? null}.`;
};

const handleInput = (event: Event): void => {
  const target = event.target as SbbTimeInputElement;
  const formField = target.closest<SbbFormFieldElement>('sbb-form-field');
  updateOutput(target);

  formField?.querySelectorAll('sbb-form-error').forEach((el) => el.remove());
  if (formField && !target.validity.valid) {
    formField.appendChild(document.createElement('sbb-form-error')).innerText =
      target.validationMessage;
  }
};

const setValueAsDate = async (event: Event): Promise<void> => {
  const timeInput = (event.target as HTMLElement)
    .closest<HTMLDivElement>('div.example-parent')!
    .querySelector<SbbTimeInputElement>('sbb-time-input')!;
  timeInput.valueAsDate = new Date();
  updateOutput(timeInput);
};

const setValue = (event: Event): void => {
  const timeInput = (event.target as HTMLElement)
    .closest<HTMLDivElement>('div.example-parent')!
    .querySelector<SbbTimeInputElement>('sbb-time-input')!;
  timeInput.value = '00:00';
  updateOutput(timeInput);
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Native input',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input',
  },
};

const required: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l'],
  table: {
    category: 'Form-field',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field',
  },
};

const optional: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const iconStart: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field',
  },
};

const iconEnd: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field',
  },
};

const basicArgTypes: ArgTypes = {
  value,
  disabled,
  readonly,
  required,
  negative,
};

const formFieldBasicArgsTypes: ArgTypes = {
  ...basicArgTypes,
  label,
  size,
  optional,
  borderless,
  iconStart,
  iconEnd,
};

const basicArgs: Args = {
  value: '12:00',
  disabled: false,
  readonly: false,
  required: false,
  negative: false,
};

const formFieldBasicArgs = {
  ...basicArgs,
  label: 'Label',
  size: size.options![1],
  optional: false,
  borderless: false,
  iconStart: undefined,
  iconEnd: undefined,
};

const formFieldBasicArgsWithIcons = {
  ...basicArgs,
  label: 'Label',
  size: size.options![1],
  optional: false,
  borderless: false,
  iconStart: 'clock-small',
  iconEnd: 'circle-information-small',
};

const TemplateSbbTimeInput = ({
  label,
  optional,
  borderless,
  negative,
  iconStart,
  iconEnd,
  size,
  ...args
}: Args): TemplateResult => html`
  <div class="example-parent">
    <sbb-form-field
      size=${size}
      ?optional=${optional}
      ?borderless=${borderless}
      ?negative=${negative}
      width="collapse"
    >
      ${label ? html`<label>${label}</label>` : nothing}
      ${iconStart ? html`<sbb-icon slot="prefix" name=${iconStart}></sbb-icon>` : nothing}
      <sbb-time-input @input=${handleInput} ${sbbSpread(args)}></sbb-time-input>
      ${iconEnd ? html`<sbb-icon slot="suffix" name=${iconEnd}></sbb-icon>` : nothing}
    </sbb-form-field>
    <div style="display: flex; gap: 1em; margin-block-start: 2rem;">
      <sbb-secondary-button size="m" @click=${setValueAsDate}>
        Set valueAsDate to current time
      </sbb-secondary-button>
      <sbb-secondary-button size="m" @click=${setValue}> Set value to 00:00 </sbb-secondary-button>
    </div>
    <div style="color: var(--sbb-color-smoke);">
      <div style="margin-block-start: 1rem;">Time in input:</div>
      <output class="container-value"></output>
    </div>
  </div>
`;

export const Default: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs },
};

export const WithIcons: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgsWithIcons },
};

export const Borderless: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    borderless: true,
  },
};

export const Disabled: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    disabled: true,
  },
};

export const Readonly: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    readonly: true,
  },
};

export const WithError: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    value: '99:99',
  },
};

export const Negative: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, negative: true },
};

export const WithIconsNegative: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgsWithIcons, negative: true },
};

export const BorderlessNegative: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    borderless: true,
    negative: true,
  },
};

export const DisabledNegative: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    disabled: true,
    negative: true,
  },
};

export const ReadonlyNegative: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    readonly: true,
    negative: true,
  },
};

export const WithErrorNegative: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    value: '99:99',
    negative: true,
  },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    actions: {
      handles: ['change', 'input'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-time-input',
};

export default meta;
