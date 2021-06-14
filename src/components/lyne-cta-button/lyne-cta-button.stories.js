import { withKnobs, text } from '@storybook/addon-knobs';
import { withActions, action } from '@storybook/addon-actions';
import { h } from 'jsx-dom';
import events from './lyne-cta-button.events.ts';

export const defaultButton = () => <lyne-cta-button
  label={text('label', 'Label')}
  onClick={action(events.click)}
/>;

export default {
  decorators: [
    withKnobs
  ],
  title: 'Button',
  parameters: {
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
