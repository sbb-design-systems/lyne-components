import { h } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';

const disabled = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Toggle',
  },
};

const even = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Toggle',
  },
};

const size = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
  table: {
    category: 'Toggle',
  },
};

const value = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Toggle',
  },
};

const disableAnimation = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Toggle',
  },
};

const label = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Toggle Option',
  },
};

const labelTwo = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Toggle Option',
  },
};

const iconName = {
  control: {
    type: 'select',
  },
  options: ['arrow-right-small', 'app-icon-small', 'train-small', 'swisspass-small'],
  table: {
    category: 'Toggle Option',
  },
};

const ariaLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const defaultArgTypes = {
  disabled,
  even,
  size,
  value,
  label,
  labelTwo,
  iconName: iconName,
  'disable-animation': disableAnimation,
  ariaLabel,
};

const defaultArgs = {
  disabled: false,
  even: false,
  size: size.options[0],
  value: 'Value 1',
  label: 'Bern',
  labelTwo: 'Zürich',
  iconName: undefined,
  'disable-animation': isChromatic(),
  ariaLabel: undefined,
};

const DefaultTemplate = ({ label, labelTwo, iconName, ariaLabel, ...args }) => (
  <sbb-toggle {...args}>
    <sbb-toggle-option icon-name={iconName} aria-label={ariaLabel} value="Value 1">
      {label}
    </sbb-toggle-option>
    <sbb-toggle-option icon-name={iconName && 'arrows-right-left-small'} value="Value 2">
      {labelTwo}
    </sbb-toggle-option>
  </sbb-toggle>
);

const SlottedIconTemplate = ({ label, labelTwo, iconName, ariaLabel, ...args }) => (
  <sbb-toggle {...args}>
    <sbb-toggle-option value="Value 1" aria-label={ariaLabel}>
      <sbb-icon slot="icon" name={iconName}></sbb-icon>
      {label}
    </sbb-toggle-option>

    <sbb-toggle-option value="Value 2">
      <sbb-icon slot="icon" name={iconName && 'arrows-right-left-small'}></sbb-icon>
      {labelTwo}
    </sbb-toggle-option>
  </sbb-toggle>
);

export const SizeM = DefaultTemplate.bind({});
SizeM.argTypes = { ...defaultArgTypes };
SizeM.args = { ...defaultArgs };

export const SizeS = DefaultTemplate.bind({});
SizeS.argTypes = { ...defaultArgTypes };
SizeS.args = { ...defaultArgs, size: size.options[1] };

export const Disabled = DefaultTemplate.bind({});
Disabled.argTypes = { ...defaultArgTypes };
Disabled.args = { ...defaultArgs, disabled: true };

export const DisabledSizeS = DefaultTemplate.bind({});
DisabledSizeS.argTypes = { ...defaultArgTypes };
DisabledSizeS.args = { ...defaultArgs, disabled: true, size: size.options[1] };

export const Even = DefaultTemplate.bind({});
Even.argTypes = { ...defaultArgTypes };
Even.args = { ...defaultArgs, even: true };

export const EvenSizeS = DefaultTemplate.bind({});
EvenSizeS.argTypes = { ...defaultArgTypes };
EvenSizeS.args = { ...defaultArgs, even: true, size: size.options[1] };

export const LabelAndIcon = DefaultTemplate.bind({});
LabelAndIcon.argTypes = { ...defaultArgTypes };
LabelAndIcon.args = { ...defaultArgs, iconName: iconName.options[0] };

export const LabelAndIconSizeS = DefaultTemplate.bind({});
LabelAndIconSizeS.argTypes = { ...defaultArgTypes };
LabelAndIconSizeS.args = { ...defaultArgs, iconName: iconName.options[0], size: size.options[1] };

export const LabelAndIconSlotted = SlottedIconTemplate.bind({});
LabelAndIconSlotted.argTypes = { ...defaultArgTypes };
LabelAndIconSlotted.args = { ...defaultArgs, iconName: iconName.options[1] };

export const IconsOnly = DefaultTemplate.bind({});
IconsOnly.argTypes = { ...defaultArgTypes };
IconsOnly.args = {
  ...defaultArgs,
  iconName: iconName.options[0],
  label: undefined,
  labelTwo: undefined,
};

export const IconsOnlySizeS = DefaultTemplate.bind({});
IconsOnlySizeS.argTypes = { ...defaultArgTypes };
IconsOnlySizeS.args = {
  ...defaultArgs,
  iconName: iconName.options[0],
  size: size.options[1],
  label: undefined,
  labelTwo: undefined,
};

export const IconsOnlySlotted = SlottedIconTemplate.bind({});
IconsOnlySlotted.argTypes = { ...defaultArgTypes };
IconsOnlySlotted.args = {
  ...defaultArgs,
  iconName: iconName.options[1],
  label: undefined,
  labelTwo: undefined,
};

export const DynamicWidth = DefaultTemplate.bind({});
DynamicWidth.argTypes = { ...defaultArgTypes };
DynamicWidth.args = {
  ...defaultArgs,
  label: 'Zürich',
  labelTwo: 'Schwarzenbach SG, Schloss Schwarzenbach, Wilerstrasse',
  iconName: iconName.options[1],
};

export const DynamicWidthSizeS = DefaultTemplate.bind({});
DynamicWidthSizeS.argTypes = { ...defaultArgTypes };
DynamicWidthSizeS.args = {
  ...defaultArgs,
  size: size.options[1],
  label: 'Zürich',
  labelTwo: 'Schwarzenbach SG, Schloss Schwarzenbach, Wilerstrasse',
  iconName: iconName.options[1],
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
  title: 'components/form elements/sbb-toggle',
};
