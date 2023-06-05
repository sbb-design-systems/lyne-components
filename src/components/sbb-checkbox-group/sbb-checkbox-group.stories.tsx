/** @jsx h */
import { Fragment, h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const longLabelText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in tincidunt
quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut, hendrerit risus. Vestibulum rutrum elit et
lacus sollicitudin, quis malesuada lorem vehicula. Suspendisse at augue quis tellus vulputate tempor. Vivamus urna
velit, varius nec est ac, mollis efficitur lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat
metus.`;

const checkboxes = (checked, disabledSingle, iconName, iconPlacement, label): JSX.Element[] => [
  <sbb-checkbox
    value="checkbox-1"
    checked={checked}
    icon-name={iconName}
    icon-placement={iconPlacement}
  >
    {label} 1
  </sbb-checkbox>,
  <sbb-checkbox
    value="checkbox-2"
    disabled={disabledSingle}
    icon-name={iconName}
    icon-placement={iconPlacement}
  >
    {label} 2
  </sbb-checkbox>,
  <sbb-checkbox value="checkbox-3" icon-name={iconName} icon-placement={iconPlacement}>
    {label} 3
  </sbb-checkbox>,
];

const DefaultTemplate = ({
  checked,
  disabledSingle,
  iconName,
  iconPlacement,
  label,
  ...args
}): JSX.Element => (
  <sbb-checkbox-group {...args}>
    {checkboxes(checked, disabledSingle, iconName, iconPlacement, label)}
  </sbb-checkbox-group>
);

const ErrorMessageTemplate = ({
  checked,
  disabledSingle,
  iconName,
  iconPlacement,
  label,
  ...args
}): JSX.Element => (
  <sbb-checkbox-group {...args} id="sbb-checkbox-group">
    {checkboxes(checked, disabledSingle, iconName, iconPlacement, label)}
    {args.required && <sbb-form-error slot="error">This is a required field.</sbb-form-error>}
  </sbb-checkbox-group>
);

let selectedCheckboxes = ['checkbox-1'];

const childCheck = (event): void => {
  if (event.target.checked) {
    selectedCheckboxes.push(event.target.value);
  } else {
    selectedCheckboxes.splice(selectedCheckboxes.indexOf(event.target.value), 1);
  }
  document
    .getElementById('parent')
    .setAttribute('indeterminate', String(selectedCheckboxes.length === 1));
  document
    .getElementById('parent')
    .setAttribute('checked', String(selectedCheckboxes.length === 2));
};

const parentCheck = (event): void => {
  if (event.target.checked) {
    selectedCheckboxes = ['checkbox-1', 'checkbox-2'];
  } else {
    selectedCheckboxes = [];
  }
  document.getElementById('checkbox-1').setAttribute('checked', event.target.checked);
  document.getElementById('checkbox-2').setAttribute('checked', event.target.checked);
};

const IndeterminateGroupTemplate = ({
  disabledSingle,
  iconName,
  iconPlacement,
  label,
  ...args
}): JSX.Element => (
  <Fragment>
    <div style={{ 'margin-block-end': '1rem' }}>
      <div>Check/uncheck all the children checkboxes and the parent will be checked/unchecked.</div>
      <div>Check a single child and the parent will be indeterminate.</div>
    </div>
    <sbb-checkbox-group {...args} id="sbb-checkbox-group">
      <sbb-checkbox
        id="parent"
        value="parent"
        checked={false}
        indeterminate={true}
        onChange={(event) => parentCheck(event)}
        icon-name={iconName}
        icon-placement={iconPlacement}
      >
        Parent checkbox
      </sbb-checkbox>
      <sbb-checkbox
        id="checkbox-1"
        value="checkbox-1"
        checked={true}
        onChange={(event) => childCheck(event)}
        icon-name={iconName}
        icon-placement={iconPlacement}
        disabled={disabledSingle}
        style={{ 'margin-inline-start': '2rem' }}
      >
        {label} option 1
      </sbb-checkbox>
      <sbb-checkbox
        id="checkbox-2"
        value="checkbox-2"
        checked={false}
        onChange={(event) => childCheck(event)}
        icon-name={iconName}
        icon-placement={iconPlacement}
        style={{ 'margin-inline-start': '2rem' }}
      >
        {label} option 2
      </sbb-checkbox>
    </sbb-checkbox-group>
  </Fragment>
);

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Checkbox group',
  },
};

const required: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Checkbox group',
  },
};

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
  table: {
    category: 'Checkbox group',
  },
};

const horizontalFrom: InputType = {
  control: {
    type: 'select',
  },
  options: ['unset', 'zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
  table: {
    category: 'Checkbox group',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
  table: {
    category: 'Checkbox group',
  },
};

const checked: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Checkbox',
  },
};

const disabledSingle: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Checkbox',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Checkbox',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Checkbox',
  },
};

const iconPlacement: InputType = {
  control: {
    type: 'select',
  },
  options: ['start', 'end'],
  table: {
    category: 'Checkbox',
  },
};

const basicArgTypes: ArgTypes = {
  disabled,
  required,
  orientation,
  'horizontal-from': horizontalFrom,
  size,
  label,
  checked,
  disabledSingle,
  iconName,
  iconPlacement,
};

const basicArgs: Args = {
  disabled: false,
  required: false,
  orientation: orientation.options[0],
  'horizontal-from': undefined,
  size: size.options[1],
  label: 'Label',
  checked: true,
  disabledSingle: false,
  iconName: undefined,
  iconPlacement: undefined,
};

const basicArgsVertical = {
  ...basicArgs,
  orientation: orientation.options[1],
};

const iconStart: Args = {
  iconName: 'tickets-class-small',
  iconPlacement: iconPlacement.options[0],
};

const iconEnd: Args = {
  iconName: 'tickets-class-small',
  iconPlacement: iconPlacement.options[1],
};

export const horizontal: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const vertical: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical },
};

export const verticalToHorizontal: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, 'horizontal-from': 'medium' },
};

export const horizontalSizeM: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, size: 'm' },
};

export const horizontalDisabled: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true, disabledSingle: true },
};

export const verticalDisabled: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, disabled: true, disabledSingle: true },
};

export const horizontalIconStart: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, ...iconStart },
};

export const verticalIconStart: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, ...iconStart },
};

export const horizontalIconEnd: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, ...iconEnd },
};

export const verticalIconEnd: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, ...iconEnd },
};

export const verticalIconEndLongLabel: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, ...iconEnd, label: longLabelText },
};

export const horizontalWithSbbFormError: StoryObj = {
  render: ErrorMessageTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, required: true },
};

export const verticalWithSbbFormError: StoryObj = {
  render: ErrorMessageTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, required: true },
};

export const indeterminateGroup: StoryObj = {
  render: IndeterminateGroupTemplate,
  argTypes: { ...basicArgTypes },
  args: { ...basicArgsVertical },
};

delete indeterminateGroup.args.checked;
delete indeterminateGroup.argTypes.checked;

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: ['change', 'input'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-checkbox-group',
};

export default meta;
