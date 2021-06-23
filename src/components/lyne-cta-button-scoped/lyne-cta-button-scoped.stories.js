import { h } from 'jsx-dom';
import events from './lyne-cta-button-scoped.events.ts';

export const buttonScoped = (args) => <lyne-cta-button-scoped
  {...args}
/>;

buttonScoped.args = {
  label: 'Label'
}

export default {
  title: 'ButtonScoped',
  parameters: {
    actions: {
      handles: [
        events.click
      ],
    },
    chromatic: {
      delay: 1000,
      viewports: [
        320,
        764,
        1201
      ]
    }
  }
};
