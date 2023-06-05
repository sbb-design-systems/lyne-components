import { h } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';

const longLabelText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in tincidunt
quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut, hendrerit risus. Vestibulum rutrum elit et
lacus sollicitudin, quis malesuada lorem vehicula. Suspendisse at augue quis tellus vulputate tempor. Vivamus urna
velit, varius nec est ac, mollis efficitur lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat
metus. Donec pharetra odio at turpis bibendum, vel commodo dui vulputate. Aenean congue nec nisl vel bibendum.
Praesent sit amet lorem augue. Suspendisse ornare a justo sagittis fermentum.`;

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

const size = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
};

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

const value = {
  control: {
    type: 'text',
  },
};

const icon = {
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

const ariaLabel = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  size,
  checked,
  indeterminate,
  disabled,
  label,
  value,
  'icon-name': icon,
  'icon-placement': iconPlacement,
  'aria-label': ariaLabel,
};

const defaultArgs = {
  size: size.options[1],
  checked: false,
  indeterminate: false,
  disabled: false,
  label: 'Label',
  value: 'Value',
  'icon-name': undefined,
  'icon-placement': undefined,
  'aria-label': undefined,
};

/* ************************************************* */
/* Storybook templates                               */
/* ************************************************* */

const Template = ({ label, ...args }) => <sbb-checkbox {...args}>{label}</sbb-checkbox>;

export const defaultUnchecked = Template.bind({});
export const defaultChecked = Template.bind({});
export const defaultIndeterminate = Template.bind({});
export const sizeM = Template.bind({});
export const longLabel = Template.bind({});
export const withIconEnd = Template.bind({});
export const checkedWithIconStart = Template.bind({});
export const disabledChecked = Template.bind({});
export const disabledUnchecked = Template.bind({});
export const disabledIndeterminate = Template.bind({});

defaultUnchecked.argTypes = defaultArgTypes;
defaultUnchecked.args = {
  ...defaultArgs,
};
defaultUnchecked.documentation = {
  title: 'Checkbox unchecked',
};

defaultChecked.argTypes = defaultArgTypes;
defaultChecked.args = {
  ...defaultArgs,
  checked: true,
};
defaultChecked.documentation = {
  title: 'Checkbox checked',
};

defaultIndeterminate.argTypes = defaultArgTypes;
defaultIndeterminate.args = {
  ...defaultArgs,
  indeterminate: true,
};
defaultIndeterminate.documentation = {
  title: 'Checkbox in indeterminate state',
};

sizeM.argTypes = defaultArgTypes;
sizeM.args = {
  ...defaultArgs,
  size: size.options[0],
};
sizeM.documentation = {
  title: 'Checkbox with medium size',
};

longLabel.argTypes = defaultArgTypes;
longLabel.args = {
  ...defaultArgs,
  label: longLabelText,
};
longLabel.documentation = {
  title: 'Checkbox with long label',
};

withIconEnd.argTypes = defaultArgTypes;
withIconEnd.args = {
  ...defaultArgs,
  'icon-name': 'tickets-class-small',
};
withIconEnd.documentation = {
  title: 'Checkbox unchecked with icon at start',
};

checkedWithIconStart.argTypes = defaultArgTypes;
checkedWithIconStart.args = {
  ...defaultArgs,
  checked: true,
  'icon-name': 'tickets-class-small',
  'icon-placement': iconPlacement.options[0],
};
checkedWithIconStart.documentation = {
  title: 'Checkbox checked with icon at end',
};

disabledChecked.argTypes = defaultArgTypes;
disabledChecked.args = {
  ...defaultArgs,
  disabled: true,
  checked: true,
};
disabledChecked.documentation = {
  title: 'Checkbox disabled and unchecked',
};

disabledUnchecked.argTypes = defaultArgTypes;
disabledUnchecked.args = {
  ...defaultArgs,
  disabled: true,
};
disabledChecked.documentation = {
  title: 'Checkbox disabled and unchecked',
};

disabledIndeterminate.argTypes = defaultArgTypes;
disabledIndeterminate.args = {
  ...defaultArgs,
  disabled: true,
  indeterminate: true,
};
disabledIndeterminate.documentation = {
  title: 'Checkbox disabled and in indeterminate state',
};

export default {
  decorators: [
    (Story) => (
      <div style={`padding: 2rem`}>
        <Story />
      </div>
    ),
    withActions,
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
  title: 'components/form elements/sbb-checkbox',
};
