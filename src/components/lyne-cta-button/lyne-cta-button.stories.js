import events from './lyne-cta-button.events.ts';
import { h } from 'jsx-dom';

const types = {
  control: {
    type: 'radio'
  },
  options: [
    'primary',
    'primary-negative',
    'secondary',
    'secondary-negative',
    'tertiary',
    'tertiary-negative',
    'transparent',
    'transparent-negative'
  ]
};

export const button = (args) => <lyne-cta-button
  {...args}
/>;

button.argTypes = {
  type: types
};

button.args = {
  label: 'Label',
  type: types.options[0]
};

export default {
  parameters: {
    actions: {
      handles: [events.click]
    },
    chromatic: {
      delay: 1000,
      viewports: [
        320,
        764,
        1201
      ]
    }
  },
  title: 'Button'
};
