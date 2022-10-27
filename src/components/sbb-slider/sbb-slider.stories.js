import events from './sbb-slider.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const TemplateSbbSlider = (args) => <sbb-slider {...args}></sbb-slider>;

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

const stepArg = {
  control: {
    type: 'text',
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
  'end-icon': endIconArg,
  max: maxArg,
  min: minArg,
  'start-icon': startIconArg,
  step: stepArg,
  value: valueArg,
  'value-as-number': valueAsNumberArg,
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
  'end-icon': 'walk-fast-small',
  max: '100',
  min: '0',
  'start-icon': 'walk-slow-small',
  step: '',
  value: '40',
  'value-as-number': 40,
  'accessibility-label': undefined,
  'accessibility-describedby': undefined,
  'accessibility-labelledby': undefined,
};

const formFieldBasicArgs = {
  ...basicArgs,
  label: undefined,
  optional: undefined,
  borderless: undefined,
};

export const sbbSlider = TemplateSbbSlider.bind({});
sbbSlider.argTypes = { ...basicArgTypes };
sbbSlider.args = { ...basicArgs };
sbbSlider.documentation = {
  title: 'sbb-slider',
};

export const sbbSliderDisabled = TemplateSbbSlider.bind({});
sbbSliderDisabled.argTypes = { ...basicArgTypes, disabled: disabledArg };
sbbSliderDisabled.args = { ...basicArgs, disabled: true };
sbbSlider.documentation = {
  title: 'sbb-slider disabled',
};

export const sbbSliderReadonly = TemplateSbbSlider.bind({});
sbbSliderReadonly.argTypes = { ...basicArgTypes, readonly: readonlyArg };
sbbSliderReadonly.args = { ...basicArgs, readonly: true };
sbbSlider.documentation = {
  title: 'sbb-slider readonly',
};

export const sbbSliderStep = TemplateSbbSlider.bind({});
sbbSliderStep.argTypes = { ...basicArgTypes, disabled: disabledArg };
sbbSliderStep.args = { ...basicArgs, step: '10', disabled: false };
sbbSlider.documentation = {
  title: 'sbb-slider with step',
};

export const sbbSliderInFormField = TemplateSbbSliderInFormField.bind({});
sbbSliderInFormField.argTypes = { ...formFieldBasicArgsTypes, disabled: disabledArg };
sbbSliderInFormField.args = { ...formFieldBasicArgs, disabled: false };
sbbSliderInFormField.documentation = {
  title: 'sbb-slider within sbb-form-field',
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
