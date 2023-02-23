import { h } from 'jsx-dom';
import events from './sbb-autocomplete.events.ts';
import readme from './readme.md';

const value = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  value,
};

const defaultArgs = {
  value: 'test',
};

const Template = (args) => [
  <sbb-form-field label="Label">
    <input placeholder="Placeholder" />

    <sbb-autocomplete {...args}>
      <sbb-option icon-name="clock-small">Option 1</sbb-option>
      <sbb-option icon-name="clock-small">Option 2</sbb-option>
      <sbb-divider />
      <sbb-option icon-name="clock-small">Option 3</sbb-option>
      <sbb-divider />
      <sbb-option>Option 4</sbb-option>
      <sbb-option>Option 5</sbb-option>
    </sbb-autocomplete>
  </sbb-form-field>,
];

const BorderlessTemplate = (args) => [
  <sbb-form-field borderless label="Label">
    <input placeholder="Placeholder" />

    <sbb-autocomplete {...args}>
      <sbb-option icon-name="clock-small">Option 1</sbb-option>
      <sbb-option icon-name="clock-small">Option 2</sbb-option>
      <sbb-divider />
      <sbb-option icon-name="clock-small">Option 3</sbb-option>
      <sbb-divider />
      <sbb-option>Option 4</sbb-option>
      <sbb-option>Option 5</sbb-option>
    </sbb-autocomplete>
  </sbb-form-field>,
];

export const Basic = Template.bind({});
Basic.argTypes = defaultArgTypes;
Basic.args = { ...defaultArgs };
Basic.decorators = [
  (Story) => (
    <div style={'padding: 2rem; height: calc(100vh - 4rem); background-color: #e6e6e6;'}>
      <Story />
    </div>
  ),
];

export const BasicOpenAbove = Template.bind({});
BasicOpenAbove.argTypes = defaultArgTypes;
BasicOpenAbove.args = { ...defaultArgs };
BasicOpenAbove.decorators = [
  (Story) => (
    <div style={'padding: 2rem; height: calc(100vh - 4rem); background-color: #e6e6e6;'}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Story />
    </div>
  ),
];

export const Borderless = BorderlessTemplate.bind({});
Borderless.argTypes = defaultArgTypes;
Borderless.args = { ...defaultArgs };
Borderless.decorators = [
  (Story) => (
    <div style={'padding: 2rem; height: calc(100vh - 4rem); background-color: #e6e6e6;'}>
      <Story />
    </div>
  ),
];

export const BorderlessOpenAbove = BorderlessTemplate.bind({});
BorderlessOpenAbove.argTypes = defaultArgTypes;
BorderlessOpenAbove.args = { ...defaultArgs };
BorderlessOpenAbove.decorators = [
  (Story) => (
    <div style={'padding: 2rem; height: calc(100vh - 4rem); background-color: #e6e6e6;'}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Story />
    </div>
  ),
];

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
