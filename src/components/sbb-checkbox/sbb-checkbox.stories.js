import { h } from 'jsx-dom';
import readme from './readme.md';

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

const checked = {
  control: {
    type: 'boolean',
  },
};

const indeterminate = {
  control: {
    type: 'boolean',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
};

const label = {
  control: {
    type: 'text',
  },
};

const iconPlacement = {
  control: {
    type: 'select',
  },
  options: ['start', 'end'],
};

const defaultArgTypes = {
  checked,
  indeterminate,
  disabled,
  label,
  'icon-placement': iconPlacement,
};

const defaultArgs = {
  checked: false,
  indeterminate: indeterminate,
  disabled: false,
  label: 'Label',
  name: 'checkbox',
};

/* ************************************************* */
/* Storybook templates                               */
/* ************************************************* */

const CheckboxDefaultTemplate = (args) => (
  <sbb-checkbox {...args} style="display: inline-block">
    {args.label}
  </sbb-checkbox>
);

const CheckboxSpacingTemplate = (args) => <sbb-checkbox {...args}>{args.label}</sbb-checkbox>;

export const sbbCheckboxDefault = CheckboxDefaultTemplate.bind({});
export const sbbCheckboxTristated = CheckboxDefaultTemplate.bind({});
export const sbbCheckboxWithLabelIcon = CheckboxDefaultTemplate.bind({});
export const sbbCheckboxWithSpacedLabelIcon = CheckboxSpacingTemplate.bind({});
export const sbbCheckboxWithLabelIconReversed = CheckboxDefaultTemplate.bind({});
export const sbbCheckboxDisabledChecked = CheckboxDefaultTemplate.bind({});
export const sbbCheckboxDisabledTristated = CheckboxDefaultTemplate.bind({});

sbbCheckboxDefault.argTypes = defaultArgTypes;
sbbCheckboxDefault.args = {
  ...defaultArgs,
};

sbbCheckboxTristated.argTypes = defaultArgTypes;
sbbCheckboxTristated.args = {
  ...defaultArgs,
  indeterminate: true,
};

sbbCheckboxWithLabelIcon.argTypes = defaultArgTypes;
sbbCheckboxWithLabelIcon.args = {
  ...defaultArgs,
  'icon-name': 'tickets-class-small',
};

sbbCheckboxWithSpacedLabelIcon.argTypes = defaultArgTypes;
sbbCheckboxWithSpacedLabelIcon.args = {
  ...defaultArgs,
  'icon-name': 'tickets-class-small',
  'label-space': true,
};

sbbCheckboxWithLabelIconReversed.argTypes = defaultArgTypes;
sbbCheckboxWithLabelIconReversed.args = {
  ...defaultArgs,
  'icon-name': 'tickets-class-small',
  'icon-placement': iconPlacement.options[0],
};

sbbCheckboxDisabledChecked.argTypes = defaultArgTypes;
sbbCheckboxDisabledChecked.args = {
  ...defaultArgs,
  disabled: true,
  checked: true,
};

sbbCheckboxDisabledTristated.argTypes = defaultArgTypes;
sbbCheckboxDisabledTristated.args = {
  ...defaultArgs,
  disabled: true,
  indeterminate: true,
};

sbbCheckboxDefault.documentation = {
  title: 'Default',
};

export default {
  title: 'components/sbb-checkbox',

  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
};
