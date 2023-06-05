import { h } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';

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

const iconName = {
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

const ariaLabel = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  checked,
  disabled,
  'label-position': labelPosition,
  label,
  'icon-name': iconName,
  'aria-label': ariaLabel,
};

const defaultArgs = {
  checked: false,
  disabled: false,
  'label-position': labelPosition.options[1],
  label: 'Label',
  'icon-name': undefined,
  'aria-label': undefined,
};

/* ************************************************* */
/* Storybook templates                               */
/* ************************************************* */

const ToggleCheckDefaultTemplate = ({ label, ...args }) => (
  <sbb-toggle-check {...args}>{label}</sbb-toggle-check>
);

const ToggleCheckWithoutLabelTemplate = (args) => <sbb-toggle-check {...args}></sbb-toggle-check>;

const ToggleCheckCustomIconTemplate = ({ label, ...args }) => (
  <sbb-toggle-check {...args}>
    <sbb-icon slot="icon" name="eye-small"></sbb-icon>
    {label}
  </sbb-toggle-check>
);

const ToggleCheckBlockVariantTemplate = (args) => (
  <div>
    <sbb-toggle-check {...args} style="display:block">
      <sbb-title level="5" style="margin: 0">
        Accessible Connection.
      </sbb-title>
      <span class="sbb-text-s" style="color: var(--sbb-color-iron-default);">
        Show connections for accessible journeys.
      </span>
    </sbb-toggle-check>
    <p class="sbb-text-xs">
      In this example <code>&lt;sbb-toggle-check&gt;</code> is converted to a block element by
      setting <code>display: block</code>.
    </p>
  </div>
);

export const SbbToggleCheckDefault = ToggleCheckDefaultTemplate.bind({});
SbbToggleCheckDefault.argTypes = defaultArgTypes;
SbbToggleCheckDefault.args = {
  ...defaultArgs,
};

export const SbbToggleCheckDefaultChecked = ToggleCheckDefaultTemplate.bind({});
SbbToggleCheckDefaultChecked.argTypes = defaultArgTypes;
SbbToggleCheckDefaultChecked.args = {
  ...defaultArgs,
  checked: true,
};

export const SbbToggleCheckDefaultLongLabel = ToggleCheckDefaultTemplate.bind({});
SbbToggleCheckDefaultLongLabel.argTypes = defaultArgTypes;
SbbToggleCheckDefaultLongLabel.args = {
  ...defaultArgs,
  label: longLabel,
};

export const SbbToggleCheckLabelBefore = ToggleCheckDefaultTemplate.bind({});
SbbToggleCheckLabelBefore.argTypes = defaultArgTypes;
SbbToggleCheckLabelBefore.args = {
  ...defaultArgs,
  'label-position': 'before',
};

export const SbbToggleCheckWithoutLabel = ToggleCheckWithoutLabelTemplate.bind({});
SbbToggleCheckWithoutLabel.argTypes = defaultArgTypes;
SbbToggleCheckWithoutLabel.args = {
  ...defaultArgs,
};

export const SbbToggleCheckDisabled = ToggleCheckDefaultTemplate.bind({});
SbbToggleCheckDisabled.argTypes = defaultArgTypes;
SbbToggleCheckDisabled.args = {
  ...defaultArgs,
  disabled: true,
};

export const SbbToggleCheckDisabledChecked = ToggleCheckDefaultTemplate.bind({});
SbbToggleCheckDisabledChecked.argTypes = defaultArgTypes;
SbbToggleCheckDisabledChecked.args = {
  ...defaultArgs,
  disabled: true,
  checked: true,
};

export const SbbToggleCheckCustomIcon = ToggleCheckDefaultTemplate.bind({});
SbbToggleCheckCustomIcon.argTypes = defaultArgTypes;
SbbToggleCheckCustomIcon.args = {
  ...defaultArgs,
  checked: true,
  'icon-name': 'face-smiling-small',
};

export const SbbToggleCheckCustomIconSlotted = ToggleCheckCustomIconTemplate.bind({});
SbbToggleCheckCustomIconSlotted.argTypes = defaultArgTypes;
SbbToggleCheckCustomIconSlotted.args = {
  ...defaultArgs,
  checked: true,
  iconName: undefined,
};

export const SbbToggleCheckBlockVariant = ToggleCheckBlockVariantTemplate.bind({});
SbbToggleCheckBlockVariant.argTypes = defaultArgTypes;
SbbToggleCheckBlockVariant.args = {
  ...defaultArgs,
  'label-position': 'before',
  label: undefined,
};

export default {
  title: 'components/form elements/sbb-toggle-check',
  decorators: [withActions],
  parameters: {
    backgrounds: {
      disable: true,
    },
    actions: {
      handles: ['change', 'input'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
};
