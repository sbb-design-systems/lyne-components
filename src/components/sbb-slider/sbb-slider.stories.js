import events from './sbb-slider.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-slider {...args}></sbb-slider>;

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
  value: valueArg,
  step: stepArg,
  min: minArg,
  max: maxArg,
  readonly: readonlyArg,
  disabled: disabledArg,
  'start-icon': startIconArg,
  'end-icon': endIconArg,
};

const basicArgs = {
  value: '40',
  step: '',
  min: '0',
  max: '100',
  readonly: false,
  disabled: false,
  'start-icon': 'walk-slow-small',
  'end-icon': 'walk-fast-small',
};

export const sbbSlider = Template.bind({});
sbbSlider.argTypes = basicArgTypes;
sbbSlider.args = { ...basicArgs };
sbbSlider.documentation = {
  title: 'Title which will be rendered on documentation platform',
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
