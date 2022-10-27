import events from './sbb-radio-button-group.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const name = {
  control: {
    type: 'text',
  },
};

const value = {
  control: {
    type: 'text',
  },
};

const required = {
  control: {
    type: 'boolean',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
};

const allowEmptySelection = {
  control: {
    type: 'boolean',
  },
};

const orientation = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const defaultArgTypes = {
  name: name,
  value: value,
  required: required,
  disabled: disabled,
  'allow-empty-selection': allowEmptySelection,
  orientation: orientation,
};

const defaultArgs = {
  name: 'radio-group-name',
  value: 'Value two',
  required: false,
  disabled: false,
  'allow-empty-selection': false,
  orientation: orientation.options[0],
};

const radioButtons = () => [
  <sbb-radio-button value="Value one">Value one</sbb-radio-button>,
  <sbb-radio-button value="Value two">Value two</sbb-radio-button>,
  <sbb-radio-button value="Value three" disabled>
    Value three
  </sbb-radio-button>,
  <sbb-radio-button value="Value four">Value four</sbb-radio-button>,
];

const DefaultTemplate = (args) => [
  <sbb-radio-button-group {...args}>{radioButtons()}</sbb-radio-button-group>,
];

const ErrorMessageTemplate = (args) => {
  const sbbFormError = <sbb-form-error slot="error">This is a required field.</sbb-form-error>;

  return (
    <sbb-radio-button-group
      {...args}
      id="sbb-radio-group"
      onSbb-radio-button-group_did-change={(event) => {
        if (event.detail.value) {
          sbbFormError.remove();
        } else if (args.required) {
          document.getElementById('sbb-radio-group').append(sbbFormError);
        }
      }}
    >
      {radioButtons()}
      {args.required && sbbFormError}
    </sbb-radio-button-group>
  );
};

export const Horizontal = DefaultTemplate.bind({});
Horizontal.argTypes = defaultArgTypes;
Horizontal.args = { ...defaultArgs };
Horizontal.documentation = { title: 'Horizontal Orientation' };

export const Vertical = DefaultTemplate.bind({});
Vertical.argTypes = defaultArgTypes;
Vertical.args = { ...defaultArgs, orientation: orientation.options[1] };
Vertical.documentation = { title: 'Vertical Orientation' };

export const Disabled = DefaultTemplate.bind({});
Disabled.argTypes = defaultArgTypes;
Disabled.args = { ...defaultArgs, disabled: true };
Disabled.documentation = { title: 'Disabled Radio Group' };

export const AllowEmptySelection = DefaultTemplate.bind({});
AllowEmptySelection.argTypes = defaultArgTypes;
AllowEmptySelection.args = { ...defaultArgs, value: undefined, 'allow-empty-selection': true };
AllowEmptySelection.documentation = { title: 'Allow Empty Selection Radio Group' };

export const ErrorMessage = ErrorMessageTemplate.bind({});
ErrorMessage.argTypes = defaultArgTypes;
ErrorMessage.args = {
  ...defaultArgs,
  value: undefined,
  required: true,
  'allow-empty-selection': true,
};
ErrorMessage.documentation = { title: 'Error Message Radio Group' };

export const ErrorMessageVertical = ErrorMessageTemplate.bind({});
ErrorMessageVertical.argTypes = defaultArgTypes;
ErrorMessageVertical.args = {
  ...defaultArgs,
  value: undefined,
  required: true,
  orientation: orientation.options[1],
  'allow-empty-selection': true,
};
ErrorMessageVertical.documentation = { title: 'Error Message Vertical Radio Group' };

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: [events.didChange],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/radio/sbb-radio-button-group',
};
