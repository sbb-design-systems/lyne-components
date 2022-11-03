import { h } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-checkbox.events';

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

const value = {
  control: {
    type: 'text',
  },
};

const name = {
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

const accessibilityLabel = {
  control: {
    type: 'text',
  },
};

const accessibilityDescribedby = {
  control: {
    type: 'text',
  },
};

const accessibilityLabelledby = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  checked,
  indeterminate,
  disabled,
  label,
  value,
  name,
  'icon-name': icon,
  'icon-placement': iconPlacement,
  'accessibility-label': accessibilityLabel,
  'accessibility-describedby': accessibilityDescribedby,
  'accessibility-labelledby': accessibilityLabelledby,
};

const defaultArgs = {
  checked: false,
  indeterminate: false,
  disabled: false,
  label: 'Label',
  value: 'Value',
  name: 'checkbox',
  'icon-name': undefined,
  'icon-placement': undefined,
  'accessibility-label': undefined,
  'accessibility-describedby': undefined,
  'accessibility-labelledby': undefined,
};

/* ************************************************* */
/* Storybook templates                               */
/* ************************************************* */

const CheckboxDefaultTemplate = (args) => (
  <sbb-checkbox {...args} style="display: inline-block">
    {args.label}
  </sbb-checkbox>
);

export const defaultUnchecked = CheckboxDefaultTemplate.bind({});
export const defaultChecked = CheckboxDefaultTemplate.bind({});
export const defaultTristated = CheckboxDefaultTemplate.bind({});
export const withIcon = CheckboxDefaultTemplate.bind({});
export const checkedWithIconReversed = CheckboxDefaultTemplate.bind({});
export const disabledChecked = CheckboxDefaultTemplate.bind({});
export const disabledUnchecked = CheckboxDefaultTemplate.bind({});
export const disabledTristated = CheckboxDefaultTemplate.bind({});

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

defaultTristated.argTypes = defaultArgTypes;
defaultTristated.args = {
  ...defaultArgs,
  indeterminate: true,
};
defaultTristated.documentation = {
  title: 'Checkbox in indeterminate state',
};

withIcon.argTypes = defaultArgTypes;
withIcon.args = {
  ...defaultArgs,
  'icon-name': 'tickets-class-small',
};
withIcon.documentation = {
  title: 'Checkbox unchecked with icon at start',
};

checkedWithIconReversed.argTypes = defaultArgTypes;
checkedWithIconReversed.args = {
  ...defaultArgs,
  checked: true,
  'icon-name': 'tickets-class-small',
  'icon-placement': iconPlacement.options[0],
};
checkedWithIconReversed.documentation = {
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

disabledTristated.argTypes = defaultArgTypes;
disabledTristated.args = {
  ...defaultArgs,
  disabled: true,
  indeterminate: true,
};
disabledChecked.documentation = {
  title: 'Checkbox disabled and in indeterminate state',
};

export default {
  decorators: [
    (Story) => (
      <div style={`padding: 2rem`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: [events.sbbChange],
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
