import { withActions } from '@storybook/addon-actions/decorator';
import { userEvent, within } from '@storybook/test';
import type { InputType } from '@storybook/types';
import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components';
import isChromatic from 'chromatic';
import { html, nothing, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { type StyleInfo, styleMap } from 'lit/directives/style-map.js';

import { waitForComponentsReady } from '../../../storybook/testing/wait-for-components-ready';
import { waitForStablePosition } from '../../../storybook/testing/wait-for-stable-position';
import type { SbbAutocompleteGridButtonElement } from '../autocomplete-grid-button';
import { SbbAutocompleteGridOptionElement } from '../autocomplete-grid-option';

import { SbbAutocompleteGridElement } from './autocomplete-grid';
import readme from './readme.md?raw';

import '../autocomplete-grid-row';
import '../autocomplete-grid-optgroup';
import '../autocomplete-grid-actions';
import '../autocomplete-grid-button';
import '../../form-field';

const getOption = (event: Event): void => {
  const button = event.target as SbbAutocompleteGridButtonElement;
  const div: HTMLDivElement = document.createElement('div');
  div.innerText = `Button '${button.iconName}' clicked on row '${button.option?.textContent}' / value: '${button.option?.value}'`;
  (event.currentTarget as HTMLElement).closest('div')!.querySelector('#container')!.prepend(div);
};

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
});

const textBlockStyle: Readonly<StyleInfo> = {
  position: 'relative',
  marginBlockStart: '1rem',
  padding: '1rem',
  backgroundColor: 'var(--sbb-color-milk)',
  border: 'var(--sbb-border-width-1x) solid var(--sbb-color-cloud)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  zIndex: '100',
};

const codeStyle: Readonly<StyleInfo> = {
  padding: 'var(--sbb-spacing-fixed-1x) var(--sbb-spacing-fixed-2x)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  backgroundColor: 'var(--sbb-color-smoke-alpha-20)',
};

const textBlock = (): TemplateResult => html`
  <div style=${styleMap(textBlockStyle)}>
    This text block has a <code style=${styleMap(codeStyle)}>z-index</code> greater than the form
    field, but it must always be covered by the autocomplete overlay.
  </div>
`;

const aboveDecorator: Decorator = (story) => html`
  <div
    style=${styleMap({
      height: '100%',
      display: 'flex',
      'align-items': 'end',
    })}
  >
    ${story()}
  </div>
`;

const scrollDecorator: Decorator = (story) => html`
  <div
    style=${styleMap({
      height: '175%',
      display: 'flex',
      'align-items': 'center',
    })}
  >
    ${story()}
  </div>
`;

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }: StoryContext): Promise<void> => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('form-field').shadowRoot!.querySelector('div.sbb-form-field__space-wrapper'),
  );

  await waitForStablePosition(() => canvas.getByTestId('autocomplete-input'));
  await userEvent.type(canvas.getByTestId('autocomplete-input'), 'Opt');
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

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

const disableAnimation: InputType = {
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

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
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

const optionIconName: InputType = {
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

const buttonIconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
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
  // Form field args
  negative,
  borderless,
  floatingLabel,

  // Input args
  disabled,
  readonly,

  // Autocomplete args
  disableAnimation,
  preserveIconSpace,

  // Option args
  optionIconName,
  disableOption,

  // Button args
  buttonIconName,
};

const withGroupsArgTypes: ArgTypes = {
  ...defaultArgTypes,

  // Option group args
  disableGroup,
};

const defaultArgs: Args = {
  // Form field args
  negative: false,
  borderless: false,
  floatingLabel: false,

  // Input args
  disabled: false,
  readonly: false,

  // Autocomplete args
  disableAnimation: false,
  preserveIconSpace: true,

  // Option args
  optionIconName: 'clock-small',
  disableOption: false,

  // Button args
  buttonIconName: 'pen-small',
};

const withGroupsDefaultArgs: Args = {
  ...defaultArgs,

  // Option group args
  disableGroup: false,
};

const createRows1 = (
  optionIconName: string,
  buttonIconName: string,
  disableOption: boolean,
): TemplateResult => html`
  ${repeat(
    new Array(3),
    (_, i: number) => html`
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option
          value=${`1-${i + 1}`}
          icon-name=${optionIconName || nothing}
          ?disabled=${disableOption && i === 1}
          >${`Option 1-${i + 1}`}</sbb-autocomplete-grid-option
        >
        <sbb-autocomplete-grid-actions>
          <sbb-autocomplete-grid-button
            icon-name=${buttonIconName}
            aria-label=${buttonIconName}
            ?disabled=${disableOption && i === 1}
            @click=${(event: Event) => getOption(event)}
          ></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-actions>
      </sbb-autocomplete-grid-row>
    `,
  )}
`;

const createRows2 = (buttonIconName: string, disableOption: boolean): TemplateResult => html`
  ${repeat(
    new Array(3),
    (_, i: number) => html`
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value=${`2-${i + 1}`} ?disabled=${disableOption && i === 1}
          >${`Option 2-${i + 1}`}</sbb-autocomplete-grid-option
        >
        <sbb-autocomplete-grid-actions>
          <sbb-autocomplete-grid-button
            icon-name=${buttonIconName}
            aria-label=${buttonIconName}
            ?disabled=${disableOption && i === 1}
            @click=${(event: Event) => getOption(event)}
          ></sbb-autocomplete-grid-button>
          <sbb-autocomplete-grid-button
            icon-name="trash-small"
            aria-label="trash-small"
            ?disabled=${disableOption && i === 1}
            @click=${(event: Event) => getOption(event)}
          ></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-actions>
      </sbb-autocomplete-grid-row>
    `,
  )}
`;

const Template = (args: Args): TemplateResult => html`
  <div>
    <sbb-form-field
      label="Label"
      ?negative=${args.negative}
      ?borderless=${args.borderless}
      ?floating-label=${args.floatingLabel}
      data-testid="form-field"
    >
      <input
        placeholder="Placeholder"
        data-testid="autocomplete-input"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
      />
      <sbb-autocomplete-grid
        ?disable-animation=${args.disableAnimation}
        ?preserve-icon-space=${args.preserveIconSpace}
      >
        ${createRows1(args.optionIconName, args.buttonIconName, args.disableOption)}
        ${createRows2(args.buttonIconName, args.disableOption)}
      </sbb-autocomplete-grid>
    </sbb-form-field>
    ${textBlock()}
    <div
      id="container"
      style=${styleMap({
        color: args.negative ? 'var(--sbb-color-white)' : 'var(--sbb-color-black)',
        paddingBlock: '1rem',
      })}
    ></div>
  </div>
`;

const OptionGroupTemplate = (args: Args): TemplateResult => html`
  <div>
    <sbb-form-field
      label="Label"
      ?negative=${args.negative}
      ?borderless=${args.borderless}
      ?floating-label=${args.floatingLabel}
      data-testid="form-field"
    >
      <input
        placeholder="Placeholder"
        data-testid="autocomplete-input"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
      />
      <sbb-autocomplete-grid
        ?disable-animation=${args.disableAnimation}
        ?preserve-icon-space=${args.preserveIconSpace}
      >
        <sbb-autocomplete-grid-optgroup label="Group 1" ?disabled=${args.disableGroup}>
          ${createRows1(args.optionIconName, args.buttonIconName, args.disableOption)}
          ${createRows2(args.buttonIconName, args.disableOptio1n)}
        </sbb-autocomplete-grid-optgroup>
        <sbb-autocomplete-grid-optgroup label="Group 2">
          ${createRows1(args.optionIconName, args.buttonIconName, args.disableOption)}
        </sbb-autocomplete-grid-optgroup>
      </sbb-autocomplete-grid>
    </sbb-form-field>
    ${textBlock()}
    <div
      id="container"
      style=${styleMap({
        color: args.negative ? 'var(--sbb-color-white)' : 'var(--sbb-color-black)',
        paddingBlock: '1rem',
      })}
    ></div>
  </div>
`;

export const Basic: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const Negative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
  play: isChromatic() ? playStory : undefined,
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

export const NoIcon: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, optionIconName: undefined },
  play: isChromatic() ? playStory : undefined,
};

export const NoIconNoIconSpace: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, optionIconName: undefined, preserveIconSpace: false },
  play: isChromatic() ? playStory : undefined,
};

export const Borderless: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
  play: isChromatic() ? playStory : undefined,
};

export const BorderlessNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true, negative: true },
  play: isChromatic() ? playStory : undefined,
};

export const BasicOpenAbove: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: [aboveDecorator],
  play: isChromatic() ? playStory : undefined,
};

export const BorderlessOpenAbove: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
  decorators: [aboveDecorator],
  play: isChromatic() ? playStory : undefined,
};

export const DisableOption: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disableOption: true },
  play: isChromatic() ? playStory : undefined,
};

export const NegativeDisableOption: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true, disableOption: true },
  play: isChromatic() ? playStory : undefined,
};

export const WithOptionGroup: StoryObj = {
  render: OptionGroupTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const WithOptionGroupNegative: StoryObj = {
  render: OptionGroupTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs, negative: true },
  play: isChromatic() ? playStory : undefined,
};

export const WithOptionGroupDisabled: StoryObj = {
  render: OptionGroupTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs, disableGroup: true },
  play: isChromatic() ? playStory : undefined,
};

export const WithOptionGroupNegativeDisabled: StoryObj = {
  render: OptionGroupTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs, negative: true, disableGroup: true },
  play: isChromatic() ? playStory : undefined,
};

export const WithOptionGroupNegativeOptionDisabled: StoryObj = {
  render: OptionGroupTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs, negative: true, disableOption: true },
  play: isChromatic() ? playStory : undefined,
};

export const Scroll: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: [scrollDecorator],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

const meta: Meta = {
  decorators: [
    (story, context) => html`
      <div
        style=${styleMap({
          ...wrapperStyle(context),
          padding: '2rem',
          height: 'calc(100vh - 2rem)',
        })}
      >
        ${story()}
      </div>
    `,
    withActions as Decorator,
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: {
      handles: [
        SbbAutocompleteGridElement.events.willOpen,
        SbbAutocompleteGridElement.events.didOpen,
        SbbAutocompleteGridElement.events.didClose,
        SbbAutocompleteGridElement.events.willClose,
        'change',
        'click',
        SbbAutocompleteGridOptionElement.events.optionSelected,
      ],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      story: { inline: false, iframeHeight: '500px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-autocomplete-grid/sbb-autocomplete-grid',
};

export default meta;