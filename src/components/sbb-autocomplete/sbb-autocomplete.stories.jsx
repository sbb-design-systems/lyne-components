import { h } from 'jsx-dom';
import events from './sbb-autocomplete.events';
import readme from './readme.md';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';
import isChromatic from 'chromatic';

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

const disabled = {
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

const disabledFromGroup = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
  },
};

const defaultArgTypes = {
  // Autocomplete args
  disableAnimation,
  preserveIconSpace,

  // Option args
  iconName,
  disabled,

  // Form field args
  borderless,

  // Option group args
  disabledFromGroup,
};

const defaultArgs = {
  // Autocomplete args
  disableAnimation: isChromatic(),

  // Option args
  iconName: 'clock-small',
  preserveIconSpace: true,
  disabled: false,

  // Form field args
  borderless: false,

  // Option group args
  disabledFromGroup: false,
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

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('form-field').shadowRoot.querySelector('div.sbb-form-field__space-wrapper')
  );

  const label = await canvas.getByLabelText('Label');
  userEvent.click(label);
};

const createOptionGroup1 = (iconName, disabled) => {
  return [
    <sbb-option icon-name={iconName} value="Option 1">
      Option 1
    </sbb-option>,
    <sbb-option icon-name={iconName} disabled={disabled} value="Option 2">
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
      <input placeholder="Placeholder" />

      <sbb-autocomplete
        disable-animation={args.disableAnimation}
        preserve-icon-space={args.preserveIconSpace}
      >
        {createOptionGroup1(args.iconName, args.disabled)}
        {createOptionGroup2()}
      </sbb-autocomplete>
    </sbb-form-field>
    {textBlock()}
  </div>,
];

const OptionGroupTemplate = (args) => [
  <div>
    <sbb-form-field borderless={args.borderless} label="Label" data-testid="form-field">
      <input placeholder="Placeholder" />

      <sbb-autocomplete
        disable-animation={args.disableAnimation}
        preserve-icon-space={args.preserveIconSpace}
      >
        <sbb-option-group label="Group 1" disabled={args.disabledFromGroup}>
          {createOptionGroup1(args.iconName, args.disabled)}
        </sbb-option-group>
        <sbb-option-group label="Group 2">{createOptionGroup2()}</sbb-option-group>
      </sbb-autocomplete>
    </sbb-form-field>
    {textBlock()}
  </div>,
];

const MixedTemplate = (args) => [
  <div>
    <sbb-form-field borderless={args.borderless} label="Label" data-testid="form-field">
      <input placeholder="Placeholder" />

      <sbb-autocomplete
        disable-animation={args.disableAnimation}
        preserve-icon-space={args.preserveIconSpace}
      >
        <sbb-option value="Option 1">
          <sbb-icon slot="icon" name={args.iconName} style="color: #0279c7;" />
          Option Value
        </sbb-option>
        <sbb-option-group label="Group 1" disabled={args.disabledFromGroup}>
          {createOptionGroup1(args.iconName, args.disabled)}
        </sbb-option-group>
        <sbb-option-group label="Group 2">{createOptionGroup2()}</sbb-option-group>
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
          class="sbb-invalid"
          placeholder="Placeholder"
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
          <sbb-option-group label="Group 1" disabled={args.disabledFromGroup}>
            {createOptionGroup1(args.iconName, args.disabled)}
          </sbb-option-group>
          <sbb-option-group label="Group 2">{createOptionGroup2()}</sbb-option-group>
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
WithError.argTypes = defaultArgTypes;
WithError.args = { ...defaultArgs };
WithError.decorators = defaultDecorator;
WithError.play = isChromatic() && playStory;

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

export const Scroll = Template.bind({});
Scroll.argTypes = defaultArgTypes;
Scroll.args = { ...defaultArgs, borderless: true };
Scroll.decorators = scrollDecorator;
Scroll.play = isChromatic() && playStory;

export const WithOptionGroup = OptionGroupTemplate.bind({});
WithOptionGroup.argTypes = defaultArgTypes;
WithOptionGroup.args = { ...defaultArgs };
WithOptionGroup.decorators = defaultDecorator;
WithOptionGroup.play = isChromatic() && playStory;

export const WithOptionGroupOpenAbove = OptionGroupTemplate.bind({});
WithOptionGroupOpenAbove.argTypes = defaultArgTypes;
WithOptionGroupOpenAbove.args = { ...defaultArgs };
WithOptionGroupOpenAbove.decorators = aboveDecorator;
WithOptionGroupOpenAbove.play = isChromatic() && playStory;

export const MixedSingleOptionWithOptionGroup = MixedTemplate.bind({});
MixedSingleOptionWithOptionGroup.argTypes = defaultArgTypes;
MixedSingleOptionWithOptionGroup.args = { ...defaultArgs };
MixedSingleOptionWithOptionGroup.decorators = defaultDecorator;
MixedSingleOptionWithOptionGroup.play = isChromatic() && playStory;

export default {
  parameters: {
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
  title: 'components/sbb-autocomplete',
};
