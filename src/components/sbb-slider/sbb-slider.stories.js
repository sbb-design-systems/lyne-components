import events from './sbb-slider.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const TemplateSbbSlider = (args) => <sbb-slider {...args}></sbb-slider>;

const TemplateSbbSliderInFormField = (args) => (
  <sbb-form-field> {TemplateSbbSlider(args)} </sbb-form-field>
);

const valueArg = {
  control: {
    type: 'text',
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

const basicArgTypes = {
  'end-icon': endIconArg,
  max: maxArg,
  min: minArg,
  'start-icon': startIconArg,
  step: stepArg,
  value: valueArg,
};

const basicArgs = {
  'end-icon': 'walk-fast-small',
  max: '100',
  min: '0',
  'start-icon': 'walk-slow-small',
  step: '',
  value: '40',
};

export const sbbSlider = TemplateSbbSlider.bind({});
sbbSlider.argTypes = basicArgTypes;
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
sbbSliderStep.argTypes = basicArgTypes;
sbbSliderStep.args = { ...basicArgs, step: '10' };
sbbSlider.documentation = {
  title: 'sbb-slider with step',
};

export const sbbSliderInFormField = TemplateSbbSliderInFormField.bind({});
sbbSliderInFormField.argTypes = basicArgTypes;
sbbSliderInFormField.args = { ...basicArgs };
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
