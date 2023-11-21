import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import { StoryContext } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../core/dom';
import type { SbbFormError } from '../../form-error';

import readme from './readme.md?raw';
import './form-field';
import '../form-field-clear';
import '../../button';
import '../../form-error';
import '../../tooltip';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-black-default)'
    : 'var(--sbb-color-white-default)',
});

const TooltipTrigger = (): TemplateResult => html`
  <sbb-tooltip-trigger
    slot="suffix"
    id="tooltip-trigger"
    icon-name="circle-information-small"
  ></sbb-tooltip-trigger>
  <sbb-tooltip data-testid="tooltip" trigger="tooltip-trigger">
    <span id="tooltip-content" class="sbb-text-s">
      Simple info tooltip.
      <sbb-link
        text-size="s"
        variant="block"
        icon-name="chevron-small-right-small"
        icon-placement="end"
        sbb-tooltip-close
      >
        Learn More
      </sbb-link>
    </span>
  </sbb-tooltip>
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

const TemplateInput = ({
  'error-space': errorSpace,
  label,
  optional,
  size,
  borderless,
  width,
  negative,
  'floating-label': floatingLabel,
  ...args
}: Args): TemplateResult => html`
  <sbb-form-field
    error-space=${errorSpace}
    label=${label}
    ?optional=${optional}
    size=${size}
    ?borderless=${borderless}
    width=${width}
    ?floating-label=${floatingLabel}
    ?negative=${negative}
  >
    ${TemplateBasicInput(args)}
  </sbb-form-field>
`;

const TemplateInputWithSlottedLabel = ({
  'error-space': errorSpace,
  label,
  optional,
  size,
  borderless,
  width,
  negative,
  'floating-label': floatingLabel,
  ...args
}: Args): TemplateResult => html`
  <sbb-form-field
    error-space=${errorSpace}
    ?optional=${optional}
    size=${size}
    ?borderless=${borderless}
    width=${width}
    ?floating-label=${floatingLabel}
    ?negative=${negative}
  >
    <span slot="label">${label}</span>
    ${TemplateBasicInput(args)}
  </sbb-form-field>
`;

const TemplateInputWithErrorSpace = (args: Args): TemplateResult => {
  const sbbFormError: SbbFormError = document.createElement('sbb-form-error');
  sbbFormError.setAttribute('slot', 'error');
  sbbFormError.textContent = args.errorText;

  return html`
    <form>
      <div>
        <sbb-form-field
          id="sbb-form-field"
          error-space=${args['error-space']}
          label=${args.label}
          ?optional=${args.optional}
          size=${args.size}
          ?borderless=${args.borderless}
          width=${args.width}
          ?floating-label=${args['floating-label']}
          ?negative=${args.negative}
        >
          <input
            id="sbb-form-field-input"
            @keyup=${(event) => {
              if ((event.currentTarget as HTMLInputElement).value !== '') {
                sbbFormError.remove();
                document.getElementById('sbb-form-field-input')!.classList.remove(args.cssClass);
              } else {
                document.getElementById('sbb-form-field')!.append(sbbFormError);
                document.getElementById('sbb-form-field-input')!.classList.add(args.cssClass);
              }
            }}
            class=${args.cssClass}
            placeholder=${args.placeholder}
            ?disabled=${args.disabled}
            ?readonly=${args.readonly}
          />
          ${sbbFormError}
        </sbb-form-field>
      </div>
      <div style="color: var(--sbb-color-smoke-default);">
        Some text, right below the form-field, inside a div.
      </div>
    </form>
  `;
};

const TemplateInputWithIcons = (args: Args): TemplateResult => html`
  <sbb-form-field ${sbbSpread(args)}>
    <sbb-icon slot="prefix" name="pie-small"></sbb-icon>
    ${TemplateBasicInput(args)} ${TooltipTrigger()}
  </sbb-form-field>
`;

const TemplateInputWithButton = ({
  disabled,
  readonly,
  active,
  ...args
}: Args): TemplateResult => html`
  <sbb-form-field ${sbbSpread(args)}>
    ${TemplateBasicInput({ disabled, readonly, ...args })}
    <sbb-button
      slot="suffix"
      icon-name="pie-small"
      ?disabled=${disabled || readonly}
      aria-label="Input button"
      ?data-active=${active}
    ></sbb-button>
  </sbb-form-field>
`;

const TemplateInputWithClearButton = ({
  disabled,
  readonly,
  active,
  ...args
}: Args): TemplateResult => html`
  <sbb-form-field ${sbbSpread(args)}>
    ${TemplateBasicInput({ disabled, readonly, ...args })}
    <sbb-form-field-clear ?data-active=${active}></sbb-form-field-clear>
  </sbb-form-field>
`;

const TemplateSelect = (args: Args): TemplateResult => html`
  <sbb-form-field
    error-space=${args['error-space']}
    label=${args.label}
    ?optional=${args.optional}
    size=${args.size}
    ?borderless=${args.borderless}
    width=${args.width}
    ?floating-label=${args['floating-label']}
    ?negative=${args.negative}
  >
    ${TemplateBasicSelect(args)}
  </sbb-form-field>
`;

const TemplateSelectWithErrorSpace = (args: Args): TemplateResult => {
  const sbbFormError: SbbFormError = document.createElement('sbb-form-error');
  sbbFormError.setAttribute('slot', 'error');
  sbbFormError.textContent = args.errorText;

  return html`
    <form>
      <div>
        <sbb-form-field
          id="sbb-form-field"
          error-space=${args['error-space']}
          label=${args.label}
          ?optional=${args.optional}
          size=${args.size}
          ?borderless=${args.borderless}
          width=${args.width}
          ?floating-label=${args['floating-label']}
          ?negative=${args.negative}
        >
          <select
            id="sbb-form-field-input"
            @change=${(event) => {
              if ((event.currentTarget as HTMLSelectElement).value !== '') {
                sbbFormError.remove();
                document.getElementById('sbb-form-field-input').classList.remove(args.cssClass);
              } else {
                document.getElementById('sbb-form-field').append(sbbFormError);
                document.getElementById('sbb-form-field-input').classList.add(args.cssClass);
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
          ${sbbFormError}
        </sbb-form-field>
      </div>
      <div>
        <div style=${styleMap({ color: 'var(--sbb-color-smoke-default)' })}>
          Some text, right below the form-field, inside a div.
        </div>
      </div>
    </form>
  `;
};

const TemplateSelectWithIcons = (args: Args): TemplateResult => html`
  <sbb-form-field ${sbbSpread(args)}>
    <span slot="prefix">
      <sbb-icon name="pie-small"></sbb-icon>
    </span>
    ${TemplateBasicSelect(args)}
    <span slot="suffix">${TooltipTrigger()}</span>
  </sbb-form-field>
`;

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
    category: 'Form-field attribute',
  },
};

const width: InputType = {
  control: {
    type: 'select',
  },
  options: ['default', 'collapse'],
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

const floatingLabel: InputType = {
  control: {
    type: 'boolean',
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

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 'l'],
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

const active: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    disable: true,
  },
};

const basicArgTypes: ArgTypes = {
  'error-space': errorSpace,
  label,
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
  active,
};

const basicArgs: Args = {
  'error-space': 'none',
  label: 'Input name',
  'floating-label': false,
  optional: false,
  borderless: false,
  size: size.options[0],
  negative: false,
  cssClass: '',
  placeholder: 'Input placeholder',
  value: 'Input value',
  disabled: false,
  readonly: false,
  errorText: 'This is a required field.',
  width: width.options[0],
  active: false,
};

export const Input: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, value: 'This input value is so long that it needs ellipsis to fit.' },
};

export const InputSizeL: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    value: 'This input value is so long that it needs ellipsis to fit.',
    size: 'l',
  },
};

export const InputNoLabel: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, label: undefined },
};

export const InputWithSlottedLabel: StoryObj = {
  render: TemplateInputWithSlottedLabel,
  argTypes: basicArgTypes,
  args: { ...basicArgs, value: 'Random value' },
};

export const InputWithoutBorder: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, borderless: true },
};

export const InputDisabled: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
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

export const InputWithButton: StoryObj = {
  render: TemplateInputWithButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const InputWithButtonDisabled: StoryObj = {
  render: TemplateInputWithButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

export const InputWithButtonActive: StoryObj = {
  render: TemplateInputWithButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, active: true },
};

export const InputWithClearButton: StoryObj = {
  render: TemplateInputWithClearButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const InputWithClearButtonDisabled: StoryObj = {
  render: TemplateInputWithClearButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

export const InputWithClearButtonActive: StoryObj = {
  render: TemplateInputWithClearButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, active: true },
};

export const InputLongLabelAndErrorSpace: StoryObj = {
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

export const Select: StoryObj = {
  render: TemplateSelect,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const SelectWithoutBorder: StoryObj = {
  render: TemplateSelect,
  argTypes: basicArgTypes,
  args: { ...basicArgs, borderless: true },
};

export const SelectDisabled: StoryObj = {
  render: TemplateSelect,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

export const SelectErrorSpace: StoryObj = {
  render: TemplateSelectWithErrorSpace,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'error-space': 'reserve', cssClass: 'sbb-invalid' },
};

export const SelectFloatingLabel: StoryObj = {
  render: TemplateSelectWithErrorSpace,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'floating-label': true, value: undefined },
};

export const SelectOptionalAndIcons: StoryObj = {
  render: TemplateSelectWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true },
};

export const InputCollapsedWidth: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, width: width.options[1] },
};

export const InputWithIconsDisabled: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

export const InputNegative: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    value: 'This input value is so long that it needs ellipsis to fit.',
    negative: true,
  },
};

export const InputWithSlottedLabelNegative: StoryObj = {
  render: TemplateInputWithSlottedLabel,
  argTypes: basicArgTypes,
  args: { ...basicArgs, value: 'Random value', negative: true },
};

export const InputWithoutBorderNegative: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, borderless: true, negative: true },
};

export const InputDisabledNegative: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true, negative: true },
};

export const InputReadonlyNegative: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, readonly: true, negative: true },
};

export const InputOptionalAndIconsNegative: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, negative: true },
};

export const InputWithButtonNegative: StoryObj = {
  render: TemplateInputWithButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, negative: true },
};

export const InputWithButtonDisabledNegative: StoryObj = {
  render: TemplateInputWithButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true, negative: true },
};

export const InputWithButtonActiveNegative: StoryObj = {
  render: TemplateInputWithButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, active: true, negative: true },
};

export const InputWithClearButtonNegative: StoryObj = {
  render: TemplateInputWithClearButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, negative: true },
};

export const InputWithClearButtonDisabledNegative: StoryObj = {
  render: TemplateInputWithClearButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true, negative: true },
};

export const InputWithClearButtonActiveNegative: StoryObj = {
  render: TemplateInputWithClearButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, active: true, negative: true },
};

export const InputLongLabelAndErrorSpaceNegative: StoryObj = {
  render: TemplateInputWithErrorSpace,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'error-space': 'reserve',
    cssClass: 'sbb-invalid',
    label: 'This label name is so long that it needs ellipsis to fit.',
    value: 'This input value is so long that it needs ellipsis to fit.',
    negative: true,
  },
};

export const InputFloatingLabelNegative: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'floating-label': true, value: undefined, negative: true },
};

export const InputFloatingLongLabelNegative: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'floating-label': true,
    value: undefined,
    label: 'This is a very long label which receives ellipsis',
    negative: true,
  },
};

export const InputFloatingWithIconsNegative: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'floating-label': true,
    value: undefined,
    negative: true,
  },
};

export const SelectNegative: StoryObj = {
  render: TemplateSelect,
  argTypes: basicArgTypes,
  args: { ...basicArgs, negative: true },
};

export const SelectWithoutBorderNegative: StoryObj = {
  render: TemplateSelect,
  argTypes: basicArgTypes,
  args: { ...basicArgs, borderless: true, negative: true },
};

export const SelectDisabledNegative: StoryObj = {
  render: TemplateSelect,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true, negative: true },
};

export const SelectErrorSpaceNegative: StoryObj = {
  render: TemplateSelectWithErrorSpace,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'error-space': 'reserve', cssClass: 'sbb-invalid', negative: true },
};

export const SelectFloatingLabelNegative: StoryObj = {
  render: TemplateSelectWithErrorSpace,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'floating-label': true, value: undefined, negative: true },
};

export const SelectOptionalAndIconsNegative: StoryObj = {
  render: TemplateSelectWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, negative: true },
};

export const InputCollapsedWidthNegative: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, width: width.options[1], negative: true },
};

export const InputWithIconsDisabledNegative: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true, negative: true },
};

const meta: Meta = {
  excludeStories: /.*(Active|ActiveNegative)$/,
  decorators: [
    (story, context) => html`
      <div style=${styleMap({ ...wrapperStyle(context), padding: '2rem' })}>${story()}</div>
    `,
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-form-field/sbb-form-field',
};

export default meta;
