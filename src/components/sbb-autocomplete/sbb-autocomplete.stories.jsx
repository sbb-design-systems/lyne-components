import { h } from 'jsx-dom';
import events from './sbb-autocomplete.events';
import readme from './readme.md';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';
import isChromatic from 'chromatic/isChromatic';
import { waitForStablePosition } from '../../global/helpers/testing/wait-for-stable-position';

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('form-field').shadowRoot.querySelector('div.sbb-form-field__space-wrapper')
  );

  await waitForStablePosition(() => canvas.getByTestId('autocomplete-input'));
  await userEvent.type(canvas.getByTestId('autocomplete-input'), 'Opt');
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

const disabled = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const readonly = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const disableAnimation = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const preserveIconSpace = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const iconName = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option',
  },
};

const disableOption = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option',
  },
};

const borderless = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const disableGroup = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
  },
};

const defaultArgTypes = {
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
};

const withGroupsArgTypes = {
  ...defaultArgTypes,

  // Option group args
  disableGroup,
};

const defaultArgs = {
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
};

const withGroupsDefaultArgs = {
  ...defaultArgs,

  // Option group args
  disableGroup: false,
};

const defaultDecorator = [
  (Story) => (
    <div style={'padding: 2rem; height: calc(100vh - 2rem);'}>
      <Story />
    </div>
  ),
];

const aboveDecorator = [
  (Story) => (
    <div style={'padding: 2rem; height: calc(100vh - 2rem); display: flex; align-items: end'}>
      <Story />
    </div>
  ),
];

const scrollDecorator = [
  (Story) => (
    <div
      style={
        'padding: 2rem; height: calc(100vh * 1.5); background-color: var(--sbb-color-milk-default); display: flex; align-items: center'
      }
    >
      <Story />
    </div>
  ),
];

const createOptionGroup1 = (iconName, disableOption) => {
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
const createOptionGroup2 = () => {
  return [
    <sbb-option value="Option 4">Option 4</sbb-option>,
    <sbb-option value="Option 5">Option 5</sbb-option>,
  ];
};

const textBlockStyle = {
  position: 'relative',
  marginBlockStart: '1rem',
  padding: '1rem',
  backgroundColor: 'var(--sbb-color-milk-default)',
  border: 'var(--sbb-border-width-1x) solid var(--sbb-color-cloud-default)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  zIndex: '100',
};

const codeStyle = {
  padding: 'var(--sbb-spacing-fixed-1x) var(--sbb-spacing-fixed-2x)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  backgroundColor: 'var(--sbb-color-smoke-alpha-20)',
};

const textBlock = () => {
  return (
    <div style={textBlockStyle}>
      This text block has a <code style={codeStyle}>z-index</code> greater than the form field, but
      it must always be covered by the autocomplete overlay.
    </div>
  );
};

const Template = (args) => [
  <div>
    <sbb-form-field borderless={args.borderless} label="Label" data-testid="form-field">
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
  </div>,
];

const OptionGroupTemplate = (args) => [
  <div>
    <sbb-form-field borderless={args.borderless} label="Label" data-testid="form-field">
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
  </div>,
];

const MixedTemplate = (args) => [
  <div>
    <sbb-form-field borderless={args.borderless} label="Label" data-testid="form-field">
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
          <sbb-icon slot="icon" name={args.iconName} style="color: #0279c7;" />
          Option Value
        </sbb-option>
        <sbb-optgroup label="Group 1" disabled={args.disableGroup}>
          {createOptionGroup1(args.iconName, args.disableOption)}
        </sbb-optgroup>
        <sbb-optgroup label="Group 2">{createOptionGroup2()}</sbb-optgroup>
      </sbb-autocomplete>
    </sbb-form-field>
    {textBlock()}
  </div>,
];

const RequiredTemplate = (args) => {
  const sbbFormError = <sbb-form-error>This is a required field.</sbb-form-error>;

  return [
    <div>
      <sbb-form-field
        borderless={args.borderless}
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
            if (event.currentTarget.value !== '') {
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
    </div>,
  ];
};

export const Basic = Template.bind({});
Basic.argTypes = defaultArgTypes;
Basic.args = { ...defaultArgs };
Basic.decorators = defaultDecorator;
Basic.play = isChromatic() && playStory;

export const BasicOpenAbove = Template.bind({});
BasicOpenAbove.argTypes = defaultArgTypes;
BasicOpenAbove.args = { ...defaultArgs };
BasicOpenAbove.decorators = aboveDecorator;
BasicOpenAbove.play = isChromatic() && playStory;

export const Borderless = Template.bind({});
Borderless.argTypes = defaultArgTypes;
Borderless.args = { ...defaultArgs, borderless: true };
Borderless.decorators = defaultDecorator;
Borderless.play = isChromatic() && playStory;

export const WithError = RequiredTemplate.bind({});
WithError.argTypes = withGroupsArgTypes;
WithError.args = { ...withGroupsDefaultArgs };
WithError.decorators = defaultDecorator;
WithError.play = isChromatic() && playStory;

export const Disabled = Template.bind({});
Disabled.argTypes = defaultArgTypes;
Disabled.args = { ...defaultArgs, disabled: true };
Disabled.decorators = defaultDecorator;
Disabled.play = isChromatic() && playStory;

export const Readonly = Template.bind({});
Readonly.argTypes = defaultArgTypes;
Readonly.args = { ...defaultArgs, readonly: true };
Readonly.decorators = defaultDecorator;
Readonly.play = isChromatic() && playStory;

export const BorderlessOpenAbove = Template.bind({});
BorderlessOpenAbove.argTypes = defaultArgTypes;
BorderlessOpenAbove.args = { ...defaultArgs, borderless: true };
BorderlessOpenAbove.decorators = aboveDecorator;
BorderlessOpenAbove.play = isChromatic() && playStory;

export const NoIconSpace = Template.bind({});
NoIconSpace.argTypes = defaultArgTypes;
NoIconSpace.args = { ...defaultArgs, preserveIconSpace: false };
NoIconSpace.decorators = defaultDecorator;
NoIconSpace.play = isChromatic() && playStory;

export const InScrollContainer = Template.bind({});
InScrollContainer.argTypes = defaultArgTypes;
InScrollContainer.args = { ...defaultArgs, borderless: true };
InScrollContainer.decorators = scrollDecorator;
InScrollContainer.play = isChromatic() && playStory;

export const WithOptionGroup = OptionGroupTemplate.bind({});
WithOptionGroup.argTypes = withGroupsArgTypes;
WithOptionGroup.args = { ...withGroupsDefaultArgs };
WithOptionGroup.decorators = defaultDecorator;
WithOptionGroup.play = isChromatic() && playStory;

export const WithOptionGroupOpenAbove = OptionGroupTemplate.bind({});
WithOptionGroupOpenAbove.argTypes = withGroupsArgTypes;
WithOptionGroupOpenAbove.args = { ...withGroupsDefaultArgs };
WithOptionGroupOpenAbove.decorators = aboveDecorator;
WithOptionGroupOpenAbove.play = isChromatic() && playStory;

export const MixedSingleOptionWithOptionGroup = MixedTemplate.bind({});
MixedSingleOptionWithOptionGroup.argTypes = withGroupsArgTypes;
MixedSingleOptionWithOptionGroup.args = { ...withGroupsDefaultArgs };
MixedSingleOptionWithOptionGroup.decorators = defaultDecorator;
MixedSingleOptionWithOptionGroup.play = isChromatic() && playStory;

export default {
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
