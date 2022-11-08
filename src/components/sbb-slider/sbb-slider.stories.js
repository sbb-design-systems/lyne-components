import events from './sbb-slider.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const TemplateSbbSlider = (args) => <sbb-slider {...args}></sbb-slider>;

const templateSlottedIcons = (args) => (
  <sbb-slider {...args}>
    <sbb-icon slot="prefix" name="battery-level-empty-small" />
    <sbb-icon slot="suffix" name="battery-level-high-small" />
  </sbb-slider>
);

const TemplateSbbSliderInFormField = ({ label, optional, borderless, ...args }) => (
  <sbb-form-field label={label} optional={optional} borderless={borderless}>
    {TemplateSbbSlider(args)}
  </sbb-form-field>
);

const valueArg = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const valueAsNumberArg = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Slider attribute',
  },
};

const minArg = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const maxArg = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const disabledArg = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Slider attribute',
  },
};

const readonlyArg = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Slider attribute',
  },
};

const startIconArg = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const endIconArg = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const accessibilityLabelArg = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const accessibilityDescribedbyArg = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const accessibilityLabelledbyArg = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const labelArg = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const optionalArg = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const borderlessArg = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const basicArgTypes = {
  max: maxArg,
  min: minArg,
  disabled: disabledArg,
  readonly: readonlyArg,
  value: valueArg,
  'value-as-number': valueAsNumberArg,
  'start-icon': startIconArg,
  'end-icon': endIconArg,
  'accessibility-label': accessibilityLabelArg,
  'accessibility-describedby': accessibilityDescribedbyArg,
  'accessibility-labelledby': accessibilityLabelledbyArg,
};

const formFieldBasicArgsTypes = {
  ...basicArgTypes,
  label: labelArg,
  optional: optionalArg,
  borderless: borderlessArg,
};

const basicArgs = {
  max: '100',
  min: '0',
  disabled: false,
  readonly: false,
  value: '40',
  'value-as-number': 40,
  'start-icon': 'walk-slow-small',
  'end-icon': 'walk-fast-small',
  'accessibility-label': undefined,
  'accessibility-describedby': undefined,
  'accessibility-labelledby': undefined,
};

const formFieldBasicArgs = {
  ...basicArgs,
  label: 'Label',
  optional: undefined,
  borderless: true,
};

export const sbbSlider = TemplateSbbSlider.bind({});
sbbSlider.argTypes = { ...basicArgTypes };
sbbSlider.args = { ...basicArgs };
sbbSlider.documentation = {
  title: 'sbb-slider',
};

export const sbbSliderWithoutIcons = TemplateSbbSlider.bind({});
sbbSliderWithoutIcons.argTypes = { ...basicArgTypes };
sbbSliderWithoutIcons.args = { ...basicArgs, 'start-icon': undefined, 'end-icon': undefined };
sbbSliderWithoutIcons.documentation = {
  title: 'sbb-slider without icons',
};

export const sbbSliderSlottedIcons = templateSlottedIcons.bind({});
sbbSliderSlottedIcons.argTypes = { ...basicArgTypes };
sbbSliderSlottedIcons.args = { ...basicArgs, 'start-icon': undefined, 'end-icon': undefined };
sbbSliderSlottedIcons.documentation = {
  title: 'sbb-slider with slotted icons',
};

export const sbbSliderDisabled = TemplateSbbSlider.bind({});
sbbSliderDisabled.argTypes = { ...basicArgTypes };
sbbSliderDisabled.args = { ...basicArgs, disabled: true };
sbbSlider.documentation = {
  title: 'sbb-slider disabled',
};

export const sbbSliderReadonly = TemplateSbbSlider.bind({});
sbbSliderReadonly.argTypes = { ...basicArgTypes };
sbbSliderReadonly.args = { ...basicArgs, readonly: true };
sbbSlider.documentation = {
  title: 'sbb-slider readonly',
};

export const sbbSliderInFormField = TemplateSbbSliderInFormField.bind({});
sbbSliderInFormField.argTypes = { ...formFieldBasicArgsTypes };
sbbSliderInFormField.args = formFieldBasicArgs;
sbbSliderInFormField.documentation = {
  title: 'sbb-slider within sbb-form-field',
};

export const sbbSliderInFormFieldNoIcon = TemplateSbbSliderInFormField.bind({});
sbbSliderInFormFieldNoIcon.argTypes = { ...formFieldBasicArgsTypes };
sbbSliderInFormFieldNoIcon.args = {
  ...formFieldBasicArgs,
  'start-icon': undefined,
  'end-icon': undefined,
};
sbbSliderInFormFieldNoIcon.documentation = {
  title: 'sbb-slider within sbb-form-field without icons',
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
      handles: [events.sbbChange],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-slider',
};
