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

// TODO parametrize template
// const TemplateInputField = (args, autocomplete) => (
//   <sbb-form-field label="Label">
//     <input placeholder="Placeholder"/>
//     {autocomplete(args)}
//   </sbb-form-field>
// );

const Template = (args) => [
  <sbb-form-field data-autocomplete-origin data-autocomplete-open label="Label">
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
  <sbb-form-field borderless data-autocomplete-origin data-autocomplete-open label="Label">
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

export const Borderless = BorderlessTemplate.bind({});
Borderless.argTypes = defaultArgTypes;
Borderless.args = { ...defaultArgs };

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem; height: calc(100vh - 4rem); background-color: #e6e6e6;'}>
        <Story />
      </div>
    ),
  ],
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
