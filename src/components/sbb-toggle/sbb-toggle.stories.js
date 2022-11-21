import { h } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-toggle.events';

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

const defaultArgTypes = {
  disabled,
  even,
  size,
  value,
  label,
  labelTwo,
  iconName: iconName,
};

const defaultArgs = {
  disabled: false,
  even: false,
  size: size.options[0],
  value: 'Value 1',
  label: 'Bern',
  labelTwo: 'Zurich',
  iconName: undefined,
};

const toggleOption = (args) => [
  <sbb-toggle-option disabled={args.disabled} icon-name={args.iconName} value="Value 1">
    {args.label}
  </sbb-toggle-option>,
  <sbb-toggle-option
    disabled={args.disabled}
    icon-name={args.iconName && 'arrows-right-left-small'}
    value="Value 2"
  >
    {args.labelTwo}
  </sbb-toggle-option>,
];

const DefaultTemplate = (args) => <sbb-toggle {...args}>{toggleOption(args)}</sbb-toggle>;

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

export const Unselected = DefaultTemplate.bind({});
Unselected.argTypes = { ...defaultArgTypes };
Unselected.args = { ...defaultArgs, value: undefined };

export const UnselectedSizeS = DefaultTemplate.bind({});
UnselectedSizeS.argTypes = { ...defaultArgTypes };
UnselectedSizeS.args = { ...defaultArgs, value: undefined, size: size.options[1] };

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

export const DynamicWidth = DefaultTemplate.bind({});
DynamicWidth.argTypes = { ...defaultArgTypes };
DynamicWidth.args = {
  ...defaultArgs,
  label: 'Zurich',
  labelTwo: 'Schwarzenbach SG, Schloss Schwarzenbach, Wilerstrasse',
  iconName: iconName.options[1],
};

export const DynamicWidthSizeS = DefaultTemplate.bind({});
DynamicWidthSizeS.argTypes = { ...defaultArgTypes };
DynamicWidthSizeS.args = {
  ...defaultArgs,
  size: size.options[1],
  label: 'Zurich',
  labelTwo: 'Schwarzenbach SG, Schloss Schwarzenbach, Wilerstrasse',
  iconName: iconName.options[1],
};

export const sbbToggleDisabled = DefaultTemplate.bind({});
sbbToggleDisabled.args = { ...defaultArgs, disabled: true };
sbbToggleDisabled.argTypes = defaultArgTypes;
sbbToggleDisabled.documentation = {
  title: 'sbb-toggle disabled',
};

export const sbbToggleFixedWidth = DefaultTemplate.bind({});
sbbToggleFixedWidth.args = { ...defaultArgs, even: true };
sbbToggleFixedWidth.argTypes = defaultArgTypes;
sbbToggleFixedWidth.documentation = {
  title: 'sbb-toggle fixed width',
};

export const sbbToggleWithIcons = CustomIconsTemplate.bind({});
sbbToggleWithIcons.args = { ...defaultArgs, iconName: 'arrow-right-small' };
sbbToggleWithIcons.argTypes = { ...defaultArgTypes, iconName };
sbbToggleWithIcons.documentation = {
  title: 'sbb-toggle fixed width',
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
      handles: [events.didChange],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/toggle/sbb-toggle',
};
