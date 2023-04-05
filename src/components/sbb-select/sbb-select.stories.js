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

const borderless = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const value = {
  control: {
    type: 'inline-radio',
  },
  options: ['Option 1', 'Option 2'],
  table: {
    category: 'Select',
  },
};

const multiple = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const placeholder = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Select',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const required = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const readonly = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const disableAnimation = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const numberOfOptions = {
  control: {
    type: 'number',
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

const withOptionGroup = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
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
  borderless,
  value,
  multiple,
  placeholder,
  disabled,
  required,
  readonly,
  'disable-animation': disableAnimation,
  numberOfOptions,
  disableOption,
  withOptionGroup,
  disableGroup,
};

const defaultArgs = {
  borderless: false,
  value: undefined,
  multiple: false,
  placeholder: 'Please select value.',
  disabled: false,
  required: false,
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

const createOptions = (numberOfOptions, disableOption, group, selectValue) => {
  return new Array(numberOfOptions).fill(null).map((_, i) => {
    const value = group ? `Option ${i + 1} ${' - ' + group}` : `Option ${i + 1}`;
    const selected = Array.isArray(selectValue)
      ? selectValue.includes(value)
      : selectValue === value;
    return (
      <sbb-option value={value} disabled={disableOption && i < 2} selected={selected}>
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
        : createOptions(numberOfOptions, disableOption, false, args.value)}
    </sbb-select>
  );
};

const FormFieldTemplate = ({ borderless, ...args }) => [
  <div style="padding: 2rem; background-color: #e6e6e6;">
    <sbb-form-field borderless={borderless} label="Select" data-testid="form-field">
      {SelectTemplate(args)}
    </sbb-form-field>
  </div>,
  <div id="container-value" style="margin-block-start: 2rem;"></div>,
];

const FormFieldTemplateWithError = ({
  borderless,
  numberOfOptions,
  disableOption,
  withOptionGroup,
  disableGroup,
  ...args
}) => {
  if (args.multiple && args.value) {
    args.value = [args.value];
  }
  const sbbFormError = <sbb-form-error>Error</sbb-form-error>;
  return (
    <div style="padding: 2rem; background-color: #e6e6e6;">
      <sbb-form-field
        borderless={borderless}
        id="sbb-form-field"
        label="Select"
        data-testid="form-field"
      >
        <sbb-select
          {...args}
          id="sbb-select"
          class="sbb-invalid"
          data-testid="select"
          onChange={(event) => {
            if (event.target.value !== '') {
              sbbFormError.remove();
              document.getElementById('sbb-select').classList.remove('sbb-invalid');
            } else {
              document.getElementById('sbb-form-field').append(sbbFormError);
              document.getElementById('sbb-select').classList.add('sbb-invalid');
            }
          }}
        >
          {withOptionGroup
            ? createOptionsGroup(numberOfOptions, disableOption, disableGroup)
            : createOptions(numberOfOptions, disableOption, false, args.value)}
        </sbb-select>
        {sbbFormError}
      </sbb-form-field>
    </div>
  );
};

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

export const FormFieldRequired = FormFieldTemplateWithError.bind({});
FormFieldRequired.argTypes = defaultArgTypes;
FormFieldRequired.args = { ...defaultArgs, required: true };
FormFieldRequired.play = isChromatic() && playStory;

export const FormFieldDisabled = FormFieldTemplate.bind({});
FormFieldDisabled.argTypes = defaultArgTypes;
FormFieldDisabled.args = { ...defaultArgs, disabled: true };
FormFieldDisabled.play = isChromatic() && playStory;

export const FormFieldReadonly = FormFieldTemplate.bind({});
FormFieldReadonly.argTypes = defaultArgTypes;
FormFieldReadonly.args = { ...defaultArgs, readonly: true };
FormFieldReadonly.play = isChromatic() && playStory;

export const FormFieldBorderless = FormFieldTemplate.bind({});
FormFieldBorderless.argTypes = defaultArgTypes;
FormFieldBorderless.args = { ...defaultArgs, borderless: true };
FormFieldBorderless.play = isChromatic() && playStory;

export const FormFieldOptionDisabled = FormFieldTemplate.bind({});
FormFieldOptionDisabled.argTypes = defaultArgTypes;
FormFieldOptionDisabled.args = { ...defaultArgs, disableOption: true };
FormFieldOptionDisabled.play = isChromatic() && playStory;

export const FormFieldOptionGroupDisabled = FormFieldTemplate.bind({});
FormFieldOptionGroupDisabled.argTypes = defaultArgTypes;
FormFieldOptionGroupDisabled.args = { ...defaultArgs, withOptionGroup: true, disableGroup: true };
FormFieldOptionGroupDisabled.play = isChromatic() && playStory;

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
