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

const iconName = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option',
  },
};

const preserveIconSpace = {
  control: {
    type: 'inline-radio',
  },
  options: ['false', 'true'],
  table: {
    category: 'Option',
  },
};

const disableLabelHighlight = {
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

const defaultArgTypes = {
  // Autocomplete args
  disableAnimation: disableAnimation,

  // Option args
  iconName: iconName,
  preserveIconSpace: preserveIconSpace,
  disableLabelHighlight: disableLabelHighlight,

  // Form field args
  borderless: borderless,
};

const defaultArgs = {
  // Autocomplete args
  disableAnimation: false,

  // Option args
  iconName: 'clock-small',
  preserveIconSpace: 'true',
  disableLabelHighlight: false,

  // Form field args
  borderless: false,
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

    <sbb-autocomplete disable-animation={args.disableAnimation}>
      <sbb-option
        icon-name={args.iconName}
        preserve-icon-space={args.preserveIconSpace}
        disable-label-highlight={args.disableLabelHighlight}
        value="Option 1"
      >
        Option 1
      </sbb-option>
      <sbb-option
        icon-name={args.iconName}
        preserve-icon-space={args.preserveIconSpace}
        disable-label-highlight={args.disableLabelHighlight}
        value="Option 2"
      >
        Option 2
      </sbb-option>

      <sbb-divider />

      <sbb-option
        preserve-icon-space={args.preserveIconSpace}
        disable-label-highlight={args.disableLabelHighlight}
        value="Option 2"
      >
        <sbb-icon slot="icon" name={args.iconName} />
        Option 3
      </sbb-option>

      <sbb-divider />

      <sbb-option
        preserve-icon-space={args.preserveIconSpace}
        disable-label-highlight={args.disableLabelHighlight}
        value="Option 4"
      >
        Option 4
      </sbb-option>
      <sbb-option
        preserve-icon-space={args.preserveIconSpace}
        disable-label-highlight={args.disableLabelHighlight}
        value="Option 5"
      >
        Option 5
      </sbb-option>
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

export const Scroll = Template.bind({});
Scroll.argTypes = defaultArgTypes;
Scroll.args = { ...defaultArgs };
Scroll.decorators = scrollDecorator;

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
  title: 'components/autocomplete/sbb-autocomplete',
};
