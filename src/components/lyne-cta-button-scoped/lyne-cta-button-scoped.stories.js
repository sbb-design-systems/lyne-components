import events from './lyne-cta-button-scoped.events.ts';
import { h } from 'jsx-dom';

export const buttonScoped = (args) => <lyne-cta-button-scoped
  {...args}
/>;

buttonScoped.args = {
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
  title: 'ButtonScoped'
};
