/** @jsx h */
import { h, JSX } from 'jsx-dom';
import events from './sbb-autocomplete.events';
import readme from './readme.md';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';
import isChromatic from 'chromatic/isChromatic';
import { waitForStablePosition } from '../../global/helpers/testing/wait-for-stable-position';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

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
  disabled,
  readonly,
  disableAnimation,
  preserveIconSpace,

  // Option args
  iconName,
  disableOption,

  // Form field args
  borderless,
  floatingLabel,
};

const withGroupsArgTypes: ArgTypes = {
  ...defaultArgTypes,

  // Option group args
  disableGroup,
};

const defaultArgs: Args = {
  // Autocomplete args
  disabled: false,
  readonly: false,
  disableAnimation: isChromatic(),

  // Option args
  iconName: 'clock-small',
  preserveIconSpace: true,
  disableOption: false,

  // Form field args
  borderless: false,
  floatingLabel: false,
};

const withGroupsDefaultArgs = {
  ...defaultArgs,

  // Option group args
  disableGroup: false,
};

const defaultDecorator = [
  (Story) => (
    <div style={{ padding: '2rem', height: 'calc(100vh - 2rem)' }}>
      <Story />
    </div>
  ),
];

const aboveDecorator = [
  (Story) => (
    <div
      style={{
        padding: '2rem',
        height: 'calc(100vh - 2rem)',
        display: 'flex',
        'align-items': 'end',
      }}
    >
      <Story />
    </div>
  ),
];

const scrollDecorator = [
  (Story) => (
    <div
      style={{
        padding: '2rem',
        height: 'calc(100vh * 1.5)',
        'background-color': 'var(--sbb-color-milk-default)',
        display: 'flex',
        'align-items': 'center',
      }}
    >
      <Story />
    </div>
  ),
];

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }): Promise<void> => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('form-field').shadowRoot.querySelector('div.sbb-form-field__space-wrapper')
  );

  await waitForStablePosition(() => canvas.getByTestId('autocomplete-input'));
  await userEvent.type(canvas.getByTestId('autocomplete-input'), 'Opt');
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

const createOptionGroup1 = (iconName, disableOption): JSX.Element[] => {
  return [
    <sbb-option icon-name={iconName} value="Option 1">
      Option 1
    </sbb-option>,
    <sbb-option icon-name={iconName} disabled={disableOption} value="Option 2">
      Option 2
    </sbb-option>,
    <sbb-option value="Option 3">
      <sbb-icon slot="icon" name={iconName} />
      Option 3
    </sbb-option>,
  ];
};
const createOptionGroup2 = (): JSX.Element[] => {
  return [
    <sbb-option value="Option 4">Option 4</sbb-option>,
    <sbb-option value="Option 5">Option 5</sbb-option>,
  ];
};

const textBlockStyle: Args = {
  position: 'relative',
  marginBlockStart: '1rem',
  padding: '1rem',
  backgroundColor: 'var(--sbb-color-milk-default)',
  border: 'var(--sbb-border-width-1x) solid var(--sbb-color-cloud-default)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  zIndex: '100',
};

const codeStyle: Args = {
  padding: 'var(--sbb-spacing-fixed-1x) var(--sbb-spacing-fixed-2x)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  backgroundColor: 'var(--sbb-color-smoke-alpha-20)',
};

const textBlock = (): JSX.Element => (
  <div style={textBlockStyle}>
    This text block has a <code style={codeStyle}>z-index</code> greater than the form field, but it
    must always be covered by the autocomplete overlay.
  </div>
);

const Template = (args): JSX.Element => (
  <div>
    <sbb-form-field
      borderless={args.borderless}
      floating-label={args.floatingLabel}
      label="Label"
      data-testid="form-field"
    >
      <input
        placeholder="Placeholder"
        data-testid="autocomplete-input"
        disabled={args.disabled}
        readonly={args.readonly}
      />

      <sbb-autocomplete
        disable-animation={args.disableAnimation}
        preserve-icon-space={args.preserveIconSpace}
      >
        {createOptionGroup1(args.iconName, args.disableOption)}
        {createOptionGroup2()}
      </sbb-autocomplete>
    </sbb-form-field>
    {textBlock()}
  </div>
);

const OptionGroupTemplate = (args): JSX.Element => (
  <div>
    <sbb-form-field
      borderless={args.borderless}
      floating-label={args.floatingLabel}
      label="Label"
      data-testid="form-field"
    >
      <input
        placeholder="Placeholder"
        data-testid="autocomplete-input"
        disabled={args.disabled}
        readonly={args.readonly}
      />

      <sbb-autocomplete
        disable-animation={args.disableAnimation}
        preserve-icon-space={args.preserveIconSpace}
      >
        <sbb-optgroup label="Group 1" disabled={args.disableGroup}>
          {createOptionGroup1(args.iconName, args.disableOption)}
        </sbb-optgroup>
        <sbb-optgroup label="Group 2">{createOptionGroup2()}</sbb-optgroup>
      </sbb-autocomplete>
    </sbb-form-field>
    {textBlock()}
  </div>
);

const MixedTemplate = (args): JSX.Element => (
  <div>
    <sbb-form-field
      borderless={args.borderless}
      floating-label={args.floatingLabel}
      label="Label"
      data-testid="form-field"
    >
      <input
        placeholder="Placeholder"
        data-testid="autocomplete-input"
        disabled={args.disabled}
        readonly={args.readonly}
      />

      <sbb-autocomplete
        disable-animation={args.disableAnimation}
        preserve-icon-space={args.preserveIconSpace}
      >
        <sbb-option value="Option 1">
          <sbb-icon
            slot="icon"
            name={args.iconName}
            style={{ color: 'var(--sbb-color-sky-default)' }}
          />
          Option Value
        </sbb-option>
        <sbb-optgroup label="Group 1" disabled={args.disableGroup}>
          {createOptionGroup1(args.iconName, args.disableOption)}
        </sbb-optgroup>
        <sbb-optgroup label="Group 2">{createOptionGroup2()}</sbb-optgroup>
      </sbb-autocomplete>
    </sbb-form-field>
    {textBlock()}
  </div>
);

const RequiredTemplate = (args): JSX.Element => {
  const sbbFormError = <sbb-form-error>This is a required field.</sbb-form-error>;

  return (
    <div>
      <sbb-form-field
        borderless={args.borderless}
        floating-label={args.floatingLabel}
        label="Label"
        data-testid="form-field"
        id="sbb-form-field"
      >
        <input
          id="sbb-autocomplete"
          data-testid="autocomplete-input"
          class="sbb-invalid"
          placeholder="Placeholder"
          disabled={args.disabled}
          readonly={args.readonly}
          onChange={(event) => {
            if ((event.currentTarget as HTMLInputElement).value !== '') {
              sbbFormError.remove();
              document.getElementById('sbb-autocomplete').classList.remove('sbb-invalid');
            } else {
              document.getElementById('sbb-form-field').append(sbbFormError);
              document.getElementById('sbb-autocomplete').classList.add('sbb-invalid');
            }
          }}
        />

        <sbb-autocomplete
          disable-animation={args.disableAnimation}
          preserve-icon-space={args.preserveIconSpace}
        >
          <sbb-optgroup label="Group 1" disabled={args.disableGroup}>
            {createOptionGroup1(args.iconName, args.disableOption)}
          </sbb-optgroup>
          <sbb-optgroup label="Group 2">{createOptionGroup2()}</sbb-optgroup>
        </sbb-autocomplete>
        {sbbFormError}
      </sbb-form-field>
      {textBlock()}
    </div>
  );
};

export const Basic: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: defaultDecorator,
  play: isChromatic() && playStory,
};

export const BasicOpenAbove: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: aboveDecorator,
  play: isChromatic() && playStory,
};

export const Borderless: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
  decorators: defaultDecorator,
  play: isChromatic() && playStory,
};

export const FloatingLabel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, floatingLabel: true },
  decorators: defaultDecorator,
  play: isChromatic() && playStory,
};

export const WithError: StoryObj = {
  render: RequiredTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs },
  decorators: defaultDecorator,
  play: isChromatic() && playStory,
};

export const Disabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
  decorators: defaultDecorator,
  play: isChromatic() && playStory,
};

export const Readonly: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, readonly: true },
  decorators: defaultDecorator,
  play: isChromatic() && playStory,
};

export const BorderlessOpenAbove: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
  decorators: aboveDecorator,
  play: isChromatic() && playStory,
};

export const NoIconSpace: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, preserveIconSpace: false },
  decorators: defaultDecorator,
  play: isChromatic() && playStory,
};

export const Scroll: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
  decorators: scrollDecorator,
  play: isChromatic() && playStory,
};

export const WithOptionGroup: StoryObj = {
  render: OptionGroupTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs },
  decorators: defaultDecorator,
  play: isChromatic() && playStory,
};

export const WithOptionGroupOpenAbove: StoryObj = {
  render: OptionGroupTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs },
  decorators: aboveDecorator,
  play: isChromatic() && playStory,
};

export const MixedSingleOptionWithOptionGroup: StoryObj = {
  render: MixedTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs },
  decorators: defaultDecorator,
  play: isChromatic() && playStory,
};

const meta: Meta = {
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: {
      handles: [events.willOpen, events.didOpen, events.didClose, events.willClose, 'change'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-autocomplete',
};

export default meta;
