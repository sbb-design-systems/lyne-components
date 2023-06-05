import { h } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';

const changeEventHandler = (event) => {
  const div = document.createElement('div');
  div.innerText = `current value is: ${event.target.value}. Min is: ${event.target.min}. Max is ${event.target.max}.`;
  document.getElementById('container-value').prepend(div);
};

const TemplateSbbSlider = (args) => <sbb-slider {...args}></sbb-slider>;

const TemplateSbbSliderChangeEvent = (args) => [
  <sbb-slider {...args} onChange={(event) => changeEventHandler(event)}></sbb-slider>,
  <div style="margin-block-start: 2rem;">Change slider position:</div>,
  <div id="container-value"></div>,
];

const TemplateSlottedIcons = (args) => (
  <sbb-slider {...args}>
    <sbb-icon slot="prefix" name="battery-level-empty-small" />
    <sbb-icon slot="suffix" name="battery-level-high-small" />
  </sbb-slider>
);

const TemplateSbbSliderInFormField = ({ label, optional, ...args }) => (
  <sbb-form-field label={label} optional={optional}>
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

const ariaLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const labelArgArg = {
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

const basicArgTypes = {
  max: maxArg,
  min: minArg,
  disabled: disabledArg,
  readonly: readonlyArg,
  value: valueArg,
  'value-as-number': valueAsNumberArg,
  'start-icon': startIconArg,
  'end-icon': endIconArg,
  'aria-label': ariaLabel,
};

const formFieldBasicArgsTypes = {
  ...basicArgTypes,
  label: labelArgArg,
  optional: optionalArg,
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
  'aria-label': undefined,
};

const formFieldBasicArgs = {
  ...basicArgs,
  label: 'Label',
  optional: undefined,
};

export const sbbSlider = TemplateSbbSlider.bind({});
sbbSlider.argTypes = { ...basicArgTypes };
sbbSlider.args = { ...basicArgs };

export const sbbSliderChangeEvent = TemplateSbbSliderChangeEvent.bind({});
sbbSliderChangeEvent.argTypes = { ...basicArgTypes };
sbbSliderChangeEvent.args = { ...basicArgs };

export const sbbSliderWithoutIcons = TemplateSbbSlider.bind({});
sbbSliderWithoutIcons.argTypes = { ...basicArgTypes };
sbbSliderWithoutIcons.args = { ...basicArgs, 'start-icon': undefined, 'end-icon': undefined };

export const sbbSliderSlottedIcons = TemplateSlottedIcons.bind({});
sbbSliderSlottedIcons.argTypes = { ...basicArgTypes };
sbbSliderSlottedIcons.args = { ...basicArgs, 'start-icon': undefined, 'end-icon': undefined };

export const sbbSliderDisabled = TemplateSbbSlider.bind({});
sbbSliderDisabled.argTypes = { ...basicArgTypes };
sbbSliderDisabled.args = { ...basicArgs, disabled: true };

export const sbbSliderReadonly = TemplateSbbSlider.bind({});
sbbSliderReadonly.argTypes = { ...basicArgTypes };
sbbSliderReadonly.args = { ...basicArgs, readonly: true };

export const sbbSliderInFormField = TemplateSbbSliderInFormField.bind({});
sbbSliderInFormField.argTypes = { ...formFieldBasicArgsTypes };
sbbSliderInFormField.args = formFieldBasicArgs;

export const sbbSliderInFormFieldNoIcon = TemplateSbbSliderInFormField.bind({});
sbbSliderInFormFieldNoIcon.argTypes = { ...formFieldBasicArgsTypes };
sbbSliderInFormFieldNoIcon.args = {
  ...formFieldBasicArgs,
  'start-icon': undefined,
  'end-icon': undefined,
};

export const sbbSliderInFormFieldDisabled = TemplateSbbSliderInFormField.bind({});
sbbSliderInFormFieldDisabled.argTypes = { ...formFieldBasicArgsTypes };
sbbSliderInFormFieldDisabled.args = { ...formFieldBasicArgs, disabled: true };

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
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
  title: 'components/form elements/sbb-slider',
};
