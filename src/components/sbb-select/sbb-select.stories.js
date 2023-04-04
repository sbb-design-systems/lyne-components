import events from './sbb-select.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';
import isChromatic from 'chromatic';

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('form-field').shadowRoot.querySelector('div.sbb-form-field__space-wrapper')
  );

  const label = await canvas.getByTestId('select');
  userEvent.click(label);
};

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

const numberOfOptions = {
  control: {
    type: 'number',
  },
};

const disableOption = {
  control: {
    type: 'boolean',
  },
};

const withOptionGroup = {
  control: {
    type: 'boolean',
  },
};

const disableGroup = {
  control: {
    type: 'boolean',
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
  disableOption,
  withOptionGroup,
  disableGroup,
};

const defaultArgs = {
  value: undefined,
  multiple: false,
  placeholder: 'Please select value.',
  disabled: false,
  readonly: false,
  'disable-animation': isChromatic(),
  numberOfOptions: 5,
  disableOption: false,
  withOptionGroup: false,
  disableGroup: false,
};

const changeEventHandler = (event) => {
  const div = document.createElement('div');
  div.innerText = `current value is: ${event.target.value}`;
  document.getElementById('container-value').append(div);
};

const createOptions = (numberOfOptions, disableOption, group) => {
  return new Array(numberOfOptions).fill(null).map((_, i) => {
    const value = group ? `Option ${i + 1} ${' - ' + group}` : `Option ${i + 1}`;
    return (
      <sbb-option value={value} disabled={disableOption && i < 2}>
        {value}
      </sbb-option>
    );
  });
};

const createOptionsGroup = (numberOfOptions, disableOption, disableGroup) => {
  return [
    <sbb-option-group label="Group 1" disabled={disableGroup}>
      {createOptions(numberOfOptions, disableOption, '1')}
    </sbb-option-group>,
    <sbb-option-group label="Group 2">
      {createOptions(numberOfOptions, disableOption, '2')}
    </sbb-option-group>,
  ];
};

const SelectTemplate = ({
  numberOfOptions,
  disableOption,
  withOptionGroup,
  disableGroup,
  ...args
}) => {
  if (args.multiple && args.value) {
    args.value = [args.value];
  }
  return (
    <sbb-select {...args} onChange={(event) => changeEventHandler(event)} data-testid="select">
      {withOptionGroup
        ? createOptionsGroup(numberOfOptions, disableOption, disableGroup)
        : createOptions(numberOfOptions, disableOption)}
    </sbb-select>
  );
};

const FormFieldTemplate = (args) => [
  <div style="padding: 2rem; background-color: #e6e6e6;">
    <sbb-form-field label="Select" data-testid="form-field">
      {SelectTemplate(args)}
    </sbb-form-field>
  </div>,
  <div id="container-value" style="margin-block-start: 2rem;"></div>,
];

export const FormFieldSingleSelect = FormFieldTemplate.bind({});
FormFieldSingleSelect.argTypes = defaultArgTypes;
FormFieldSingleSelect.args = { ...defaultArgs };
FormFieldSingleSelect.play = isChromatic() && playStory;

export const FormFieldMultipleSelect = FormFieldTemplate.bind({});
FormFieldMultipleSelect.argTypes = defaultArgTypes;
FormFieldMultipleSelect.args = { ...defaultArgs, multiple: true };
FormFieldMultipleSelect.play = isChromatic() && playStory;

export const FormFieldSingleSelectGroup = FormFieldTemplate.bind({});
FormFieldSingleSelectGroup.argTypes = defaultArgTypes;
FormFieldSingleSelectGroup.args = { ...defaultArgs, withOptionGroup: true };
FormFieldSingleSelectGroup.play = isChromatic() && playStory;

export const FormFieldMultipleSelectGroup = FormFieldTemplate.bind({});
FormFieldMultipleSelectGroup.argTypes = defaultArgTypes;
FormFieldMultipleSelectGroup.args = { ...defaultArgs, multiple: true, withOptionGroup: true };
FormFieldMultipleSelectGroup.play = isChromatic() && playStory;

export default {
  decorators: [
    (Story) => (
      <div>
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
