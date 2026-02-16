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
import { styleMap } from 'lit/directives/style-map.js';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import type { SbbErrorElement } from '../form-field.ts';
import { SbbOptionElement } from '../option.ts';

import { SbbAutocompleteElement } from './autocomplete.component.ts';
import readme from './readme.md?raw';

import '../card.ts';
import '../form-field.ts';

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const preserveIconSpace: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const autoActiveFirstOption: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const autoSelectActiveOption: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const autoSelectActiveOptionOnBlur: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const requireSelection: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const position: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['auto', 'below', 'above'],
  table: {
    category: 'Autocomplete',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option',
  },
};

const disableOption: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option',
  },
};

const ellipsis: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option',
  },
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
  table: {
    category: 'Form field',
  },
};

const floatingLabel: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const disableGroup: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
  },
};

const defaultArgTypes: ArgTypes = {
  // Autocomplete args
  negative,
  disabled,
  readonly,
  preserveIconSpace,
  autoActiveFirstOption,
  autoSelectActiveOption,
  autoSelectActiveOptionOnBlur,
  requireSelection,
  position,

  // Option args
  iconName,
  disableOption,
  ellipsis,

  // Form field args
  borderless,
  size,
  floatingLabel,
};

const withGroupsArgTypes: ArgTypes = {
  ...defaultArgTypes,

  // Option group args
  disableGroup,
};

const defaultArgs: Args = {
  // Autocomplete args
  negative: false,
  disabled: false,
  readonly: false,
  autoSelectActiveOption: false,
  autoSelectActiveOptionOnBlur: false,
  requireSelection: false,
  position: position.options![0],

  // Option args
  iconName: 'clock-small',
  preserveIconSpace: true,
  autoActiveFirstOption: false,
  disableOption: false,
  ellipsis: false,

  // Form field args
  borderless: false,
  size: size.options![0],
  floatingLabel: false,
};

const withGroupsDefaultArgs: Args = {
  ...defaultArgs,

  // Option group args
  disableGroup: false,
};

const aboveDecorator: Decorator = (story) => html`
  <div
    style="inset-block-end: 2rem; inset-inline-start: 2rem; position: absolute; max-width: calc(100% - 4rem)"
  >
    ${story()}
  </div>
`;

const scrollDecorator: Decorator = (story) => html`
  <div style="height: 175vh; display: flex; align-items: center;">${story()}</div>
`;

const createOptionGroup1 = (iconName: string, disableOption: boolean): TemplateResult => {
  return html`
    <sbb-option icon-name=${iconName} value="Option 1">Option 1</sbb-option>
    <sbb-option icon-name=${iconName} ?disabled=${disableOption} value="Option 2">
      Option 2
    </sbb-option>
    <sbb-option value="Option 3">
      <sbb-icon slot="icon" name=${iconName}></sbb-icon>
      Option 3 with a long text which can wrap
    </sbb-option>
  `;
};
const createOptionGroup2 = (): TemplateResult => {
  return html`
    <sbb-option value="Option 4">Option 4</sbb-option>
    <sbb-option value="Option 5">Option 5</sbb-option>
  `;
};

const codeStyle: Args = {
  padding: 'var(--sbb-spacing-fixed-1x) var(--sbb-spacing-fixed-2x)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  backgroundColor: 'var(--sbb-background-color-4)',
};

const textBlock = (): TemplateResult => html`
  <sbb-card color="milk" style="margin-block-start: 1rem; z-index: 100">
    This text block has a <code style=${styleMap(codeStyle)}>z-index</code> greater than the form
    field, but it must always be covered by the autocomplete overlay.
  </sbb-card>
`;

const Template = (args: Args): TemplateResult => html`
  <div>
    <sbb-form-field
      ?negative=${args.negative}
      ?borderless=${args.borderless}
      ?floating-label=${args.floatingLabel}
      size=${args.size}
    >
      <label>Label</label>
      <input placeholder="Placeholder" ?disabled=${args.disabled} ?readonly=${args.readonly} />

      <sbb-autocomplete
        position=${args.position}
        ?preserve-icon-space=${args.preserveIconSpace}
        ?auto-active-first-option=${args.autoActiveFirstOption}
        ?auto-select-active-option=${args.autoSelectActiveOption}
        ?auto-select-active-option-on-blur=${args.autoSelectActiveOptionOnBlur}
        ?require-selection=${args.requireSelection}
      >
        ${createOptionGroup1(args.iconName, args.disableOption)} ${createOptionGroup2()}
      </sbb-autocomplete>
    </sbb-form-field>
    ${textBlock()}
  </div>
`;

const OptionGroupTemplate = (args: Args): TemplateResult => html`
  <div>
    <sbb-form-field
      ?negative=${args.negative}
      ?borderless=${args.borderless}
      ?floating-label=${args.floatingLabel}
      size=${args.size}
    >
      <label>Label</label>
      <input placeholder="Placeholder" ?disabled=${args.disabled} ?readonly=${args.readonly} />

      <sbb-autocomplete
        position=${args.position}
        ?preserve-icon-space=${args.preserveIconSpace}
        ?auto-active-first-option=${args.autoActiveFirstOption}
        ?auto-select-active-option=${args.autoSelectActiveOption}
        ?auto-select-active-option-on-blur=${args.autoSelectActiveOptionOnBlur}
        ?require-selection=${args.requireSelection}
      >
        <sbb-optgroup label="Group 1" ?disabled=${args.disableGroup}>
          ${createOptionGroup1(args.iconName, args.disableOption)}
        </sbb-optgroup>
        <sbb-optgroup label="Group 2">${createOptionGroup2()}</sbb-optgroup>
      </sbb-autocomplete>
    </sbb-form-field>
    ${textBlock()}
  </div>
`;

const MixedTemplate = (args: Args): TemplateResult => html`
  <div>
    <sbb-form-field
      ?negative=${args.negative}
      ?borderless=${args.borderless}
      ?floating-label=${args.floatingLabel}
      size=${args.size}
    >
      <label>Label</label>
      <input placeholder="Placeholder" ?disabled=${args.disabled} ?readonly=${args.readonly} />

      <sbb-autocomplete
        position=${args.position}
        ?preserve-icon-space=${args.preserveIconSpace}
        ?auto-active-first-option=${args.autoActiveFirstOption}
        ?auto-select-active-option=${args.autoSelectActiveOption}
        ?auto-select-active-option-on-blur=${args.autoSelectActiveOptionOnBlur}
        ?require-selection=${args.requireSelection}
      >
        <sbb-option value="Option 1">
          <sbb-icon
            slot="icon"
            name=${args.iconName}
            style="color: var(--sbb-color-sky)"
          ></sbb-icon>
          Option Value
        </sbb-option>
        <sbb-optgroup label="Group 1" ?disabled=${args.disableGroup}>
          ${createOptionGroup1(args.iconName, args.disableOption)}
        </sbb-optgroup>
        <sbb-optgroup label="Group 2">${createOptionGroup2()}</sbb-optgroup>
      </sbb-autocomplete>
    </sbb-form-field>
    ${textBlock()}
  </div>
`;

const RequiredTemplate = (args: Args): TemplateResult => {
  const error: SbbErrorElement = document.createElement('sbb-error');
  error.setAttribute('slot', 'error');
  error.textContent = 'This is a required field.';

  return html`
    <div>
      <sbb-form-field
        ?negative=${args.negative}
        ?borderless=${args.borderless}
        ?floating-label=${args.floatingLabel}
        size=${args.size}
        id="sbb-form-field"
      >
        <label>Label</label>
        <input
          id="sbb-autocomplete"
          class="sbb-invalid"
          placeholder="Placeholder"
          ?disabled=${args.disabled}
          ?readonly=${args.readonly}
          @change=${(event: Event) => {
            if ((event.currentTarget as HTMLInputElement).value !== '') {
              error.remove();
              document.getElementById('sbb-autocomplete')!.classList.remove('sbb-invalid');
            } else {
              document.getElementById('sbb-form-field')!.append(error);
              document.getElementById('sbb-autocomplete')!.classList.add('sbb-invalid');
            }
          }}
        />

        <sbb-autocomplete
          position=${args.position}
          ?preserve-icon-space=${args.preserveIconSpace}
          ?auto-active-first-option=${args.autoActiveFirstOption}
          ?auto-select-active-option=${args.autoSelectActiveOption}
          ?auto-select-active-option-on-blur=${args.autoSelectActiveOptionOnBlur}
          ?require-selection=${args.requireSelection}
        >
          <sbb-optgroup label="Group 1" ?disabled=${args.disableGroup}>
            ${createOptionGroup1(args.iconName, args.disableOption)}
          </sbb-optgroup>
          <sbb-optgroup label="Group 2">${createOptionGroup2()}</sbb-optgroup>
        </sbb-autocomplete>
        ${error}
      </sbb-form-field>
      ${textBlock()}
    </div>
  `;
};

export const Basic: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const BasicNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const BasicSizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

export const BasicOpenAbove: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: [aboveDecorator],
};

export const Borderless: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
};

export const BorderlessNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true, negative: true },
};

export const BorderlessSizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true, size: size.options![1] },
};

export const FloatingLabel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, floatingLabel: true },
};

export const FloatingLabelSizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, floatingLabel: true, size: size.options![1] },
};

export const WithError: StoryObj = {
  render: RequiredTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs },
};

export const WithErrorNegative: StoryObj = {
  render: RequiredTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs, negative: true },
};

export const Disabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const Readonly: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, readonly: true },
};

export const AutoSelectActiveOption: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, autoSelectActiveOption: true },
};

export const RequireSelection: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, requireSelection: true },
};

export const BorderlessOpenAbove: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
  decorators: [aboveDecorator],
};

export const NoIconSpace: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, preserveIconSpace: false },
};

export const Scroll: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: [scrollDecorator],
};

export const WithOptionGroup: StoryObj = {
  render: OptionGroupTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs },
};

export const MixedSingleOptionWithOptionGroup: StoryObj = {
  render: MixedTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs },
};

export const MixedSingleOptionWithOptionGroupNegative: StoryObj = {
  render: MixedTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs, negative: true },
};

export const MixedSingleOptionWithOptionGroupSizeS: StoryObj = {
  render: MixedTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs, size: size.options![1] },
};

export const WithEllipsis: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, ellipsis: true },
};

const meta: Meta = {
  decorators: [
    withActions as Decorator,
    (story, context) =>
      html`<div class=${context.args.ellipsis ? `sbb-options-nowrap` : ``}>${story()}</div>`,
  ],
  parameters: {
    actions: {
      handles: [
        SbbAutocompleteElement.events.beforeopen,
        SbbAutocompleteElement.events.open,
        SbbAutocompleteElement.events.close,
        SbbAutocompleteElement.events.beforeclose,
        'change',
        'input',
        SbbOptionElement.events.optionselected,
      ],
    },
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '500px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-autocomplete',
};

export default meta;
