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

const tristated = {
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
  tristated,
  disabled,
  label,
  'icon-placement': iconPlacement,
};

const defaultArgs = {
  checked: false,
  tristated: tristated,
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
  tristated: true,
};

sbbCheckboxWithLabelIcon.argTypes = defaultArgTypes;
sbbCheckboxWithLabelIcon.args = {
  ...defaultArgs,
  'label-icon': 'tickets-class-small',
};

sbbCheckboxWithSpacedLabelIcon.argTypes = defaultArgTypes;
sbbCheckboxWithSpacedLabelIcon.args = {
  ...defaultArgs,
  'label-icon': 'tickets-class-small',
  'label-space': true,
};

sbbCheckboxWithLabelIconReversed.argTypes = defaultArgTypes;
sbbCheckboxWithLabelIconReversed.args = {
  ...defaultArgs,
  'label-icon': 'tickets-class-small',
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
  tristated: true,
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
