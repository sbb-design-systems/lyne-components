import { h } from 'jsx-dom';
import events from './sbb-autocomplete.events.ts';
import readme from './readme.md';

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
  disableAnimation: false,

  // Option args
  iconName: 'clock-small',
  preserveIconSpace: false,
  disabled: false,

  // Form field args
  borderless: false,

  // Option group args
  disabledFromGroup: false,
};

const defaultDecorator = [
  (Story) => (
    <div style={'padding: 2rem; height: calc(100vh - 4rem); background-color: #e6e6e6;'}>
      <Story />
    </div>
  ),
];

const aboveDecorator = [
  (Story) => (
    <div
      style={
        'padding: 2rem; height: calc(100vh - 4rem); background-color: #e6e6e6; display: flex; align-items: end'
      }
    >
      <Story />
    </div>
  ),
];

const scrollDecorator = [
  (Story) => (
    <div
      style={
        'padding: 2rem; height: calc(100vh * 1.5); background-color: #e6e6e6; display: flex; align-items: center'
      }
    >
      <Story />
    </div>
  ),
];

const Template = (args) => [
  <sbb-form-field borderless={args.borderless} label="Label">
    <input placeholder="Placeholder" />

    <sbb-autocomplete
      disable-animation={args.disableAnimation}
      preserve-icon-space={args.preserveIconSpace}
    >
      <sbb-option icon-name={args.iconName} value="Option 1">
        Option 1
      </sbb-option>
      <sbb-option icon-name={args.iconName} disabled={args.disabled} value="Option 2">
        Option 2
      </sbb-option>
      <sbb-option value="Option 3">
        <sbb-icon slot="icon" name={args.iconName} />
        Option 3
      </sbb-option>
      <sbb-option value="Option 4">Option 4</sbb-option>
      <sbb-option value="Option 5">Option 5</sbb-option>
    </sbb-autocomplete>
  </sbb-form-field>,
];

const OptionGroupTemplate = (args) => [
  <sbb-form-field borderless={args.borderless} label="Label">
    <input placeholder="Placeholder" />

    <sbb-autocomplete
      disable-animation={args.disableAnimation}
      preserve-icon-space={args.preserveIconSpace}
    >
      <sbb-option-group label="Group 1" disabled={args.disabledFromGroup}>
        <sbb-option icon-name={args.iconName} value="Option 1">
          Option 1
        </sbb-option>
        <sbb-option icon-name={args.iconName} disabled={args.disabled} value="Option 2">
          Option 2
        </sbb-option>
        <sbb-option value="Option 3">
          <sbb-icon slot="icon" name={args.iconName} />
          Option 3
        </sbb-option>
      </sbb-option-group>
      <sbb-option-group label="Group 2">
        <sbb-option value="Option 4">Option 4</sbb-option>
        <sbb-option value="Option 5">Option 5</sbb-option>
      </sbb-option-group>
    </sbb-autocomplete>
  </sbb-form-field>,
];

export const Basic = Template.bind({});
Basic.argTypes = defaultArgTypes;
Basic.args = { ...defaultArgs };
Basic.decorators = defaultDecorator;

export const BasicOpenAbove = Template.bind({});
BasicOpenAbove.argTypes = defaultArgTypes;
BasicOpenAbove.args = { ...defaultArgs };
BasicOpenAbove.decorators = aboveDecorator;

export const Borderless = Template.bind({});
Borderless.argTypes = defaultArgTypes;
Borderless.args = { ...defaultArgs, borderless: true };
Borderless.decorators = defaultDecorator;

export const BorderlessOpenAbove = Template.bind({});
BorderlessOpenAbove.argTypes = defaultArgTypes;
BorderlessOpenAbove.args = { ...defaultArgs, borderless: true };
BorderlessOpenAbove.decorators = aboveDecorator;

export const PreserveIconSpace = Template.bind({});
PreserveIconSpace.argTypes = defaultArgTypes;
PreserveIconSpace.args = { ...defaultArgs, preserveIconSpace: true };
PreserveIconSpace.decorators = defaultDecorator;

export const Scroll = Template.bind({});
Scroll.argTypes = defaultArgTypes;
Scroll.args = { ...defaultArgs };
Scroll.decorators = scrollDecorator;

export const WithOptionGroup = OptionGroupTemplate.bind({});
WithOptionGroup.argTypes = defaultArgTypes;
WithOptionGroup.args = { ...defaultArgs };
WithOptionGroup.decorators = defaultDecorator;

export default {
  parameters: {
    actions: {
      handles: [events.willOpen, events.didOpen, events.didClose, events.willClose],
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
