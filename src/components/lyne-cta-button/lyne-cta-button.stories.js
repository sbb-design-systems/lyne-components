import { withKnobs, text } from '@storybook/addon-knobs';
import { h } from 'jsx-dom';
import events from './lyne-cta-button.events.ts';

export const defaultButton = () => <lyne-cta-button
  label={text('label', 'Label')}
/>;

export default {
  decorators: [
    withKnobs
  ],
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
