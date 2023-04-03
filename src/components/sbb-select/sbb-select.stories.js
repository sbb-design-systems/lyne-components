import events from './sbb-select.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const value = {
  control: {
    type: 'inline-radio',
  },
  options: ['Option 1', 'Option 2'],
};

const multiple = {
  control: {
    type: 'boolean',
  },
};

const placeholder = {
  control: {
    type: 'text',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
};

const readonly = {
  control: {
    type: 'boolean',
  },
};

const disableAnimation = {
  control: {
    type: 'boolean',
  },
};

const withOptionGroup = {
  control: {
    type: 'boolean',
  },
};

const numberOfOptions = {
  control: {
    type: 'number',
  },
};

const defaultArgTypes = {
  value,
  multiple,
  placeholder,
  disabled,
  readonly,
  'disable-animation': disableAnimation,
  numberOfOptions,
  withOptionGroup,
};

const defaultArgs = {
  value: undefined,
  multiple: false,
  placeholder: 'Please select value.',
  disabled: false,
  readonly: false,
  'disable-animation': false,
  numberOfOptions: 5,
  withOptionGroup: false,
};

const changeEventHandler = (event) => {
  const div = document.createElement('div');
  div.innerText = `current value is: ${event.target.value}`;
  document.getElementById('container-value').prepend(div);
};

const createOptions = (numberOfOptions) => {
  return new Array(numberOfOptions).fill(null).map((_, i) => {
    return <sbb-option value={`Option ${i + 1}`}>{`Option ${i + 1}`}</sbb-option>;
  });
};

const createOptionsGroup = (numberOfOptions) => {
  return [
    <sbb-option-group label="Group 1">{createOptions(numberOfOptions)}</sbb-option-group>,
    <sbb-option-group label="Group 2">{createOptions(numberOfOptions)}</sbb-option-group>,
  ];
};

const SelectTemplate = ({ numberOfOptions, withOptionGroup, ...args }) => {
  if (args.multiple && args.value) {
    args.value = [args.value];
  }
  return (
    <sbb-select {...args} onChange={(event) => changeEventHandler(event)}>
      {withOptionGroup ? createOptionsGroup(numberOfOptions) : createOptions(numberOfOptions)}
    </sbb-select>
  );
};

const StandaloneTemplate = (args) => [
  <div>{SelectTemplate(args)}</div>,
  <div id="container-value" style="margin-block-start: 2rem;"></div>,
];

const FormFieldTemplate = (args) => [
  <sbb-form-field label="Select">{SelectTemplate(args)}</sbb-form-field>,
  <div id="container-value" style="margin-block-start: 2rem;"></div>,
];

export const Standalone = StandaloneTemplate.bind({});
Standalone.argTypes = defaultArgTypes;
Standalone.args = { ...defaultArgs, placeholder: 'Please select:' };

export const FormFieldSingleSelect = FormFieldTemplate.bind({});
FormFieldSingleSelect.argTypes = defaultArgTypes;
FormFieldSingleSelect.args = { ...defaultArgs };

export const FormFieldMultipleSelect = FormFieldTemplate.bind({});
FormFieldMultipleSelect.argTypes = defaultArgTypes;
FormFieldMultipleSelect.args = { ...defaultArgs, multiple: true };

export const FormFieldSingleSelectGroup = FormFieldTemplate.bind({});
FormFieldSingleSelectGroup.argTypes = defaultArgTypes;
FormFieldSingleSelectGroup.args = { ...defaultArgs, withOptionGroup: true };

export const FormFieldMultipleSelectGroup = FormFieldTemplate.bind({});
FormFieldMultipleSelectGroup.argTypes = defaultArgTypes;
FormFieldMultipleSelectGroup.args = { ...defaultArgs, multiple: true, withOptionGroup: true };

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem; background-color: #e6e6e6;'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: [events.change, events.didClose, events.didOpen, events.willClose, events.willOpen],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-select',
};
