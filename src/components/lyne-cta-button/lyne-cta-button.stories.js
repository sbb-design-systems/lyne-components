import { h } from 'jsx-dom';
import events from './lyne-cta-button.events.ts';

export const defaultButton = (args) => <lyne-cta-button
  {...args}
/>;

defaultButton.args = {
  label: 'Label'
}

export default {
  title: 'Button',
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
