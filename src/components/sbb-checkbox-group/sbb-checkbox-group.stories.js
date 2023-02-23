import { h } from 'jsx-dom';
import readme from './readme.md';

const longLabelText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in tincidunt
quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut, hendrerit risus. Vestibulum rutrum elit et
lacus sollicitudin, quis malesuada lorem vehicula. Suspendisse at augue quis tellus vulputate tempor. Vivamus urna
velit, varius nec est ac, mollis efficitur lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat
metus.`;

const checkboxes = (checked, disabledSingle, iconName, iconPlacement, label) => [
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

const DefaultTemplate = ({ checked, disabledSingle, iconName, iconPlacement, label, ...args }) => (
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
}) => (
  <sbb-checkbox-group {...args} id="sbb-checkbox-group">
    {checkboxes(checked, disabledSingle, iconName, iconPlacement, label)}
    {args.required && <sbb-form-error slot="error">This is a required field.</sbb-form-error>}
  </sbb-checkbox-group>
);

let selectedCheckboxes = ['checkbox-1'];

const childCheck = (event) => {
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

const parentCheck = (event) => {
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
}) => [
  <div style="margin-block-end: 1rem;">
    <div>Check/uncheck all the children checkboxes and the parent will be checked/unchecked.</div>
    <div>Check a single child and the parent will be indeterminate.</div>
  </div>,
  <sbb-checkbox-group {...args} id="sbb-checkbox-group">
    <sbb-checkbox
      id="parent"
      value="parent"
      checked="false"
      indeterminate="true"
      onChange={(event) => parentCheck(event)}
      icon-name={iconName}
      icon-placement={iconPlacement}
    >
      Parent checkbox
    </sbb-checkbox>
    <sbb-checkbox
      id="checkbox-1"
      value="checkbox-1"
      checked="true"
      onChange={(event) => childCheck(event)}
      icon-name={iconName}
      icon-placement={iconPlacement}
      disabled={disabledSingle}
      style="margin-inline-start: 2rem;"
    >
      {label} option 1
    </sbb-checkbox>
    <sbb-checkbox
      id="checkbox-2"
      value="checkbox-2"
      checked="false"
      onChange={(event) => childCheck(event)}
      icon-name={iconName}
      icon-placement={iconPlacement}
      style="margin-inline-start: 2rem;"
    >
      {label} option 2
    </sbb-checkbox>
  </sbb-checkbox-group>,
];

const disabled = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Checkbox group',
  },
};

const required = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Checkbox group',
  },
};

const orientation = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
  table: {
    category: 'Checkbox group',
  },
};

const horizontalFrom = {
  control: {
    type: 'select',
  },
  options: ['unset', 'zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
  table: {
    category: 'Checkbox group',
  },
};

const size = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
  table: {
    category: 'Checkbox group',
  },
};

const checked = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Checkbox',
  },
};

const disabledSingle = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Checkbox',
  },
};

const label = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Checkbox',
  },
};

const iconName = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Checkbox',
  },
};

const iconPlacement = {
  control: {
    type: 'select',
  },
  options: ['start', 'end'],
  table: {
    category: 'Checkbox',
  },
};

const basicArgTypes = {
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

const basicArgs = {
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

const iconStart = {
  iconName: 'tickets-class-small',
  iconPlacement: iconPlacement.options[0],
};

const iconEnd = {
  iconName: 'tickets-class-small',
  iconPlacement: iconPlacement.options[1],
};

export const horizontal = DefaultTemplate.bind({});
horizontal.argTypes = basicArgTypes;
horizontal.args = { ...basicArgs };
horizontal.documentation = {
  title: 'sbb-checkbox-group horizontal',
};

export const vertical = DefaultTemplate.bind({});
vertical.argTypes = basicArgTypes;
vertical.args = { ...basicArgsVertical };
vertical.documentation = {
  title: 'sbb-checkbox-group vertical',
};

export const verticalToHorizontal = DefaultTemplate.bind({});
verticalToHorizontal.argTypes = basicArgTypes;
verticalToHorizontal.args = { ...basicArgsVertical, 'horizontal-from': 'medium' };
verticalToHorizontal.documentation = {
  title: 'sbb-checkbox-group vertical with horizontal-from set',
};

export const horizontalSizeM = DefaultTemplate.bind({});
horizontalSizeM.argTypes = basicArgTypes;
horizontalSizeM.args = { ...basicArgs, size: 'm' };
horizontalSizeM.documentation = {
  title: 'sbb-checkbox-group horizontal with size m',
};

export const horizontalDisabled = DefaultTemplate.bind({});
horizontalDisabled.argTypes = basicArgTypes;
horizontalDisabled.args = { ...basicArgs, disabled: true, disabledSingle: true };
horizontalDisabled.documentation = {
  title: 'sbb-checkbox-group horizontal disabled',
};

export const verticalDisabled = DefaultTemplate.bind({});
verticalDisabled.argTypes = basicArgTypes;
verticalDisabled.args = { ...basicArgsVertical, disabled: true, disabledSingle: true };
verticalDisabled.documentation = {
  title: 'sbb-checkbox-group vertical disabled',
};

export const horizontalIconStart = DefaultTemplate.bind({});
horizontalIconStart.argTypes = basicArgTypes;
horizontalIconStart.args = { ...basicArgs, ...iconStart };
horizontalIconStart.documentation = {
  title: 'sbb-checkbox-group horizontal with icon at start',
};

export const verticalIconStart = DefaultTemplate.bind({});
verticalIconStart.argTypes = basicArgTypes;
verticalIconStart.args = { ...basicArgsVertical, ...iconStart };
verticalIconStart.documentation = {
  title: 'sbb-checkbox-group vertical with icon at start',
};

export const horizontalIconEnd = DefaultTemplate.bind({});
horizontalIconEnd.argTypes = basicArgTypes;
horizontalIconEnd.args = { ...basicArgs, ...iconEnd };
horizontalIconEnd.documentation = {
  title: 'sbb-checkbox-group horizontal with icon at end',
};

export const verticalIconEnd = DefaultTemplate.bind({});
verticalIconEnd.argTypes = basicArgTypes;
verticalIconEnd.args = { ...basicArgsVertical, ...iconEnd };
verticalIconEnd.documentation = {
  title: 'sbb-checkbox-group vertical with icon at end',
};

export const verticalIconEndLongLabel = DefaultTemplate.bind({});
verticalIconEndLongLabel.argTypes = basicArgTypes;
verticalIconEndLongLabel.args = { ...basicArgsVertical, ...iconEnd, label: longLabelText };
verticalIconEndLongLabel.documentation = {
  title: 'sbb-checkbox-group vertical with icon at end and long label',
};

export const horizontalWithSbbFormError = ErrorMessageTemplate.bind({});
horizontalWithSbbFormError.argTypes = basicArgTypes;
horizontalWithSbbFormError.args = { ...basicArgs, required: true };
horizontalWithSbbFormError.documentation = {
  title: 'sbb-checkbox-group horizontal with sbb-form-error',
};

export const verticalWithSbbFormError = ErrorMessageTemplate.bind({});
verticalWithSbbFormError.argTypes = basicArgTypes;
verticalWithSbbFormError.args = { ...basicArgsVertical, required: true };
verticalWithSbbFormError.documentation = {
  title: 'sbb-checkbox-group vertical with sbb-form-error',
};

export const indeterminateGroup = IndeterminateGroupTemplate.bind({});
indeterminateGroup.argTypes = { ...basicArgTypes };
indeterminateGroup.args = { ...basicArgsVertical };
delete indeterminateGroup.args.checked;
delete indeterminateGroup.argTypes.checked;
indeterminateGroup.documentation = {
  title: 'sbb-checkbox-group with parent in indeterminate state',
};

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
