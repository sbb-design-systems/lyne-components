import { h } from 'jsx-dom';
import events from './lyne-cta-button.events.ts';

export const button = (args) => <lyne-cta-button
  {...args}
/>;

button.args = {
  label: 'Label'
}

export default {
  title: 'forms/Button',
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
