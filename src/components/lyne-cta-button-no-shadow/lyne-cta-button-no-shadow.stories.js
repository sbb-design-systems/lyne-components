import events from './lyne-cta-button-no-shadow.events.ts';
import { h } from 'jsx-dom';

export const buttonNoShadow = (args) => <lyne-cta-button-no-shadow
  {...args}
/>;

buttonNoShadow.args = {
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
  title: 'ButtonNoShadow'
};
