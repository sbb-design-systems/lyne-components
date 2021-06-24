import events from './lyne-cta-button.events.ts';
import { h } from 'jsx-dom';

export const button = (args) => <lyne-cta-button
  {...args}
/>;

button.args = {
  label: 'Label'
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
