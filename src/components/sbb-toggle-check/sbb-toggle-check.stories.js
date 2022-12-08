import { h } from 'jsx-dom';
import readme from './readme.md';

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

const longLabel =
  'For this example we need a very long label, like lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec dolor eget leo porttitor ultrices. Mauris sed erat nec justo posuere elementum. In pharetra ante vel fringilla tincidunt. Fusce congue accumsan arcu dictum porttitor. Pellentesque urna justo, lacinia at velit eu, sagittis tempus nibh. Quisque vitae massa et turpis fermentum tristique.';

const checked = {
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

const labelPosition = {
  control: {
    type: 'inline-radio',
  },
  options: ['before', 'after'],
};

const defaultArgTypes = {
  checked,
  disabled,
  'label-position': labelPosition,
  label,
};

const defaultArgs = {
  checked: false,
  disabled: false,
  'label-position': labelPosition.options[1],
  label: 'Title',
  name: 'toggle',
};

/* ************************************************* */
/* Storybook templates                               */
/* ************************************************* */

const ToggleCheckDefaultTemplate = (args) => (
  <sbb-toggle-check {...args}>{args.label}</sbb-toggle-check>
);

const ToggleCheckWithoutLabelTemplate = (args) => <sbb-toggle-check {...args}></sbb-toggle-check>;

const ToggleCheckCustomIconTemplate = (args) => (
  <sbb-toggle-check {...args}>
    <sbb-icon slot="icon" name="eye-small"></sbb-icon>
    {args.label}
  </sbb-toggle-check>
);

export const sbbToggleCheckDefault = ToggleCheckDefaultTemplate.bind({});
export const sbbToggleCheckDefaultChecked = ToggleCheckDefaultTemplate.bind({});
export const sbbToggleCheckDefaultLongLabel = ToggleCheckDefaultTemplate.bind({});
export const sbbToggleCheckLabelBefore = ToggleCheckDefaultTemplate.bind({});
export const sbbToggleCheckWithoutLabel = ToggleCheckWithoutLabelTemplate.bind({});
export const sbbToggleCheckDisabled = ToggleCheckDefaultTemplate.bind({});
export const sbbToggleCheckDisabledChecked = ToggleCheckDefaultTemplate.bind({});
export const sbbToggleCheckCustomIcon = ToggleCheckCustomIconTemplate.bind({});

sbbToggleCheckDefault.argTypes = defaultArgTypes;
sbbToggleCheckDefault.args = {
  ...defaultArgs,
};

sbbToggleCheckDefaultChecked.argTypes = defaultArgTypes;
sbbToggleCheckDefaultChecked.args = {
  ...defaultArgs,
  checked: true,
};

sbbToggleCheckDefaultLongLabel.argTypes = defaultArgTypes;
sbbToggleCheckDefaultLongLabel.args = {
  ...defaultArgs,
  label: longLabel,
};

sbbToggleCheckLabelBefore.argTypes = defaultArgTypes;
sbbToggleCheckLabelBefore.args = {
  ...defaultArgs,
  'label-position': 'before',
};

sbbToggleCheckWithoutLabel.argTypes = defaultArgTypes;
sbbToggleCheckWithoutLabel.args = {
  ...defaultArgs,
};

sbbToggleCheckDisabled.argTypes = defaultArgTypes;
sbbToggleCheckDisabled.args = {
  ...defaultArgs,
  disabled: true,
};

sbbToggleCheckDisabledChecked.argTypes = defaultArgTypes;
sbbToggleCheckDisabledChecked.args = {
  ...defaultArgs,
  disabled: true,
  checked: true,
};

sbbToggleCheckCustomIcon.argTypes = defaultArgTypes;
sbbToggleCheckCustomIcon.args = {
  ...defaultArgs,
  checked: true,
};

sbbToggleCheckDefault.documentation = {
  title: 'Default',
};

export default {
  title: 'components/form elements/sbb-toggle-check',
  parameters: {
    backgrounds: {
      disable: true,
    },
    actions: {
      handles: ['change'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
};
