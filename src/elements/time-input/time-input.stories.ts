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
import { styleMap } from 'lit/directives/style-map.js';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';
import type { SbbFormFieldElement } from '../form-field.ts';

import readme from './readme.md?raw';
import type { SbbTimeInputElement } from './time-input.component.ts';

import './time-input.component.ts';
import '../button/secondary-button.ts';
import '../form-field.ts';

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

  formField?.querySelectorAll('sbb-error').forEach((el) => el.remove());
  if (formField && !target.validity.valid) {
    formField.appendChild(document.createElement('sbb-error')).innerText = target.validationMessage;
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
      <sbb-time-input @input=${handleInput} value="12:00" ${sbbSpread(args)}></sbb-time-input>
      ${iconEnd ? html`<sbb-icon slot="suffix" name=${iconEnd}></sbb-icon>` : nothing}
    </sbb-form-field>
    <div
      style=${styleMap({
        color: negative ? 'var(--sbb-color-1-negative)' : 'var(--sbb-color-1)',
      })}
    >
      <div style="display: flex; gap: 1em; margin-block-start: 2rem;">
        <sbb-secondary-button size="m" @click=${setValueAsDate}>
          Set valueAsDate to current time
        </sbb-secondary-button>
        <sbb-secondary-button size="m" @click=${setValue}>
          Set value to 00:00
        </sbb-secondary-button>
      </div>
      <p style="margin-block-start: 1rem;">
        Time in input:
        <output class="container-value"></output>
      </p>
      <p>
        <strong>Note:</strong> In order for an error to be displayed, you need to enter an invalid
        value (e.g. 99:99) manually into the input field.
      </p>
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

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
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
