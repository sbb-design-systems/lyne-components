import type { Meta, StoryObj, ArgTypes, Args, StoryContext } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';
import type { SbbErrorElement } from '../form-field.ts';

import readme from './readme.md?raw';

import '../button.ts';
import '../form-field.ts';
import '../link.ts';
import '../popover.ts';
import '../title.ts';

const formField = (
  {
    'error-space': errorSpace,
    label,
    optional,
    size,
    borderless,
    width,
    negative,
    'hidden-label': hiddenLabel,
    'floating-label': floatingLabel,
    slottedLabel,
    hostClass,
  }: Args,
  template: TemplateResult,
): TemplateResult =>
  html`<sbb-form-field
    class=${hostClass || nothing}
    error-space=${errorSpace}
    ?optional=${optional}
    size=${size}
    ?borderless=${borderless}
    width=${width}
    ?hidden-label=${hiddenLabel}
    ?floating-label=${floatingLabel}
    ?negative=${negative}
  >
    ${label && !slottedLabel
      ? html`<label>${label}</label>`
      : label && slottedLabel
        ? html`<span slot="label">${label}</span>`
        : nothing}
    ${template}
  </sbb-form-field>`;

const PopoverTrigger = (): TemplateResult => html`
  <sbb-mini-button
    slot="suffix"
    icon-name="circle-information-small"
    id="popover-trigger"
  ></sbb-mini-button>
  <sbb-popover trigger="popover-trigger">
    <sbb-title level="2" visual-level="6" style="margin-block-start: 0"
      >Simple info popover.</sbb-title
    >
    <span id="popover-content" class="sbb-text-s">
      Some content.
      <sbb-block-link icon-name="chevron-small-right-small" icon-placement="end" sbb-popover-close>
        Learn More
      </sbb-block-link>
    </span>
  </sbb-popover>
`;

const TemplateBasicInput = ({
  cssClass,
  placeholder,
  disabled,
  readonly,
  value,
}: Args): TemplateResult => html`
  <input
    class=${cssClass}
    placeholder=${placeholder}
    ?disabled=${disabled}
    ?readonly=${readonly}
    value=${value}
  />
`;

const TemplateBasicSelect = ({ cssClass, disabled }: Args): TemplateResult => html`
  <select class=${cssClass} ?disabled=${disabled}>
    <option value="1">Value 1</option>
    <option value="2">Value 2</option>
    <option value="3">Value 3</option>
  </select>
`;

const TemplateBasicTextarea = ({
  cssClass,
  placeholder,
  disabled,
  readonly,
  value,
}: Args): TemplateResult =>
  html` <textarea
    class=${cssClass}
    placeholder=${placeholder}
    ?disabled=${disabled}
    ?readonly=${readonly}
    .value=${value || nothing}
  ></textarea>`;

const TemplateInput = (args: Args): TemplateResult => formField(args, TemplateBasicInput(args));

const TemplateInputWithErrorSpace = (args: Args): TemplateResult => {
  const error: SbbErrorElement = document.createElement('sbb-error');
  error.setAttribute('slot', 'error');
  error.textContent = args.errorText;

  return html`
    <form>
      <div>
        ${formField(
          args,
          html`<input
              @keyup=${(event: KeyboardEvent) => {
                const input = event.currentTarget as HTMLInputElement;
                if (input.value !== '') {
                  error.remove();
                  input.classList.remove(args.cssClass);
                } else {
                  input.closest('sbb-form-field')!.append(error);
                  input.classList.add(args.cssClass);
                }
              }}
              class=${args.cssClass}
              placeholder=${args.placeholder}
              ?disabled=${args.disabled}
              ?readonly=${args.readonly}
            />
            ${error}`,
        )}
      </div>
      <div style="color: var(--sbb-color-smoke);">
        Some text, right below the form-field, inside a div.
      </div>
    </form>
  `;
};

const TemplateInputWithIcons = (args: Args): TemplateResult =>
  formField(
    args,
    html`<sbb-icon slot="prefix" name="pie-small"></sbb-icon> ${TemplateBasicInput(args)}
      ${PopoverTrigger()}`,
  );

const TemplateInputWithClearButton = (args: Args): TemplateResult =>
  formField(args, html`${TemplateBasicInput(args)} <sbb-form-field-clear></sbb-form-field-clear>`);

const TemplateSelect = (args: Args): TemplateResult => formField(args, TemplateBasicSelect(args));

const TemplateSelectWithErrorSpace = (args: Args): TemplateResult => {
  const error: SbbErrorElement = document.createElement('sbb-error');
  error.setAttribute('slot', 'error');
  error.textContent = args.errorText;

  return html`
    <form>
      <div>
        ${formField(
          args,
          html`<select
              @change=${(event: Event) => {
                const select = event.currentTarget as HTMLSelectElement;
                if (select.value !== '0') {
                  error.remove();
                  select.classList.remove(args.cssClass);
                } else {
                  select.closest('sbb-form-field')!.append(error);
                  select.classList.add(args.cssClass);
                }
              }}
              class=${args.cssClass}
              ?disabled=${args.disabled}
            >
              <option value="0"></option>
              <option value="1">Value 1</option>
              <option value="2">Value 2</option>
              <option value="3">Value 3</option>
            </select>
            ${error}`,
        )}
      </div>
      <div>
        <div style="color: var(--sbb-color-smoke);">
          Some text, right below the form-field, inside a div.
        </div>
      </div>
    </form>
  `;
};

const TemplateTextarea = (args: Args): TemplateResult =>
  formField(args, TemplateBasicTextarea(args));

const TemplateTextareaWithIcon = (args: Args): TemplateResult =>
  formField(
    args,
    html`<span slot="prefix">
        <sbb-icon name="pie-small"></sbb-icon>
      </span>
      ${TemplateBasicTextarea(args)}`,
  );

const placeholder: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input attribute',
  },
};

const cssClass: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input attribute',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input attribute',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input attribute',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input attribute',
  },
};

const errorText: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Error slot',
  },
};

const errorSpace: InputType = {
  control: {
    type: 'select',
  },
  options: ['none', 'reserve'],
  table: {
    category: 'Form-field',
  },
};

const width: InputType = {
  control: {
    type: 'select',
  },
  options: ['default', 'collapse'],
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

const hiddenLabel: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const floatingLabel: InputType = {
  control: {
    type: 'boolean',
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

const basicArgTypes: ArgTypes = {
  'error-space': errorSpace,
  label,
  'hidden-label': hiddenLabel,
  'floating-label': floatingLabel,
  optional,
  borderless,
  size,
  negative,
  cssClass,
  placeholder,
  disabled,
  readonly,
  value,
  errorText,
  width,
};

const basicArgs: Args = {
  'error-space': 'none',
  label: 'Input name',
  'hidden-label': false,
  'floating-label': false,
  optional: false,
  borderless: false,
  size: size.options![1],
  negative: false,
  cssClass: '',
  placeholder: 'Input placeholder',
  value: 'Input value',
  disabled: false,
  readonly: false,
  errorText: 'This is a required field.',
  width: width.options![0],
};

export const Input: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, value: 'Input text' },
};

export const InputSizeS: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    value: 'Input text',
    size: 's',
  },
};

export const InputSizeL: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    value: 'Input text',
    size: 'l',
  },
};

export const InputNoLabel: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, label: undefined },
};

export const InputWithoutBorder: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, borderless: true },
};

export const InputReadonly: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, readonly: true },
};

export const InputOptionalAndIcons: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true },
};

export const InputOptionalAndIconsNegative: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, negative: true },
};

export const InputOptionalAndIconsDisabled: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

export const InputWithClearButton: StoryObj = {
  render: TemplateInputWithClearButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const InputFloatingLabel: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'floating-label': true, value: undefined },
};

export const InputFloatingLongLabel: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'floating-label': true,
    value: undefined,
    label: 'This is a very long label which receives ellipsis',
  },
};

export const InputFloatingWithIcons: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'floating-label': true,
    value: undefined,
  },
};

export const InputCollapsedWidth: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, width: width.options![1] },
};

export const Select: StoryObj = {
  render: TemplateSelect,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const SelectNegative: StoryObj = {
  render: TemplateSelect,
  argTypes: basicArgTypes,
  args: { ...basicArgs, negative: true },
};

export const SelectFloatingLabel: StoryObj = {
  render: TemplateSelectWithErrorSpace,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'floating-label': true, value: undefined },
};

export const Textarea: StoryObj = {
  render: TemplateTextarea,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const TextareaWithoutBorder: StoryObj = {
  render: TemplateTextarea,
  argTypes: basicArgTypes,
  args: { ...basicArgs, borderless: true },
};

export const TextareaOptionalAndIcon: StoryObj = {
  render: TemplateTextareaWithIcon,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true },
};

export const TextareaFloatingLabel: StoryObj = {
  render: TemplateTextarea,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'floating-label': true, value: undefined },
};

export const TextareaFloatingLongLabel: StoryObj = {
  render: TemplateTextarea,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'floating-label': true,
    value: undefined,
    label: 'This is a very long label which receives ellipsis',
  },
};

export const TextareaNegative: StoryObj = {
  render: TemplateTextarea,
  argTypes: basicArgTypes,
  args: { ...basicArgs, negative: true },
};

export const ErrorReservedSpace: StoryObj = {
  render: TemplateInputWithErrorSpace,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'error-space': 'reserve',
    cssClass: 'sbb-invalid',
    label: 'This label name is so long that it needs ellipsis to fit.',
    value: 'This input value is so long that it needs ellipsis to fit.',
  },
};

export const RequiredHighlight: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, hostClass: 'sbb-form-field-required-highlight', value: undefined },
};

// sbb-error

const TemplateError = ({ errorText, ...args }: Args): TemplateResult => html`
  <sbb-error ${sbbSpread(args)}>${errorText}</sbb-error>
`;

const iconNameArg: InputType = {
  control: {
    type: 'text',
  },
};

const errorTextArg: InputType = {
  control: {
    type: 'text',
  },
};

const negativeArg: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  iconName: iconNameArg,
  errorText: errorTextArg,
  negative: negativeArg,
};

const defaultArgs: Args = {
  iconName: undefined,
  errorText: 'Required field.',
  negative: false,
};

export const Error: StoryObj = {
  render: TemplateError,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Form Field',
};

export default meta;
